import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

// GET /api/products/[id] - Fetch a single product by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await db
      .select()
      .from(products)
      .where(eq(products.id, Number(params.id)));

    if (!product.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product[0]); // ✅ Return the product details
  } catch (error) {
    console.error("🔥 ERROR fetching product:", error);

    // ✅ Cast error to 'Error' type so TypeScript recognizes `.message`
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";

    return NextResponse.json(
      { error: "Failed to fetch product", details: errMessage },
      { status: 500 }
    );
  }
}
