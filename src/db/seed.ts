import { reset, seed } from 'drizzle-seed'
import { db, sql } from './connection.ts'
import { schema } from './schema/index.ts'

await reset(db, schema)

await seed(db, schema).refine((f) => {
    return {
        rooms: {
            count: 5,
            Columns: {
                name: f.companyName(),
                description: f.loremIpsum(),
            },
        },
        questions: {
            count: 5,
        },
    }
})

await sql.end()

console.log('Database reset and seeded successfully.') 