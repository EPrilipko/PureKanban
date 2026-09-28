import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { faker } from '@faker-js/faker';
import { LexoRank } from 'lexorank';
import bcrypt from 'bcrypt';

import {
  BoardMember,
  BoardMemberRole,
} from '@/modules/domain/board/board-member/entities/board-member.entity';

import { BoardFactory } from './factories/board.factory';
import { ColumnFactory } from './factories/column.factory';
import { CardFactory } from './factories/card.factory';
import { TagFactory } from './factories/tag.factory';
import { UserFactory } from './factories/user.factory';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const boardFactory = new BoardFactory(em);
    const columnFactory = new ColumnFactory(em);
    const cardFactory = new CardFactory(em);
    const tagFactory = new TagFactory(em);
    const userFactory = new UserFactory(em);

    const primaryUser = (
      await userFactory.create(1, {
        email: 'qwe@qwe.qwe',
        passwordHash: await this.hashPassword('qwe'),
        firstName: 'First',
        lastName: 'User',
      })
    )[0];
    await userFactory.create(1, {
      email: 'qwe2@qwe.qwe',
      passwordHash: await this.hashPassword('qwe2'),
      firstName: 'Second',
      lastName: 'User',
    });

    const boards = await boardFactory.create(3);

    for (const board of boards) {
      em.create(BoardMember, {
        board,
        user: primaryUser,
        role: BoardMemberRole.Author,
      });

      let rank = LexoRank.middle();

      const columns = await columnFactory
        .each((column) => {
          column.rank = rank.toString();
          column.board = board;

          rank = rank.genNext();
        })
        .create(3);

      for (const column of columns) {
        let rank = LexoRank.middle();

        const cards = await cardFactory
          .each((card) => {
            card.rank = rank.toString();
            card.column = column;
            card.board = board;

            rank = rank.genNext();
          })
          .create(faker.number.int({ min: 0, max: 5 }));

        if (cards.length) {
          await tagFactory.createOne({
            board,
            cards: [cards[0]],
          });
        }
      }
    }
  }

  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
