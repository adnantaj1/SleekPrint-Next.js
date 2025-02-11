import { db } from "@/lib/db";
import { categories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class CategoryRepository {
  static async getAllCategories() {
    return await db.select().from(categories);
  }

  static async getCategoryById(id: number) {
    return await db.select().from(categories).where(eq(categories.id, id));
  }

  static async upsertCategory(
    id: number | null,
    name: string,
    displayOrder: number
  ) {
    if (id) {
      return await db
        .update(categories)
        .set({ name, displayOrder })
        .where(eq(categories.id, id))
        .returning({ id: categories.id });
    } else {
      return await db
        .insert(categories)
        .values({ name, displayOrder })
        .returning({ id: categories.id });
    }
  }

  static async deleteCategory(id: number) {
    return await db.delete(categories).where(eq(categories.id, id));
  }
}
