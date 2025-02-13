import { ProductController } from "@/lib/controllers/ProductController";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return await ProductController.getProductById(Number(params.id));
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  return await ProductController.deleteProduct(Number(params.id));
}
