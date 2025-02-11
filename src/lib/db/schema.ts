import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Categories Table
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order").notNull(),
});

// Products Table
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  articleNumber: text("article_number").notNull().unique(),
  listPrice: integer("list_price").notNull(),
  price: integer("price").notNull(),
  price50: integer("price_50").notNull(),
  price100: integer("price_100").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  imageUrl: text("image_url"),
});

// Users Table (Authentication)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // Will be hashed
});
