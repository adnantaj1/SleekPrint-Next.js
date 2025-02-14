"use client"; // ✅ Client Component
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/db/schema";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) => product.categoryId === Number(categoryFilter)
        )
      );
    }
  }, [categoryFilter, products]);

  return (
    <div>
      {/* ✅ Filter by Category */}
      <div className="flex justify-center mb-6">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="all">All Categories</option>
          <option value="1">T-Shirts</option>
          <option value="2">Mugs</option>
          <option value="3">Bags</option>
        </select>
      </div>

      {/* ✅ Display Products in Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
