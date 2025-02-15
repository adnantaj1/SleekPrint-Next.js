import { ProductRepository } from "@/lib/repositories/ProductRepository";
import { ProductInput } from "../db/schema";

export class ProductService {
  // Get all products
  static async getAllProducts() {
    return await ProductRepository.getAllProducts();
  }

  // Get product details (with images and category)
  static async getProductDetails(id: number) {
    const product = await ProductRepository.getProductById(id);
    if (!product) throw new Error("Product not found");

    const images = await ProductRepository.getProductImages(id);

    return {
      ...product,
      images,
      categoryId: product.category?.id || 0, // ✅ Ensure categoryId exists
    };
  }

  // ✅ Fetch product images by product ID
  static async getProductImages(productId: number) {
    return await ProductRepository.getProductImages(productId);
  }
  // ✅ Fetch product images by Image ID
  static async getProductImageById(imageId: number) {
    return await ProductRepository.getProductImageById(imageId);
  }

  // Add a new product
  static async addProduct(productData: ProductInput, imageUrls: string[]) {
    const newProduct = await ProductRepository.addProduct(productData);
    if (!newProduct.length) throw new Error("Product creation failed");

    const productId = newProduct[0].id;
    await ProductRepository.addProductImages(productId, imageUrls);
    return productId;
  }

  // Update a product
  static async updateProduct(
    id: number,
    updatedData: Record<string, any>,
    newImageUrls: string[]
  ) {
    await ProductRepository.updateProduct(id, updatedData);

    if (newImageUrls.length > 0) {
      await ProductRepository.addProductImages(id, newImageUrls);
    }
  }
  // Delete a product
  static async deleteProduct(id: number) {
    return await ProductRepository.deleteProduct(id);
  }

  // Delete a product image
  static async deleteProductImage(imageId: number) {
    return await ProductRepository.deleteProductImage(imageId);
  }
}
