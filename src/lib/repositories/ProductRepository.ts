import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class ProductRepository {
  // ✅ Get all products with their images
  static async getAllProducts() {
    return await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        articleNumber: products.articleNumber,
        listPrice: products.listPrice,
        price: products.price,
        price50: products.price50,
        price100: products.price100,
        categoryId: products.categoryId,
        createdAt: products.createdAt,
        images: productImages.imageUrl, // ✅ Fetch product images
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId));
  }

  // ✅ Get product by ID (with images)
  static async getProductById(id: number) {
    return await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        articleNumber: products.articleNumber,
        listPrice: products.listPrice,
        price: products.price,
        price50: products.price50,
        price100: products.price100,
        categoryId: products.categoryId,
        createdAt: products.createdAt,
        images: productImages.imageUrl, // ✅ Fetch product images
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .where(eq(products.id, id));
  }

  // ✅ Add new product (returns the inserted product ID)
  static async addProduct(data: {
    title: string;
    description: string;
    articleNumber: string;
    listPrice: number;
    price: number;
    price50: number;
    price100: number;
    categoryId: number;
  }) {
    return await db
      .insert(products)
      .values(data)
      .returning({ id: products.id });
  }

  // ✅ Add product images (stores image URLs)
  static async addProductImages(productId: number, imageUrls: string[]) {
    const imageRecords = imageUrls.map((url) => ({ productId, imageUrl: url }));
    return await db.insert(productImages).values(imageRecords);
  }

  // ✅ Update an existing product
  static async updateProduct(
    id: number,
    data: Partial<typeof products.$inferInsert>
  ) {
    return await db.update(products).set(data).where(eq(products.id, id));
  }

  // ✅ Delete a product (cascade deletes associated images)
  static async deleteProduct(id: number) {
    return await db.delete(products).where(eq(products.id, id));
  }
}
