import { ProductRepository } from "@/lib/repositories/ProductRepository";

export class ProductService {
  // ✅ Fetch all products (with images)
  static async getAllProducts() {
    return await ProductRepository.getAllProducts();
  }

  // ✅ Fetch a product by ID (with images)
  static async getProductById(id: number) {
    const product = await ProductRepository.getProductById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  // ✅ Add a new product (validates data before insertion)
  static async addProduct({
    title,
    description,
    articleNumber,
    listPrice,
    price,
    price50,
    price100,
    categoryId,
    imageUrls,
  }: {
    title: string;
    description: string;
    articleNumber: string;
    listPrice: number;
    price: number;
    price50: number;
    price100: number;
    categoryId: number;
    imageUrls: string[];
  }) {
    // 🔹 Validate Required Fields
    if (
      !title ||
      !articleNumber ||
      !listPrice ||
      !price ||
      !price50 ||
      !price100 ||
      !categoryId ||
      imageUrls.length === 0
    ) {
      throw new Error("Missing required fields");
    }

    // 🔹 Ensure Values are Correct Types
    if (
      typeof price !== "number" ||
      typeof listPrice !== "number" ||
      typeof categoryId !== "number"
    ) {
      throw new Error("Invalid data types");
    }

    // 🔹 Insert Product
    const newProduct = await ProductRepository.addProduct({
      title,
      description,
      articleNumber,
      listPrice,
      price,
      price50,
      price100,
      categoryId,
    });

    // 🔹 Insert Product Images
    await ProductRepository.addProductImages(newProduct[0].id, imageUrls);

    return newProduct;
  }

  // ✅ Update an existing product
  static async updateProduct(
    id: number,
    data: Partial<{
      title: string;
      description: string;
      price: number;
      categoryId: number;
    }>
  ) {
    return await ProductRepository.updateProduct(id, data);
  }

  // ✅ Delete a product
  static async deleteProduct(id: number) {
    return await ProductRepository.deleteProduct(id);
  }
}
