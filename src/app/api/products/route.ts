import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products } from "@/lib/db/schema";

// GET /api/products - Fetch all products
export async function GET() {
  try {
    const allProducts = await db.select().from(products);
    return NextResponse.json(allProducts);
  } catch (error) {
    // ✅ Cast error to 'Error' type so TypeScript recognizes `.message`
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to fetch products", details: errMessage },
      { status: 500 }
    );
  }
}

// POST /api/products - Add a new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      articleNumber,
      listPrice,
      price,
      price50,
      price100,
      categoryId,
      imageUrl,
    } = body;

    // 🔹 Validate Required Fields
    if (
      !title ||
      !articleNumber ||
      !listPrice ||
      !price ||
      !price50 ||
      !price100 ||
      !categoryId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔹 Insert into the database
    const newProduct = await db
      .insert(products)
      .values({
        title: String(title),
        description: description ? String(description) : null,
        articleNumber: String(articleNumber),
        listPrice: Number(listPrice),
        price: Number(price),
        price50: Number(price50),
        price100: Number(price100),
        categoryId: Number(categoryId),
        imageUrl: imageUrl ? String(imageUrl) : null,
      })
      .returning({ id: products.id });

    return NextResponse.json(
      { success: true, productId: newProduct[0].id },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 ERROR inserting product:", error);
    // ✅ Cast error to 'Error' type so TypeScript recognizes `.message`
    const errMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      { error: "Failed to add product", details: errMessage },
      { status: 500 }
    );
  }
}
