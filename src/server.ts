import { fastifyCors } from '@fastify/cors';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { fastify } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { env } from './env.ts'
import { sql } from "./db/connection.ts"
const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:3332',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'ok';
});
app.register(getRoomsRoute)

app.listen({ port: env.PORT })