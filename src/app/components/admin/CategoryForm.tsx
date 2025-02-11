"use client";
import { useState } from "react";
import Alert from "@/app/components/ui/Alert";

export default function CategoryForm({ refresh }: { refresh: () => void }) {
  const [name, setName] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, displayOrder: Number(displayOrder) }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setAlert({ message: "Category added successfully!", type: "success" });
      setName("");
      setDisplayOrder("");
      refresh();
    } else {
      setAlert({ message: "Failed to add category", type: "error" });
    }
  };

  return (
    <div className="mb-6">
      {alert && <Alert message={alert.message} type={alert.type} />}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-gray-800"
      >
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded "
          required
        />
        <input
          type="number"
          placeholder="Display Order"
          value={displayOrder}
          onChange={(e) => setDisplayOrder(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Category
        </button>
      </form>
    </div>
  );
}
