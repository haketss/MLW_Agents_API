import { fastifyCors } from '@fastify/cors';
import { fastifyMultipart } from '@fastify/multipart';
import { fastify } from 'fastify';
import {
    serializerCompiler,
    validatorCompiler,
    type ZodTypeProvider,
} from 'fastify-type-provider-zod';
import { env } from './env.ts';
import { createQuestionRoute } from './http/routes/create-question.ts';
import { createRoomRoute } from './http/routes/create-room.ts';
import { getRoomsQuestions } from './http/routes/get-room-question.ts';
import { getRoomsRoute } from './http/routes/get-rooms.ts';
import { uploadAudioRoute } from './http/routes/updoad-audio.ts';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
    origin: 'http://localhost:5173',
});

app.register(fastifyMultipart);
app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'MLW Agents API',
            description: 'API for MLW Agents',
            version: '1.0.0',
        },
    },
});
app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.get('/health', () => {
    return 'ok';
});
app.register(getRoomsRoute);
app.register(createRoomRoute);
app.register(getRoomsQuestions);
app.register(createQuestionRoute);
app.register(uploadAudioRoute);

import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';

import { pino } from 'pino';
import pretty from 'pino-pretty';


const logger = pino(pretty({
    colorize: true,
    translateTime: 'SYS:standard',
    ignore: 'pid,hostname'
}));

logger.info('Servidor iniciado com sucesso!');
logger.info(`Servidor rodando na porta http://localhost:${process.env.PORT}`);

app.listen({ port: env.PORT });
