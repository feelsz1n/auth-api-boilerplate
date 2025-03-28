import { AuthDomainService } from "@/domain/services/auth-domain-service";
import { IUseCase } from "@/application/interfaces/IUseCase";
import { AppError } from "@/domain/errors/app-error";
import { Either, left, right } from "@/core/either";
import { LoginDto } from "../dtos/Login-Dto";

interface IRequest extends LoginDto {}

interface IResponse {
    accessToken: string;
    refreshToken: string;
}

export class LoginUseCase implements IUseCase<IRequest, IResponse> {
    constructor(private authDomainService: AuthDomainService) {}

    async execute(loginDto: IRequest): Promise<Either<AppError, IResponse>> {
        const userOrError = await this.authDomainService.validateCredentials(loginDto.username, loginDto.password);

        if (userOrError.isLeft()) {
            return left(userOrError.value);
        }

        const tokens = this.authDomainService.generateTokens(userOrError.value);

        return right(tokens);
    }
}