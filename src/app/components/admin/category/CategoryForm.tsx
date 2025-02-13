"use client";
import { useState, useEffect } from "react";
import Alert from "@/app/components/ui/Alert";

export default function CategoryForm({
  refresh,
  editingCategory,
  setEditingCategory,
}: {
  refresh: () => void;
  editingCategory: { id: number; name: string; displayOrder: number } | null;
  setEditingCategory: (category: null) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    displayOrder: "",
  });

  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Prefill form when editing
  useEffect(() => {
    if (editingCategory) {
      setFormData({
        name: editingCategory.name,
        displayOrder: editingCategory.displayOrder.toString(),
      });
    } else {
      setFormData({ name: "", displayOrder: "" }); // ✅ Reset form
    }
  }, [editingCategory]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        id: editingCategory?.id || null,
        name: formData.name,
        displayOrder: Number(formData.displayOrder),
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setAlert({
        message: editingCategory ? "Category updated!" : "Category added!",
        type: "success",
      });
      setFormData({ name: "", displayOrder: "" }); // ✅ Reset fields
      setEditingCategory(null);
      refresh();
    } else {
      setAlert({ message: "Failed to save category", type: "error" });
    }
  };

  return (
    <div className="mb-6">
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-gray-800 max-w-md mx-auto"
      >
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded w-full max-w-xs mx-auto"
          required
        />
        <input
          type="number"
          name="displayOrder"
          placeholder="Display Order"
          value={formData.displayOrder}
          onChange={handleChange}
          className="border p-2 rounded w-full max-w-xs mx-auto"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full max-w-xs mx-auto hover:bg-blue-600 transition-colors"
        >
          {editingCategory ? "Update Category" : "Add Category"}
        </button>
        {editingCategory && (
          <button
            type="button"
            onClick={() => setEditingCategory(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded w-full max-w-xs mx-auto hover:bg-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
