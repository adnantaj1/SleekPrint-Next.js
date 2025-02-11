import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/lib/db/schema.ts", // Path to schema
  out: "./drizzle", // Directory for migrations
  dialect: "sqlite", // Set SQLite as the database
  dbCredentials: {
    url: process.env.DATABASE_URL?.replace("sqlite://", "") || "db/sqlite.db", // Path to your SQLite database file
  },
});
