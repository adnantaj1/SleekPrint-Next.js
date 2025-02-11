import { NextResponse } from "next/server";
import { CategoryController } from "@/lib/controllers/CategoryController";
import { handleError } from "@/lib/utils/errorHandler";

export async function GET() {
  try {
    const categories = await CategoryController.getAllCategories();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { id, name, displayOrder } = await req.json();
    const category = await CategoryController.upsertCategory(
      id,
      name,
      displayOrder
    );
    return NextResponse.json({ success: true, categoryId: category[0].id });
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    if (!id)
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );

    await CategoryController.deleteCategory(id);
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    return NextResponse.json({ error: handleError(error) }, { status: 500 });
  }
}
