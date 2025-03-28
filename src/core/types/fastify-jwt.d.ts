import 'fastify-jwt';

declare module 'fastify-jwt' {
    interface FastifyJWT {
        payload: {
            userId: string,
            username: string
        }
    }
}