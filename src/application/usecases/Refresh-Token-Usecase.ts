import { AuthDomainService } from "@/domain/services/auth-domain-service";
import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { IUseCase } from "@/application/interfaces/IUseCase";
import { AppError } from "@/domain/errors/app-error";
import { Either, left, right } from "@/core/either";
import { User } from "@/domain/entities/User";

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  accessToken: string;
}

export class RefreshTokenUseCase implements IUseCase<IRequest, IResponse> {
  constructor(private authDomainService: AuthDomainService) {}

  async execute(request: IRequest): Promise<Either<AppError, IResponse>> {
    const payloadOrError = this.authDomainService.validateRefreshToken(request.refreshToken);

    if (payloadOrError.isLeft()) {
      return left(payloadOrError.value);
    }

    const { userId, username } = payloadOrError.value;

    const user = new User({ username, password: "" }, new UniqueEntityID(userId));
    
    const accessToken = this.authDomainService.generateTokens(user).accessToken;
    return right({ accessToken });
  }
}