import { ProductRepository } from "@/lib/repositories/ProductRepository";
import { ProductInput } from "../db/schema";

export class ProductService {
  static async getAllProducts() {
    return await ProductRepository.getAllProducts();
  }

  static async getProductDetails(id: number) {
    const product = await ProductRepository.getProductById(id);
    if (!product) throw new Error("Product not found");

    const images = await ProductRepository.getProductImages(id);
    return { ...product[0], images };
  }

  static async addProduct(productData: ProductInput, imageUrls: string[]) {
    const newProduct = await ProductRepository.addProduct(productData);
    if (!newProduct.length) throw new Error("Product creation failed");

    const productId = newProduct[0].id;
    await ProductRepository.addProductImages(productId, imageUrls);
    return productId;
  }

  static async updateProduct(
    id: number,
    productData: ProductInput,
    imageUrls: string[]
  ) {
    await ProductRepository.updateProduct(id, productData);
    await ProductRepository.addProductImages(id, imageUrls);
    return id;
  }

  static async deleteProduct(id: number) {
    return await ProductRepository.deleteProduct(id);
  }

  static async deleteProductImage(imageId: number) {
    return await ProductRepository.deleteProductImage(imageId);
  }
}
