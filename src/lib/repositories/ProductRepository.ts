import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class ProductRepository {
  static async getAllProducts() {
    return await db.select().from(products);
  }

  static async getProductById(id: number) {
    return await db.select().from(products).where(eq(products.id, id));
  }

  static async addProduct(productData: any) {
    return await db
      .insert(products)
      .values(productData)
      .returning({ id: products.id });
  }

  static async updateProduct(id: number, productData: any) {
    return await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id));
  }

  static async deleteProduct(id: number) {
    await db.delete(productImages).where(eq(productImages.productId, id)); // ✅ Delete images first
    return await db.delete(products).where(eq(products.id, id));
  }

  static async addProductImages(productId: number, imageUrls: string[]) {
    if (imageUrls.length > 0) {
      await db.insert(productImages).values(
        imageUrls.map((url) => ({
          productId,
          imageUrl: url,
        }))
      );
    }
  }

  static async getProductImages(productId: number) {
    return await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId));
  }

  static async deleteProductImage(imageId: number) {
    return await db.delete(productImages).where(eq(productImages.id, imageId));
  }
}
