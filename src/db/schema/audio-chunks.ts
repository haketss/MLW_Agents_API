
import { pgTable, text, timestamp, uuid, vector } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";

export const audioChuncks = pgTable('audio_chunks', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().references(() => rooms.id).notNull(),
    trascrition: text().notNull(),
    enbedings: vector({ dimensions: 768 }),
    createdAt: timestamp().defaultNow().notNull(),

})