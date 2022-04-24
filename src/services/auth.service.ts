import { UserRepository } from '../db/repositories/user.repository';
import bcrypt from 'bcrypt';
import { generateToken } from '../config/jwt';
import { ApiError } from '../util/error-handler';
import { getCustomRepository } from 'typeorm';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  public login = async (email: string, password: string) => {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      throw new ApiError(401, 'Invalid Password');
    }

    const accessToken = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });
    return { accessToken };
  };

  public signup = async (username: string, email: string, pass: string) => {
    if (await this.userRepository.findByEmail(email)) {
      throw new ApiError(400, 'Email is already in use');
    }

    const user = await this.userRepository.createNew(
      username,
      email,
      bcrypt.hashSync(pass, 8)
    );
    const { ['password']: _, ...res } = user;
    return res;
  };
}
