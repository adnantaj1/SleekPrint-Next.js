import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

// Create a SQLite database connection
const sqlite = new Database(
  process.env.DATABASE_URL?.replace("sqlite://", "") || "db/sqlite.db"
);

// Initialize Drizzle ORM with SQLite connection
export const db = drizzle(sqlite);
