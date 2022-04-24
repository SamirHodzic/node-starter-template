import { getRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

export class UserRepository {
  protected readonly repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async createNew(username: string, email: string, password: string) {
    const user = this.repository.create({
      username,
      email,
      password,
    });

    return await this.repository.save(user);
  }

  async findByEmail(email: string) {
    return await this.repository.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.repository.findOne({
      where: {
        username,
      },
    });
  }
}
