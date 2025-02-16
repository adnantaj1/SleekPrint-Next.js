import { ProductService } from "@/lib/services/ProductService";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // ✅ Ensure `params.id` exists and is valid
  const productId = Number(id);
  if (isNaN(productId)) return notFound();

  // ✅ Fetch product details safely
  const product = await ProductService.getProductDetails(productId);
  if (!product) return notFound();

  // ✅ Construct `productWithValidTypes` with the correct types
  const productWithValidTypes = {
    ...product,
    description: product.description ?? "", // Ensure description is a string
    category: product.category ? { name: product.category.name } : undefined, // Fix category type
  };

  return <ProductDetailClient product={productWithValidTypes} />;
}
