import { ProductService } from "@/lib/services/ProductService";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export default async function ProductDetailPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // ✅ Ensure `params` exists
  // ✅ Ensure `params.id` is a valid number
  const productId = Number(id);
  if (isNaN(productId)) return notFound();

  // ✅ Fetch product details safely
  const product = await ProductService.getProductDetails(productId);
  if (!product) return notFound();

  // ✅ Fetch product images
  const images = await ProductService.getProductImages(productId);

  // Pass data to the client component
  return (
    <ProductDetailClient
      product={{
        ...product,
        images,
      }}
    />
  );
}
