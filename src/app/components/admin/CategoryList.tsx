"use client";
import { useState, useEffect } from "react";
import Alert from "@/app/components/ui/Alert";

type Category = {
  id: number;
  name: string;
  displayOrder: number;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch("/api/categories");
      const data = await res.json();
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
      setCategories(categories.filter((category) => category.id !== id));
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
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Display Order</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b">
              <td className="p-2">{category.id}</td>
              <td className="p-2">{category.name}</td>
              <td className="p-2">{category.displayOrder}</td>
              <td className="p-2">
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
