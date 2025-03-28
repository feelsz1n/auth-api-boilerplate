import { AppError } from "@/domain/errors/app-error";
import { Either } from "@/core/either";

export interface IUseCase<Input, Output> {
  execute(input: Input): Promise<Either<AppError, Output>>;
}