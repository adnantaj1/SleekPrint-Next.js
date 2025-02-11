import ProductList from "@/app/components/products/ProductList";

export default async function ProductsPage() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  const products = await res.json();

  return (
    <main className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">All Products</h1>
      <ProductList products={products} />{" "}
      {/* ✅ Using ProductList for better structure */}
    </main>
  );
}
