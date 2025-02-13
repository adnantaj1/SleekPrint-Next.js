import ProductList from "@/app/components/admin/product/ProductList";

export default async function AdminProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products = await res.json();

  return <ProductList products={products} />;
}
