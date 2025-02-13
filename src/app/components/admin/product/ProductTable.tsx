"use client";
import { useState } from "react";
import { Product } from "@/lib/db/schema"; // ✅ Import Product Type
import Alert from "@/app/components/ui/Alert"; // ✅ Import Custom Alert

type ProductTableProps = {
  products: Product[];
  setEditingProduct: (product: Product | null) => void;
  refresh: () => Promise<void>;
};

export default function ProductTable({
  products,
  setEditingProduct,
  refresh,
}: ProductTableProps) {
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

  // ✅ Handle product deletion
  const handleDelete = async () => {
    if (!deleteProductId) return; // No product selected

    const res = await fetch(`/api/products/${deleteProductId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setAlert({
        message: "✅ Product deleted successfully!",
        type: "success",
      });
      refresh(); // ✅ Refresh product list
    } else {
      setAlert({ message: "❌ Failed to delete product!", type: "error" });
    }

    setDeleteProductId(null); // ✅ Reset selected product

    // Hide alert after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div>
      {/* ✅ Show Custom Alert */}
      {alert && <Alert message={alert.message} type={alert.type} />}

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50 hover:text-gray-700 transition-colors"
            >
              <td className="p-3">{product.id}</td>
              <td className="p-3">{product.title}</td>
              <td className="p-3">${product.price}</td>
              <td className="p-3">{product.categoryId}</td>
              <td className="p-3 flex space-x-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => setEditingProduct(product)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => setDeleteProductId(product.id)} // ✅ No browser confirm()
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ✅ Custom Confirmation for Delete */}
      {deleteProductId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <p className="text-lg mb-4">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Yes, Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setDeleteProductId(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
