import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/ProductService";
import { handleError } from "../utils/errorHandler";
import { parseProductFormData } from "../utils/formDataUtils";

export class ProductController {
  // Get all products
  static async getAllProducts() {
    try {
      const products = await ProductService.getAllProducts();
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }

  // Get product details
  static async getProductDetails(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const product = await ProductService.getProductDetails(Number(params.id));
      return NextResponse.json(product);
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 404 });
    }
  }

  // Add a new product
  static async addProduct(req: Request) {
    try {
      // ✅ Parse the JSON payload
      const { title, description, articleNumber, price, categoryId, images } =
        await req.json(); // Ensure `articleNumber` is included

      // ✅ Validate required fields
      if (!title || !articleNumber || !price || !categoryId) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      // ✅ Add the product using the service layer
      const productId = await ProductService.addProduct(
        { title, description, articleNumber, price, categoryId }, // ✅ Product data with `articleNumber`
        images // Image URLs
      );

      return NextResponse.json({ success: true, productId }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }

  // Update a product
  static async updateProduct(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const formData = await req.formData();
      const imageUrls = formData.getAll("files").map(String); // Extract images
      formData.delete("files");

      const productData = parseProductFormData(formData); // Parse form data
      await ProductService.updateProduct(
        Number(params.id),
        productData,
        imageUrls
      );
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }

  // Delete a product
  static async deleteProduct(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      await ProductService.deleteProduct(Number(params.id));
      return NextResponse.json({ success: true });
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }
}
