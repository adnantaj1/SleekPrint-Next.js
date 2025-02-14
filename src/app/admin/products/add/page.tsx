"use client"; // Mark as a client component
import { useState } from "react";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/ui/Alert";

export default function AddProductPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [articleNumber, setArticleNumber] = useState(""); // Add articleNumber
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files);
      setImages((prev) => [...prev, ...newImages]);

      // Generate preview URLs
      const newPreviewUrls = newImages.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviewUrls]);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ✅ Upload images
      const formData = new FormData();
      images.forEach((file) => formData.append("files", file));

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload images");
      }

      const { imageUrls } = await uploadResponse.json();

      // ✅ Save product details as JSON
      const productResponse = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          articleNumber, // Include articleNumber
          price: parseFloat(price),
          categoryId: parseInt(categoryId),
          images: imageUrls, // Only pass the image URLs
        }),
      });

      if (productResponse.ok) {
        setToast({ message: "Product added successfully", type: "success" });
        // Redirect to the products list page after a short delay
        setTimeout(() => router.push("/admin/products"), 2000);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      setToast({ message: "Error adding product", type: "error" });
      console.log(error);
    }
  };

  return (
    <main className="max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* ✅ Toast Notification */}
      {toast && <Alert message={toast.message} type={toast.type} />}

      <h1 className="text-3xl font-bold mb-8">Add Product</h1>

      {/* ✅ Add Product Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ✅ Product Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* ✅ Product Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows={4}
            required
          />
        </div>

        {/* ✅ Article Number */}
        <div>
          <label
            htmlFor="articleNumber"
            className="block text-sm font-medium text-gray-700"
          >
            Article Number
          </label>
          <input
            type="text"
            id="articleNumber"
            value={articleNumber}
            onChange={(e) => setArticleNumber(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* ✅ Product Price */}
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {/* ✅ Product Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select a category</option>
            <option value="1">T-Shirts</option>
            <option value="2">Mugs</option>
            <option value="3">Bags</option>
          </select>
        </div>

        {/* ✅ Image Upload */}
        <div>
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Images
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
            accept="image/*"
            required
          />
        </div>

        {/* ✅ Image Preview */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {previewImages.map((url, index) => (
              <div key={url} className="relative group">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-40 object-cover rounded shadow"
                />
              </div>
            ))}
          </div>
        )}

        {/* ✅ Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
          >
            Add Product
          </button>
        </div>
      </form>
    </main>
  );
}
