import { db } from "@/lib/db";
import {
  products,
  productImages,
  categories,
  ProductInput,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class ProductRepository {
  // Get all products
  static async getAllProducts() {
    return await db.select().from(products);
  }

  // Get product by ID with category
  static async getProductById(id: number) {
    const result = await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        articleNumber: products.articleNumber,
        category: {
          id: categories.id,
          name: categories.name,
        },
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, id))
      .execute();

    if (result.length === 0) return null;

    // Format the result to include the category
    const product = result[0];
    return {
      ...product,
      category: product.category || null, // Ensure category is null if not found
    };
  }

  // Get product images by product ID
  static async getProductImages(productId: number) {
    return await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, productId));
  }

  // Add a new product
  static async addProduct(productData: ProductInput) {
    return await db
      .insert(products)
      .values(productData)
      .returning({ id: products.id });
  }

  // Update a product
  static async updateProduct(id: number, productData: ProductInput) {
    return await db
      .update(products)
      .set(productData)
      .where(eq(products.id, id));
  }

  // Delete a product
  static async deleteProduct(id: number) {
    await db.delete(productImages).where(eq(productImages.productId, id)); // Delete images first
    return await db.delete(products).where(eq(products.id, id));
  }

  // Add product images
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

  // Delete a product image
  static async deleteProductImage(imageId: number) {
    return await db.delete(productImages).where(eq(productImages.id, imageId));
  }
}
