import { ProductInput } from "@/lib/db/schema";

export function parseProductFormData(formData: FormData): ProductInput {
  return {
    title: formData.get("title") as string,
    articleNumber: formData.get("articleNumber") as string,
    price: Number(formData.get("price")), // ✅ Convert to number
    categoryId: Number(formData.get("categoryId")), // ✅ Convert to number
    description: (formData.get("description") as string) || null, // ✅ Handle optional field
  };
}
