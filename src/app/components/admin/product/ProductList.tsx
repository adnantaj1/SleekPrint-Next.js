"use client"; // ✅ Client Component
import { useState, useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import { Product } from "@/lib/db/schema"; // ✅ Import Product Type

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ✅ Fetch products when component loads
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    };
    fetchProducts();
  }, []);

  // ✅ Function to refresh product list after add/update/delete
  const refresh = async () => {
    const res = await fetch("/api/products");
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Products</h1>

      {/* ✅ Product Form for Adding & Editing */}
      <ProductForm
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
        refresh={refresh} // ✅ Refresh after submitting form
      />

      {/* ✅ Product Table for Listing & Managing Products */}
      <ProductTable
        products={products}
        setEditingProduct={setEditingProduct}
        refresh={refresh} // ✅ Refresh after deleting product
      />
    </div>
  );
}
