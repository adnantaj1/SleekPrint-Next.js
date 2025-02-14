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

  // ✅ Fetch product images
  const images = await ProductService.getProductImages(productId);

  // ✅ Construct `productWithImages` that matches `ProductDetailClientProps`
  const productWithImages = {
    id: product.id,
    title: product.title,
    description: product.description || "", // Ensure it's not `null`
    price: product.price,
    articleNumber: product.articleNumber,
    category: product.category ? { name: product.category.name } : undefined, // Ensure category matches expected type
    images: images.map((img) => ({
      id: img.id,
      imageUrl: img.imageUrl,
    })), // Ensure images array is properly formatted
  };

  return <ProductDetailClient product={productWithImages} />;
}
