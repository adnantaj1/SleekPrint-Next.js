import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";

async function deleteAllProducts() {
  try {
    // ✅ Step 1: Delete all product images first (to maintain integrity)
    await db.delete(productImages);

    // ✅ Step 2: Delete all products
    await db.delete(products);

    console.log("✅ All products and images have been deleted successfully!");
  } catch (error) {
    console.error("❌ Error deleting products:", error);
  }
}

// Run the script
deleteAllProducts();
