"use client";
import { useState } from "react";
import CategoryList from "@/app/components/admin/CategoryList";
import CategoryForm from "@/app/components/admin/CategoryForm";

export default function CategoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => setRefreshKey((prev) => prev + 1); // ✅ Triggers re-render to refresh categories

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <CategoryForm refresh={refresh} />
      <CategoryList key={refreshKey} />
    </div>
  );
}
