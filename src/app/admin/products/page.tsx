import ProductList from "@/app/components/products/ProductList";
import { ProductService } from "@/lib/services/ProductService";
import Link from "next/link";

export default async function AdminProductsPage() {
  const products = await ProductService.getAllProducts();

  return (
    <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-center mb-8">Manage Products</h1>

      {/* ✅ Add Product Button */}
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/products/add"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          Add Product
        </Link>
      </div>

      {/* ✅ Product List */}
      <ProductList products={products} />
    </main>
  );
}
