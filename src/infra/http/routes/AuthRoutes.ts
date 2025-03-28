import { AuthDomainService } from '@/domain/services/auth-domain-service';
import { RefreshTokenDto } from '@/application/dtos/Refresh-Token-Dto';
import { AuthController } from '../controllers/AuthController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { RegisterDto } from '@/application/dtos/Register-Dto';
import { LoginDto } from '@/application/dtos/Login-Dto';
import { FastifyTypedInstance } from '@/core/types/fastify';
import z from 'zod';

export function authRoutes(
  fastify: FastifyTypedInstance,
  authController: AuthController,
  authDomainService: AuthDomainService
) {

    fastify.post<{ Body: LoginDto }>('/login', {
      schema: {
        tags: ['Auth'],
        description: 'Login user',
        body: z.object({
          username: z.string().min(3, 'Username must be at least 3 characters long'),
          password: z.string().min(6, 'Password must be at least 6 characters long'),
        }),
        response: {
          200: z.object({
            accessToken: z.string(),
            refreshToken: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      }
    }, (request, reply) =>
    authController.login(request, reply)
  );


  fastify.post<{ Body: RegisterDto }>('/register', {
    schema: {
        tags: ['Auth'],
        description: 'Register a new user',
        body: z.object({
            username: z.string().min(3, 'Username must be at least 3 characters long'),
            password: z.string().min(6, 'Password must be at least 6 characters long'),
        }),
        response: {
            201: z.object({
                message: z.string(),
            }),
            400: z.object({
                message: z.string(),
            }),
        },
    }
  }, (request, reply) =>
    authController.register(request, reply)
  );


  fastify.post<{ Body: RefreshTokenDto }>('/refresh-token', {
    schema: {
        tags: ['Auth'],
        description: 'Refresh token',
        body: z.object({
            refreshToken: z.string().min(1, 'Refresh token is required'),
        }),
        response: {
            200: z.object({
                accessToken: z.string(),
            }),
            400: z.object({
                message: z.string(),
            }),
        },
    }
  }, (request, reply) =>
    authController.refreshToken(request, reply)
  );


  fastify.get('/protected', {
    preHandler: authMiddleware(authDomainService),
    schema: {
        tags: ['Auth'],
        description: 'Protected route',
        response: {
            200: z.object({
                message: z.string(),
                user: z.object({
                    userId: z.string(),
                    username: z.string(),
                    iat: z.number(),
                    exp: z.number(),
                }),
            }),
            401: z.object({
                message: z.string(),
            }),
        },
    }
  }, async (request, reply) => {
      return { message: 'Protected route', user: request.user };
  });
}