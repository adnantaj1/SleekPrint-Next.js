"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/ui/Alert";

type ProductEditFormProps = {
  product: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    articleNumber: string;
    categoryId: number;
    images: { id: number; imageUrl: string }[];
  };
};

export default function ProductEditForm({ product }: ProductEditFormProps) {
  const router = useRouter();

  // ✅ Manage form state
  const [formData, setFormData] = useState({
    title: product.title,
    description: product.description || "",
    articleNumber: product.articleNumber,
    price: product.price.toString(),
    categoryId: product.categoryId.toString(),
  });

  // ✅ Manage images state
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newPreviewImages, setNewPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState(product.images);
  const [deletedImages, setDeletedImages] = useState<
    { imageId: number; imageUrl: string }[]
  >([]);

  // ✅ Fetch categories dynamically
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("🔥 Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // ✅ Handle new image selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImages([...newImages, ...files]);

    // ✅ Show previews for new images
    const urls = files.map((file) => URL.createObjectURL(file));
    setNewPreviewImages([...newPreviewImages, ...urls]);
  };

  // ✅ Handle deleting an existing image (but only on "Update Product")
  const handleDeleteImage = (imageId: number, imageUrl: string) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setDeletedImages((prev) => [...prev, { imageId, imageUrl }]);

      // ✅ Visually remove image from UI without updating backend yet
      setExistingImages((prevImages) =>
        prevImages.filter((img) => img.id !== imageId)
      );
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ✅ Ensure categoryId is a number
    const categoryIdNumber = Number(formData.categoryId);
    if (isNaN(categoryIdNumber)) {
      setToast({ message: "Invalid category ID", type: "error" });
      return;
    }

    const updateData = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      // ✅ Ensure categoryId is sent as a number
      updateData.append(
        key,
        key === "categoryId" ? categoryIdNumber.toString() : value
      );
    });

    // ✅ Append new images
    newImages.forEach((file) => updateData.append("files", file));

    try {
      console.log("🛠️ Sending PUT request with:", {
        formData,
        categoryIdNumber,
      });

      // ✅ Send update request
      const res = await fetch(`/api/products/${product.id}`, {
        method: "PUT",
        body: updateData,
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      // ✅ After successful update, delete marked images
      for (const img of deletedImages) {
        const deleteRes = await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            imageId: img.imageId,
            imageUrl: img.imageUrl,
          }),
        });

        if (!deleteRes.ok) {
          console.warn("⚠️ Failed to delete image:", img.imageUrl);
        }
      }

      setToast({ message: "Product updated successfully", type: "success" });

      // ✅ Redirect after a short delay
      setTimeout(() => router.push("/admin/products"), 2000);
    } catch (error) {
      console.error("🔥 Error updating product:", error);
      setToast({ message: "Something went wrong!", type: "error" });
      console.log(error);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* ✅ Toast Notification */}
      {toast && <Alert message={toast.message} type={toast.type} />}

      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>

      {/* ✅ Edit Product Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ✅ Product Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded-md text-gray-700"
            required
          />
        </div>

        {/* ✅ Product Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded-md text-gray-700"
            rows={4}
          />
        </div>

        {/* ✅ Article Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Article Number
          </label>
          <input
            type="text"
            value={formData.articleNumber}
            onChange={(e) =>
              setFormData({ ...formData, articleNumber: e.target.value })
            }
            className="w-full p-2 border rounded-md text-gray-700"
            required
          />
        </div>

        {/* ✅ Product Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            className="w-full p-2 border rounded-md text-gray-700"
            required
          />
        </div>

        {/* ✅ Product Category (Fetched from API) */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: e.target.value })
            }
            className="w-full p-2 border rounded-md text-gray-700"
            required
          >
            <option value="">Select a category</option>
            {loadingCategories ? (
              <option disabled>Loading categories...</option>
            ) : (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* ✅ Existing Images with Delete Button */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Existing Images
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
            {existingImages.map((image) => (
              <div key={image.id} className="relative group">
                <img
                  src={image.imageUrl}
                  alt={`Product Image ${image.id}`}
                  className="w-full h-40 object-cover rounded-lg shadow-md"
                />
                <button
                  onClick={() => handleDeleteImage(image.id, image.imageUrl)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ New Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Add New Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded-md"
            accept="image/*"
          />
        </div>

        {/* ✅ New Image Preview */}
        {newPreviewImages.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Image Previews
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
              {newPreviewImages.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-40 object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ✅ Update Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Update Product
        </button>
      </form>
    </main>
  );
}
