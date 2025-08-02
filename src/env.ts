import { z } from 'zod';
import 'dotenv/config'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().default(process.env.DATABASE_URL ?? ""),
  GEMINI_API_KEY: z.string().default(process.env.GEMINI_API_KEY ?? ""),
});

export const env = envSchema.parse(process.env);
