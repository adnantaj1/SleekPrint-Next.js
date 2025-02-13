import { ProductController } from "@/lib/controllers/ProductController";

export async function GET() {
  return await ProductController.getAllProducts();
}

export async function POST(req: Request) {
  return await ProductController.addProduct(req);
}
