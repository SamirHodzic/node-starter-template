import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async createNew(username: string, email: string, password: string) {
    const user = this.create({
      username,
      email,
      password,
    });

    return await this.save(user);
  }

  async findByEmail(email: string) {
    return await this.findOne({
      where: {
        email,
      },
    });
  }

  async findByUsername(username: string) {
    return await this.findOne({
      where: {
        username,
      },
    });
  }
}
