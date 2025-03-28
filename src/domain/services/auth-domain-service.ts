import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { PasswordHash } from '@/domain/ValueObjects/Password-Hash';
import { AppError } from '@/domain/errors/app-error';
import { JWTService } from '@/infra/auth/JWTService';
import { Either, left, right } from '@/core/either';
import { User } from '@/domain/entities/User';

export interface PayloadGenerated {
  userId: string,
  username: string
}

export interface PayloadTokens {
  accessToken: string,
  refreshToken: string
}

export class AuthDomainService {
  constructor(private userRepository: IUserRepository, private jwtService: JWTService) {}

  async registerUser(username: string, password: string): Promise<Either<AppError, User>> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) {
      return left(new AppError('Username already exists', 400));
    }

    const user = new User({
      username,
      password: PasswordHash.create(password).getValue(),
    });

    return right(user);
  }
  
  async saveUser(user: User): Promise<void> {
    await this.userRepository.save(user);
  }


  async validateCredentials(username: string, password: string): Promise<Either<AppError, User>> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      return left(new AppError('Credenciais inválidas', 401));
    }

    if (!PasswordHash.compare(password, user.password)) {
      return left(new AppError('Credenciais inválidas', 401));
    }

    return right(user);
  }

  generateTokens(user: User): PayloadTokens {
    const payload = { userId: user.id.toString(), username: user.username };
    const accessToken = this.jwtService.generateToken(payload);
    const refreshToken = this.jwtService.generateRefreshToken(payload);
    return { accessToken, refreshToken };
  }

  validateToken(token: string): Either<AppError, PayloadGenerated> {
    return this.jwtService.validateToken(token);
  }

  validateRefreshToken(token: string): Either<AppError, PayloadGenerated> {
    return this.jwtService.validateRefreshToken(token);
  }
}
