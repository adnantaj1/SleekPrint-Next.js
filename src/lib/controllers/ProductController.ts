import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/ProductService";

export class ProductController {
  // ✅ GET all products
  static async getAllProducts() {
    try {
      const products = await ProductService.getAllProducts();
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json(
        {
          error: "Failed to fetch products",
          details: (error as Error).message,
        },
        { status: 500 }
      );
    }
  }

  // ✅ GET a product by ID
  static async getProductById(id: number) {
    try {
      const product = await ProductService.getProductById(id);
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch product", details: (error as Error).message },
        { status: 500 }
      );
    }
  }

  // ✅ POST - Add a new product
  static async addProduct(req: Request) {
    try {
      const formData = await req.formData();
      const title = formData.get("title") as string;
      const description = formData.get("description") as string;
      const articleNumber = formData.get("articleNumber") as string;
      const listPrice = Number(formData.get("listPrice"));
      const price = Number(formData.get("price"));
      const price50 = Number(formData.get("price50"));
      const price100 = Number(formData.get("price100"));
      const categoryId = Number(formData.get("categoryId"));
      const files = formData.getAll("files") as File[];

      if (!title || !price || !categoryId || files.length === 0) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      // 🔹 Generate image paths (storing locally for now)
      const savedImageUrls: string[] = [];
      for (const file of files) {
        const filePath = `/images/products/${file.name}`;
        savedImageUrls.push(filePath);
      }

      // 🔹 Call ProductService to save the product and images
      const newProduct = await ProductService.addProduct({
        title,
        description,
        articleNumber,
        listPrice,
        price,
        price50,
        price100,
        categoryId,
        imageUrls: savedImageUrls,
      });

      return NextResponse.json({
        success: true,
        productId: newProduct[0].id,
        imageUrls: savedImageUrls,
      });
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to add product", details: (error as Error).message },
        { status: 500 }
      );
    }
  }

  // ✅ DELETE a product
  static async deleteProduct(id: number) {
    try {
      await ProductService.deleteProduct(id);
      return NextResponse.json({ success: true, message: "Product deleted" });
    } catch (error) {
      return NextResponse.json(
        {
          error: "Failed to delete product",
          details: (error as Error).message,
        },
        { status: 500 }
      );
    }
  }
}
