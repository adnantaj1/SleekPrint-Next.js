import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/ProductService";
import { handleError } from "@/lib/utils/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const productId = Number(params.id);
    if (isNaN(productId)) {
      return NextResponse.json(
        { error: "Invalid product ID" },
        { status: 400 }
      );
    }

    // ✅ Fetch product images using the service layer
    const images = await ProductService.getProductImages(productId);

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}
