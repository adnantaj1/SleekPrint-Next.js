"use client"; // Client Component
import { useState } from "react";
import { Product } from "@/lib/db/schema";
import { useRouter } from "next/navigation";

type EditProductFormProps = {
  product: Product;
};

export default function EditProductForm({ product }: EditProductFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [categoryId, setCategoryId] = useState(product.categoryId);
  const [images, setImages] = useState(product.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Update product details
    const updatedProduct = await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price, categoryId }),
    });

    if (updatedProduct.ok) {
      // ✅ Upload new images
      if (newImages.length > 0) {
        const formData = new FormData();
        newImages.forEach((file) => formData.append("files", file));

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (uploadResponse.ok) {
          const { imageUrls } = await uploadResponse.json();
          await fetch(`/api/products/${product.id}/images`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageUrls }),
          });
        }
      }

      router.refresh();
      setIsOpen(false);
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    await fetch(`/api/products/images/${imageId}`, { method: "DELETE" });
    setImages(images.filter((img) => img.id !== imageId));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Edit Product
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="w-full p-2 border rounded"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="Price"
                  className="w-full p-2 border rounded"
                />
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setNewImages(
                      e.target.files ? Array.from(e.target.files) : []
                    )
                  }
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
