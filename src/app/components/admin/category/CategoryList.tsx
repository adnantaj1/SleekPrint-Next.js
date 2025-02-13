"use client";
import { useState, useEffect } from "react";
import Alert from "@/app/components/ui/Alert";

type Category = { id: number; name: string; displayOrder: number };

export default function CategoryList({
  setEditingCategory,
}: {
  setEditingCategory: (category: Category) => void;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data: Category[] = await res.json();
      setCategories(data);
    }
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const res = await fetch("/api/categories", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setCategories((prev) => prev.filter((category) => category.id !== id));
      setAlert({ message: "Category deleted successfully!", type: "success" });
    } else {
      setAlert({ message: "Failed to delete category", type: "error" });
    }
  };

  return (
    <div>
      {alert && <Alert message={alert.message} type={alert.type} />}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Display Order</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="p-3 text-gray-700">{category.id}</td>
              <td className="p-3 text-gray-700">{category.name}</td>
              <td className="p-3 text-gray-700">{category.displayOrder}</td>
              <td className="p-3">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(category)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
