import { NextResponse } from "next/server";
import { ProductService } from "@/lib/services/ProductService";
import { ProductController } from "@/lib/controllers/ProductController";
import fs from "fs";
import path from "path";

export async function DELETE(
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

    console.log(`📡 [API] Deleting product ID: ${productId}`);

    // ✅ Fetch product images before deleting the product
    const images = await ProductService.getProductImages(productId);

    // ✅ Delete images from storage
    images.forEach((image) => {
      const filePath = path.join(process.cwd(), "public", image.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`✅ Deleted image file: ${filePath}`);
      }
    });

    // ✅ Delete product and images from DB
    await ProductService.deleteProduct(productId);
    console.log(`✅ Deleted product ID: ${productId}`);

    return NextResponse.json(
      { success: true, message: "Product deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 [API] Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}

export async function PUT(
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

    console.log(`📡 [API] Updating product ID: ${productId}`);

    const formData = await req.formData();
    const newImageFiles = formData.getAll("files") as File[];
    const updatedFields: Record<string, any> = {};

    // ✅ Extract updated text fields from FormData
    ["title", "description", "articleNumber", "price", "categoryId"].forEach(
      (field) => {
        if (formData.has(field)) {
          updatedFields[field] = formData.get(field);
        }
      }
    );

    // ✅ Upload new images (if any)
    const uploadDir = path.join(process.cwd(), "public/uploads");
    const newImageUrls: string[] = [];

    if (newImageFiles.length > 0) {
      for (const file of newImageFiles) {
        const fileExt = path.extname(file.name);
        const newFilename = `${Date.now()}${fileExt}`;
        const newPath = path.join(uploadDir, newFilename);

        // ✅ Save file locally
        const buffer = await file.arrayBuffer();
        fs.writeFileSync(newPath, Buffer.from(buffer));

        newImageUrls.push(`/uploads/${newFilename}`);
      }
    }

    // ✅ Update product in DB
    await ProductService.updateProduct(productId, updatedFields, newImageUrls);
    console.log(`✅ Product updated successfully: ${productId}`);

    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error("🔥 [API] Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
