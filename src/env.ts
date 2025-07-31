import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().default("postgresql://NeonDBGRP_owner:uQSRJ3ET5Yde@ep-solitary-haze-a49pcc3d-pooler.us-east-1.aws.neon.tech/Agents?sslmode=require&channel_binding=require"),
  GEMINI_API_KEY: z.string().default("AIzaSyD7IvyVOpyP2p-rIiNT38e4RJj0KuHFeqU")
})

export const env = envSchema.parse(process.env)

