import { AuthDomainService } from "@/domain/services/auth-domain-service";
import { IUseCase } from "@/application/interfaces/IUseCase";
import { AppError } from "@/domain/errors/app-error";
import { Either, left, right } from "@/core/either";
import { RegisterDto } from "../dtos/Register-Dto";

interface IRequest extends RegisterDto {}

interface IResponse {
    message: string;
}

export class RegisterUseCase implements IUseCase<IRequest, IResponse> {
    constructor(private authDomainService: AuthDomainService) {}

    async execute(registerDto: IRequest): Promise<Either<AppError, IResponse>> {
        const userOrError = await this.authDomainService.registerUser(registerDto.username, registerDto.password);

        if (userOrError.isLeft()) {
            return left(userOrError.value);
        }

        await this.authDomainService.saveUser(userOrError.value);
        
        return right({ message: "User registered successfully" });
    }
}