"use client";
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/db/schema";

type ProductListProps = {
  products: Product[];
};

export default function ProductList({ products }: ProductListProps) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortOption, setSortOption] = useState("name");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  // ✅ Fetch categories dynamically
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("🔥 Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Filter & Sort Products
  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== "all") {
      filtered = filtered.filter(
        (product) => product.categoryId === Number(categoryFilter)
      );
    }

    if (sortOption === "name") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "price") {
      filtered.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, sortOption, products]);

  return (
    <div className="p-6">
      {/* ✅ Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category:
          </label>
          <select
            id="category"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4 text-gray-700">
          <label htmlFor="sort" className="text-sm font-medium text-gray-700">
            Sort By:
          </label>
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
