"use client";
import { useState } from "react";
import CategoryList from "@/app/components/admin/category/CategoryList";
import CategoryForm from "@/app/components/admin/category/CategoryForm";

export default function CategoryPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
    displayOrder: number;
  } | null>(null);

  const refresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <div className="max-w-6xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <CategoryForm
        refresh={refresh}
        editingCategory={editingCategory}
        setEditingCategory={setEditingCategory}
      />
      <CategoryList key={refreshKey} setEditingCategory={setEditingCategory} />
    </div>
  );
}
