import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/ProductService";
import { handleError } from "../utils/errorHandler";
import { parseProductFormData } from "../utils/formDataUtils";

export class ProductController {
  static async getAllProducts() {
    try {
      const products = await ProductService.getAllProducts();
      return NextResponse.json(products);
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }

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

  static async addProduct(req: Request) {
    try {
      const formData = await req.formData();
      const imageUrls = formData.getAll("files").map(String); // ✅ Extract images
      formData.delete("files");

      const productData = parseProductFormData(formData); // ✅ Use utility function
      const productId = await ProductService.addProduct(productData, imageUrls);
      return NextResponse.json({ success: true, productId }, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: handleError(error) }, { status: 500 });
    }
  }

  static async updateProduct(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const formData = await req.formData();
      const imageUrls = formData.getAll("files").map(String); // ✅ Extract images
      formData.delete("files");

      const productData = parseProductFormData(formData); // ✅ Use utility function
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
