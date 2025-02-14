import ProductList from "@/app/components/products/ProductList";
import { ProductService } from "@/lib/services/ProductService"; // ✅ Call service directly

export default async function AdminProductsPage() {
  const products = await ProductService.getAllProducts(); // ✅ No need for API

  return (
    <main className="max-w-7xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>
      <ProductList products={products} />
    </main>
  );
}
