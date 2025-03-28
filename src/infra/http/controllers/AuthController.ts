import { RefreshTokenDto } from "@/application/dtos/Refresh-Token-Dto";
import { AuthService } from "@/application/services/AuthService";
import { RegisterDto } from "@/application/dtos/Register-Dto";
import { LoginDto } from "@/application/dtos/Login-Dto";
import { FastifyRequest, FastifyReply } from "fastify";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(request: FastifyRequest<{ Body: LoginDto }>, reply: FastifyReply) {
    const result = await this.authService.login(request.body.username, request.body.password);

    if (result.isLeft()) {
      return reply.status(result.value.statusCode).send({ message: result.value.message });
    }

    return reply.send(result.value);
  }

  async register(request: FastifyRequest<{ Body: RegisterDto }>, reply: FastifyReply) {
    const result = await this.authService.register(request.body.username, request.body.password);

    if (result.isLeft()) {
      return reply.status(result.value.statusCode).send({ message: result.value.message });
    }

    return reply.status(201).send(result.value);
  }

  async refreshToken(request: FastifyRequest<{ Body: RefreshTokenDto }>, reply: FastifyReply) {
    const result = await this.authService.refreshToken(request.body.refreshToken);

    if (result.isLeft()) {
      return reply.status(result.value.statusCode).send({ message: result.value.message });
    }

    return reply.send(result.value);
  }
}