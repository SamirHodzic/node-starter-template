import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../db/repositories/user.repository';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public getUserInfo = async (id: string) => {
    const user = await this.userRepository.findOne(id);
    const { ['password']: _, ...res } = user;
    return res;
  };
}
