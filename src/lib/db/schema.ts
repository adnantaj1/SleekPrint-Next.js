import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type ProductInput = InferInsertModel<typeof products>;
export type Product = InferSelectModel<typeof products>;

export type ProductImage = InferInsertModel<typeof productImages>;

// ✅ Categories Table
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull().unique(),
  displayOrder: integer("display_order").notNull(),
});

// ✅ Products Table
export const products = sqliteTable("products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description"),
  articleNumber: text("article_number").notNull().unique(),
  price: integer("price").notNull(),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

// ✅ Products-Image Table
export const productImages = sqliteTable("product_images", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  imageUrl: text("image_url").notNull(),
  uploadedAt: text("uploaded_at").default("CURRENT_TIMESTAMP"),
});

// Users Table (Authentication)
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // Will be hashed
});
