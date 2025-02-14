import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { productImages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { handleError } from "@/lib/utils/errorHandler";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const images = await db
      .select()
      .from(productImages)
      .where(eq(productImages.productId, Number(params.id)));

    return NextResponse.json(images);
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}
