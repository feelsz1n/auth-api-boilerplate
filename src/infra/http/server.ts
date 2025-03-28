import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { RefreshTokenUseCase } from "@/application/usecases/Refresh-Token-Usecase";
import { AuthDomainService } from "@/domain/services/auth-domain-service";
import { RegisterUseCase } from "@/application/usecases/Register-Usecase";
import { UserRepository } from "@/infra/repositories/UserRepository.impl";
import { AuthController } from "@/infra/http/controllers/AuthController";
import { LoginUseCase } from "@/application/usecases/Login-Usecase";
import { AuthService } from "@/application/services/AuthService";
import { authRoutes } from "@/infra/http/routes/AuthRoutes";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { JWTService } from "@/infra/auth/JWTService";
import { fastifySwagger } from "@fastify/swagger";
import { PrismaClient } from "@prisma/client";
import { fastifyCors } from "@fastify/cors";
import { env } from "@/infra/config/env";
import fastifyJwt from "@fastify/jwt";
import { fastify } from "fastify";

export function createApp() {
  const app = fastify().withTypeProvider<ZodTypeProvider>();

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(fastifyCors, {
    origin: '*', 
  });

  app.register(fastifyJwt, {
    secret: env.JWT_SECRET, 
  });

  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Auth API',
        description: 'Auth API Boilerplate with JWT authentication and username/password login.',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  const prisma = new PrismaClient();
  const userRepository = new UserRepository(prisma); 
  const jwtService = new JWTService(env.JWT_EXPIRES_IN, env.REFRESH_TOKEN_EXPIRES_IN, app);
  const authDomainService = new AuthDomainService(userRepository, jwtService);

  const loginUseCase = new LoginUseCase(authDomainService);
  const registerUseCase = new RegisterUseCase(authDomainService);
  const refreshTokenUseCase = new RefreshTokenUseCase(authDomainService);

  const authService = new AuthService(loginUseCase, registerUseCase, refreshTokenUseCase); 
  const authController = new AuthController(authService); 

  app.register((fastify, _, done) => {
    authRoutes(fastify, authController, authDomainService);
    done();
  });

  return app;
}