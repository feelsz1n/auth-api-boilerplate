import { AuthDomainService } from '@/domain/services/auth-domain-service';
import { FastifyRequest, FastifyReply } from 'fastify';

export function authMiddleware(AuthDomainService: AuthDomainService) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const token = request.headers.authorization?.split(' ')[1] as string;

        if (!token) {
            return reply.status(401).send({ message: 'Unauthorized' });
        }

        const result = AuthDomainService.validateToken(token);

        if (result.isLeft()) {
            return reply.status(result.value.statusCode).send({ message: result.value.message });
        }

        request.user = result.value;
    }
}