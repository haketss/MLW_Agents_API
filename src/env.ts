import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().default("postgres://mlw_agents:mlw_agents@localhost:5432/mlw_agents"),
  GEMINI_API_KEY: z.string().default("AIzaSyD7IvyVOpyP2p-rIiNT38e4RJj0KuHFeqU")
})

export const env = envSchema.parse(process.env)

