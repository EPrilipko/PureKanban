import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { Context } from 'graphql-ws';
import { JwtService } from '@nestjs/jwt';
import { ModuleRef } from '@nestjs/core';
import {
  DateTimeResolver,
  HexColorCodeResolver,
  EmailAddressResolver,
} from 'graphql-scalars';

import { IUserSession, JWTPayload } from '@/modules/auth';
import { JWTStrategy } from '@/modules/auth/strategies/jwt.strategy';

import { IGraphQLContext } from '@/common/interfaces/context.interface';
import { GraphqlErrorCode } from '@/common/graphql/errors.enum';

import {
  CardCreatedPayload,
  CardUpdatedPayload,
  CardOwnerUpdatedPayload,
  CardAssigneesUpdatedPayload,
  CardCommentAddedPayload,
} from '@/modules/domain/card/card-history/entities/card-history-payload.entity';

import { JWTConfiguredModule } from './jwt.configured';

interface ConnectionExtra {
  user: IUserSession;
}

export const GraphqlConfiguredModule =
  GraphQLModule.forRootAsync<ApolloDriverConfig>({
    imports: [JWTConfiguredModule],
    inject: [ModuleRef, ConfigService, JwtService],
    driver: ApolloDriver,
    useFactory: (
      moduleRef: ModuleRef,
      configService: ConfigService,
      jwtService: JwtService,
    ) => {
      const usePlayground = configService.get('USE_PLAYGROUND') === 'true';

      return {
        autoSchemaFile: true,
        sortSchema: true,
        playground: usePlayground
          ? {
              settings: {
                'request.credentials': 'include',
              },
            }
          : undefined,
        buildSchemaOptions: {
          orphanedTypes: [
            GraphqlErrorCode,
            CardCreatedPayload,
            CardUpdatedPayload,
            CardOwnerUpdatedPayload,
            CardAssigneesUpdatedPayload,
            CardCommentAddedPayload,
          ],
        },
        resolvers: {
          DateTime: DateTimeResolver,
          HexColorCode: HexColorCodeResolver,
          EmailAddress: EmailAddressResolver,
        },
        subscriptions: {
          'graphql-ws': {
            onConnect: (context: Context) => {
              const { connectionParams } = context;
              const authHeader = connectionParams?.authorization as string;

              if (!authHeader) return;

              const jwtStrategy = moduleRef.get(JWTStrategy, { strict: false });

              const [type, token] = authHeader.split(' ');

              if (type === 'Bearer' && token) {
                try {
                  const payload = jwtService.verify<JWTPayload>(token, {
                    secret: configService.getOrThrow('JWT_ACCESS_SECRET'),
                  });
                  if (!payload) {
                    throw new Error('Invalid token!');
                  }
                  const user = jwtStrategy.validate(payload);

                  (context.extra as ConnectionExtra).user = user;
                } catch (err) {
                  throw new Error('Unauthorized');
                }
              }

              return true;
            },
          },
        },

        context: ({
          req,
          res,
          extra,
        }: {
          req: Request;
          res: Response;
          extra?: ConnectionExtra;
        }): IGraphQLContext => {
          if (extra && extra.user) {
            req = { ...req, user: extra.user } as Request;
          }
          return { req, res };
        },
      };
    },
  });
