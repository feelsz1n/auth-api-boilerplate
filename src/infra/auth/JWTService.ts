import { PayloadGenerated } from "@/domain/services/auth-domain-service";
import { FastifyTypedInstance } from "@/core/types/fastify";
import { AppError } from "@/domain/errors/app-error";
import { Either, left, right } from "@/core/either";

export class JWTService {
  constructor(
    private expiresIn: string,
    private refreshExpiresIn: string,
    private app: FastifyTypedInstance,
  ) {}

  generateToken(payload: PayloadGenerated): string {
    return this.app.jwt.sign(payload, { expiresIn: this.expiresIn });
  }

  generateRefreshToken(payload: PayloadGenerated): string {
    return this.app.jwt.sign(payload, { expiresIn: this.refreshExpiresIn });
  }

  validateToken(token: string): Either<AppError, PayloadGenerated> {
    try {
      const payload = this.app.jwt.verify(token) as PayloadGenerated;
      return right(payload);
    } catch (error) {
      return left(new AppError('Invalid token provided', 401));
    }
  }

  validateRefreshToken(token: string): Either<AppError, PayloadGenerated> {
    try {
      const payload = this.app.jwt.verify(token) as PayloadGenerated;
      return right(payload);
    } catch (error) {
      return left(new AppError('Invalid Refresh Token Provided', 401));
    }
  }
}