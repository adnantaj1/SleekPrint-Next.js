import { db } from "@/lib/db";
import {
  products,
  productImages,
  categories,
  ProductInput,
} from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export class ProductRepository {
  static async getAllProducts() {
    // Fetch products with category
    const productResults = await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        articleNumber: products.articleNumber,
        categoryId: products.categoryId,
        createdAt: products.createdAt,
        category: {
          id: categories.id,
          name: categories.name,
        },
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id));

    // Fetch all images
    const imageResults = await db
      .select({
        id: productImages.id,
        productId: productImages.productId,
        imageUrl: productImages.imageUrl,
      })
      .from(productImages);

    // ✅ Merge products with their images
    const productsWithImages = productResults.map((product) => ({
      ...product,
      images: imageResults
        .filter((img) => img.productId === product.id)
        .map((img) => ({ id: img.id, imageUrl: img.imageUrl })),
    }));

    return productsWithImages;
  }

  //Get Product with category and images
  static async getProductWithDetails(id: number) {
    // ✅ Fetch Product + Category
    const result = await db
      .select({
        id: products.id,
        title: products.title,
        description: products.description,
        price: products.price,
        articleNumber: products.articleNumber,
        categoryId: products.categoryId,
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

    const product = result[0];

    // ✅ Fetch Product Images separately
    const images = await db
      .select({
        id: productImages.id,
        imageUrl: productImages.imageUrl,
      })
      .from(productImages)
      .where(eq(productImages.productId, id))
      .execute();

    // ✅ Combine Product + Images
    return { ...product, images };
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
        categoryId: products.categoryId, // ✅ Include categoryId
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

    return result[0];
  }

  //get image by ID
  static async getProductImageById(imageId: number) {
    const result = await db
      .select()
      .from(productImages)
      .where(eq(productImages.id, imageId))
      .execute();

    return result.length ? result[0] : null;
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
  // ✅ Update a product
  static async updateProduct(id: number, updatedData: Partial<ProductInput>) {
    await db.update(products).set(updatedData).where(eq(products.id, id));
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
