import { RefreshTokenDto } from "@/application/dtos/Refresh-Token-Dto";
import { RegisterDto } from "@/application/dtos/Register-Dto";
import { IUseCase } from "@/application/interfaces/IUseCase";
import { LoginDto } from "@/application/dtos/Login-Dto";
import { AppError } from "@/domain/errors/app-error";
import { Either } from "@/core/either";

interface IToken {
  accessToken: string;
}

interface IMessage {
  message: string;
}

export class AuthService {
  constructor(
    private loginUseCase: IUseCase<LoginDto, IToken>,
    private registerUseCase: IUseCase<RegisterDto, IMessage>,
    private refreshTokenUseCase: IUseCase<RefreshTokenDto, IToken>
  ) {}

  async login(username: string, password: string): Promise<Either<AppError, IToken>> {
    return this.loginUseCase.execute({ username, password });
  }

  async register(username: string, password: string): Promise<Either<AppError, IMessage>> {
    return this.registerUseCase.execute({ username, password });
  }

  async refreshToken(refreshToken: string): Promise<Either<AppError, IToken>> {
    return this.refreshTokenUseCase.execute({ refreshToken });
  }
}