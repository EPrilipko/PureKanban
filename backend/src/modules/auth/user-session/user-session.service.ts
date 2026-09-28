import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { hash } from '@/lib/bcrypt';
import { User } from '@/modules/auth/user/entities/user.entity';

import { UserSession } from './entities/user-session.entity';

@Injectable()
export class UserSessionService {
  public constructor(private readonly em: EntityManager) {}

  public async createOrUpdate(params: {
    user: User;
    deviceId: string;
    refreshToken: string;
  }): Promise<UserSession> {
    const refreshTokenHash = await hash(params.refreshToken);
    let session: UserSession | null = await this.em.findOne(UserSession, {
      user: params.user,
      deviceId: params.deviceId,
    });

    if (session) {
      session.refreshTokenHash = refreshTokenHash;
    } else {
      session = this.em.create(UserSession, {
        user: params.user,
        deviceId: params.deviceId,
        refreshTokenHash,
      });
    }

    await this.em.persist(session).flush();

    return session;
  }

  public async findForUserAndDevice(
    userId: number,
    deviceId: string,
  ): Promise<UserSession | null> {
    return this.em.findOne(UserSession, { user: { id: userId }, deviceId });
  }

  public async deleteByUserAndDevice(
    userId: number,
    deviceId: string,
  ): Promise<boolean> {
    const session = await this.em.findOneOrFail(UserSession, {
      user: { id: userId },
      deviceId,
    });

    await this.em.remove(session).flush();

    return true;
  }

  public async listAll(): Promise<UserSession[]> {
    return this.em.findAll(UserSession);
  }

  public async clearAll(): Promise<boolean> {
    const sessions = await this.em.findAll(UserSession);

    sessions.forEach((session) => this.em.remove(session));

    await this.em.flush();

    return true;
  }
}
