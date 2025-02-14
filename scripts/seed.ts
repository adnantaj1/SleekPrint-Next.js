import { db } from "@/lib/db";
import { products, productImages } from "@/lib/db/schema";
import { categories } from "@/lib/db/schema";

async function seedDatabase() {
  try {
    console.log("🚀 Seeding categories...");

    // Insert categories if none exist
    const existingCategories = await db.select().from(categories);
    if (existingCategories.length === 0) {
      await db.insert(categories).values([
        { name: "T-Shirts", displayOrder: 1 },
        { name: "Mugs", displayOrder: 2 },
        { name: "Bags", displayOrder: 3 },
      ]);
    }

    const categoryData = await db.select().from(categories);

    console.log("📦 Seeding products...");

    // Insert sample products
    const sampleProducts = await db
      .insert(products)
      .values([
        {
          title: "Custom Printed T-Shirt",
          description: "High-quality cotton T-shirt with custom print",
          articleNumber: "TSHIRT-001",
          price: 20,
          categoryId: categoryData[0].id, // Assign to "T-Shirts"
          createdAt: new Date().toISOString(),
        },
        {
          title: "Personalized Coffee Mug",
          description: "White ceramic mug with personalized text or logo",
          articleNumber: "MUG-001",
          price: 10,
          categoryId: categoryData[1].id, // Assign to "Mugs"
          createdAt: new Date().toISOString(),
        },
        {
          title: "Eco-Friendly Tote Bag",
          description: "Reusable tote bag made from recycled materials",
          articleNumber: "BAG-001",
          price: 15,
          categoryId: categoryData[2].id, // Assign to "Bags"
          createdAt: new Date().toISOString(),
        },
      ])
      .returning({ id: products.id });

    console.log("🖼️ Seeding product images...");

    // Insert images for each product
    const sampleImages = [
      { productId: sampleProducts[0].id, imageUrl: "/uploads/tshirt1.jpg" },
      { productId: sampleProducts[0].id, imageUrl: "/uploads/tshirt2.jpg" },
      { productId: sampleProducts[1].id, imageUrl: "/uploads/mug1.jpg" },
      { productId: sampleProducts[1].id, imageUrl: "/uploads/mug2.jpg" },
      { productId: sampleProducts[2].id, imageUrl: "/uploads/bag1.jpg" },
      { productId: sampleProducts[2].id, imageUrl: "/uploads/bag2.jpg" },
    ];

    await db.insert(productImages).values(sampleImages);

    console.log("✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
