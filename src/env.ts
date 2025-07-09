import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().default("postgres://mlw_agents:mlw_agents@localhost:5432/mlw_agents"),
})

export const env = envSchema.parse(process.env)

