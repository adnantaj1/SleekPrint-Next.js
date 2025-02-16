"use client"; // Mark as a client component
import { useState } from "react";
import Alert from "@/app/components/ui/Alert";
import Link from "next/link";
import Image from "next/image"; // ✅ Import next/image

type ProductDetailClientProps = {
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    articleNumber: string;
    category?: { name: string };
    images: { id: number; imageUrl: string }[];
  };
};

export default function ProductDetailClient({
  product,
}: ProductDetailClientProps) {
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Handle product deletion
  const handleDeleteProduct = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${product.id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setToast({
            message: "Product deleted successfully",
            type: "success",
          });
          window.location.href = "/admin/products"; // ✅ Redirect to products list
        } else {
          setToast({ message: "Failed to delete product", type: "error" });
        }
      } catch (error) {
        setToast({ message: "Error deleting product", type: "error" });
        console.log(error);
      }
    }
  };

  // ✅ Handle image deletion
  const handleDeleteImage = async (imageId: number, imageUrl: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        const response = await fetch(`/api/upload`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageId, imageUrl }),
        });

        if (response.ok) {
          setToast({ message: "Image deleted successfully", type: "success" });
          window.location.reload(); // ✅ Refresh UI
        } else {
          setToast({ message: "Failed to delete image", type: "error" });
        }
      } catch (error) {
        setToast({ message: "Error deleting image", type: "error" });
        console.log(error);
      }
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12">
      {/* ✅ Toast Notification */}
      {toast && <Alert message={toast.message} type={toast.type} />}

      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* ✅ Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {product.images.length > 0 ? (
          product.images.map((image) => (
            <div key={image.id} className="relative group">
              {/* ✅ Use next/image for better optimization */}
              <Image
                src={image.imageUrl}
                alt={product.title}
                width={200}
                height={200}
                className="w-full h-40 object-cover rounded shadow"
                layout="intrinsic"
              />
              {/* ✅ Delete Image Button */}
              <button
                onClick={() => handleDeleteImage(image.id, image.imageUrl)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                🗑️
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>

      {/* ✅ Product Details */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <p className="text-gray-700 mb-2">
          <strong>Article Number:</strong> {product.articleNumber}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Price:</strong> ${product.price}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Category:</strong> {product.category?.name || "Uncategorized"}
        </p>
        <p className="text-gray-700">
          {product.description || "No description available"}
        </p>
      </div>

      {/* ✅ Edit & Delete Buttons */}
      <div className="mt-6 flex space-x-4">
        <Link
          href={`/admin/products/edit/${product.id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Edit Product
        </Link>
        <button
          onClick={handleDeleteProduct}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Delete Product
        </button>
      </div>
    </main>
  );
}
