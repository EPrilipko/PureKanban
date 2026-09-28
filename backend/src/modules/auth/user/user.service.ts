import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

import { hash } from '@/lib/bcrypt';

import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  public constructor(private readonly em: EntityManager) {}

  public async create(input: CreateUserInput): Promise<User> {
    const user = this.em.create(User, {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      passwordHash: await hash(input.password),
    });

    await this.em.persist(user).flush();

    return user;
  }

  public async getById(id: number): Promise<User | null> {
    return this.em.findOne(User, id);
  }

  public async getAll(): Promise<User[]> {
    return this.em.findAll(User);
  }

  public async getByEmail(email: string): Promise<User | null> {
    return this.em.findOne(User, { email });
  }
}
