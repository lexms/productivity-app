import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// For Supabase, we use the connection string from environment variables
const connectionString = process.env.DATABASE_URL!

// Create the postgres client
const client = postgres(connectionString, { prepare: false })

// Create the drizzle instance
export const db = drizzle(client, { schema })

// Export schema for use in other files
export * from "./schema"
