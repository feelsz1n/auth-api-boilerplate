import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({  
  DATABASE_URL: z.string(),
  
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default('1h'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data