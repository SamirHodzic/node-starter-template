import { User } from '../entities/User';
import { BaseRepository } from './base.repository';

export class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async findOne(id: string) {
    return await this.repository.findOne(id);
  }
}
