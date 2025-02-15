import { ProductService } from "@/lib/services/ProductService";
import ProductEditForm from "@/app/components/products/ProductEditForm";
import { notFound } from "next/navigation";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = Number(params.id);
  if (isNaN(productId)) return notFound();

  const product = await ProductService.getProductDetails(productId);
  if (!product) return notFound();

  return <ProductEditForm product={product} />;
}
