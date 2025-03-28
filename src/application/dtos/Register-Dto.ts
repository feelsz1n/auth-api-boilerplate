import { z } from 'zod';

export const RegisterSchema = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export type RegisterDto = z.infer<typeof RegisterSchema>;