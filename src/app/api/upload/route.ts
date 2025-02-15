import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { IncomingMessage } from "http";
import { Readable } from "stream";
import { ProductService } from "@/lib/services/ProductService";

// ✅ Ensure Next.js doesn't parse the request body
export const config = {
  api: {
    bodyParser: false,
  },
};

// ✅ Convert Next.js `Request` to `IncomingMessage`
async function getRawBody(req: Request): Promise<IncomingMessage> {
  const readable = new Readable();
  readable.push(Buffer.from(await req.arrayBuffer())); // ✅ Convert ArrayBuffer to Buffer
  readable.push(null);

  return Object.assign(readable, req, {
    headers: Object.fromEntries(req.headers),
    method: req.method || "POST",
    url: req.url || "",
  }) as unknown as IncomingMessage;
}

// ✅ Parse Form Data
async function parseForm(
  req: Request
): Promise<[formidable.Fields, formidable.Files]> {
  console.log("📡 [API] Parsing form...");

  const form = formidable({ multiples: true, keepExtensions: true });

  return new Promise(async (resolve, reject) => {
    const rawReq = await getRawBody(req);
    form.parse(rawReq, (err, fields, files) => {
      if (err) {
        console.error("❌ Error parsing form:", err);
        reject(err);
      } else {
        console.log("✅ Form parsed successfully.");
        resolve([fields, files]);
      }
    });
  });
}

// ✅ Handle Image Upload
export async function POST(req: Request) {
  try {
    console.log("📡 [API] Upload request received.");

    // ✅ Parse form data
    const [, files] = await parseForm(req);
    console.log("📡 [API] Form data parsed:", files);

    // ✅ Define Upload Directory Path
    const uploadDir = path.join(process.cwd(), "public/uploads");
    console.log("📁 Upload Directory:", uploadDir);

    // ✅ Ensure the `uploads` directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("✅ Created uploads folder.");
    }

    const uploadedFiles: string[] = [];

    // ✅ Flatten & filter files array
    const fileArray = Object.values(files)
      .flat()
      .filter((file): file is formidable.File => !!file);

    if (fileArray.length === 0) {
      console.warn("⚠️ No files uploaded.");
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    console.log("📡 [API] Processing uploaded files:", fileArray);

    // ✅ Move each uploaded file to `/public/uploads`
    for (const file of fileArray) {
      const fileExt = path.extname(file.originalFilename || "");
      const newFilename = `${Date.now()}${fileExt}`;
      const newPath = path.join(uploadDir, newFilename);

      console.log("📡 [API] Moving file:", file.filepath, "→", newPath);

      try {
        fs.renameSync(file.filepath, newPath);
        uploadedFiles.push(`/uploads/${newFilename}`);
      } catch (error) {
        console.error("❌ Error moving file:", error);
      }
    }

    console.log("✅ [API] Successfully uploaded files:", uploadedFiles);

    return NextResponse.json(
      { success: true, imageUrls: uploadedFiles },
      { status: 201 }
    );
  } catch (error) {
    console.error("🔥 [API] Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 }
    );
  }
}

// ✅ DELETE /api/products/images/:id - Delete a product image
export async function DELETE(req: Request) {
  try {
    console.log("📡 [API] Delete image request received.");

    // ✅ Parse request body
    const { imageId, imageUrl } = await req.json();
    if (!imageId || !imageUrl) {
      return NextResponse.json(
        { error: "Image ID and URL are required" },
        { status: 400 }
      );
    }

    // ✅ Define the file path
    const filePath = path.join(process.cwd(), "public", imageUrl);

    // ✅ Check if the file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // ✅ Delete file
      console.log("✅ [API] Image file deleted:", filePath);
    } else {
      console.warn("⚠️ [API] File not found, skipping:", filePath);
    }

    // ✅ Delete the image record from the database
    await ProductService.deleteProductImage(imageId);

    return NextResponse.json(
      { success: true, message: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("🔥 [API] Error deleting image:", error);
    return NextResponse.json(
      { error: "Failed to delete image" },
      { status: 500 }
    );
  }
}
