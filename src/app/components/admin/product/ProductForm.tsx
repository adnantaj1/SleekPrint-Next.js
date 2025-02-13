"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/db/schema"; // ✅ Import Product Type
import Alert from "@/app/components/ui/Alert"; // ✅ Import Custom Alert Component

type ProductFormProps = {
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  refresh: () => void;
};

export default function ProductForm({
  editingProduct,
  setEditingProduct,
  refresh,
}: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    articleNumber: "",
    listPrice: "",
    price: "",
    price50: "",
    price100: "",
    categoryId: "",
  });

  const [files, setFiles] = useState<File[]>([]); // ✅ Store product images
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ✅ Fetch Categories & Prefill Data when Editing
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("/api/categories");
      if (res.ok) {
        const data = await res.json();
        setCategories(data);
      }
    };
    fetchCategories();

    if (editingProduct) {
      setFormData({
        title: editingProduct.title,
        description: editingProduct.description || "",
        articleNumber: editingProduct.articleNumber,
        listPrice: editingProduct.listPrice.toString(),
        price: editingProduct.price.toString(),
        price50: editingProduct.price50.toString(),
        price100: editingProduct.price100.toString(),
        categoryId: editingProduct.categoryId.toString(),
      });
    }
  }, [editingProduct]);

  // ✅ Handle Input Changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []));
  };

  // ✅ Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    let uploadedImageUrls: string[] = [];

    // ✅ First, Upload Images to `/api/upload`
    if (files.length > 0) {
      const imageFormData = new FormData();
      files.forEach((file) => imageFormData.append("files", file));

      console.log("📡 Uploading images to /api/upload...");
      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: imageFormData,
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        uploadedImageUrls = uploadData.imageUrls; // ✅ Store image URLs
        console.log("✅ Uploaded Images:", uploadedImageUrls);
      } else {
        console.error("❌ Image upload failed!");
        setAlert({ message: "❌ Failed to upload images!", type: "error" });
        setLoading(false);
        return;
      }
    }

    // ✅ Then, Send Product Data to `/api/products`
    const productFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      productFormData.append(key, formData[key as keyof typeof formData]);
    });

    uploadedImageUrls.forEach((url) =>
      productFormData.append("imageUrls", url)
    );

    console.log("📡 Saving product with images:", uploadedImageUrls);
    const res = await fetch("/api/products", {
      method: editingProduct ? "PUT" : "POST",
      body: productFormData,
    });

    setLoading(false);

    if (res.ok) {
      setAlert({
        message: editingProduct
          ? "✅ Product updated successfully!"
          : "✅ Product added successfully!",
        type: "success",
      });

      setFormData({
        title: "",
        description: "",
        articleNumber: "",
        listPrice: "",
        price: "",
        price50: "",
        price100: "",
        categoryId: "",
      });
      setFiles([]);
      setEditingProduct(null);
      refresh();
    } else {
      setAlert({ message: "❌ Failed to save product!", type: "error" });
    }
  };

  return (
    <div className="mb-6">
      {/* ✅ Display Alerts */}
      {alert && <Alert message={alert.message} type={alert.type} />}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 text-gray-800 max-w-md mx-auto"
      >
        <input
          type="text"
          name="title"
          placeholder="Product Name"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="articleNumber"
          placeholder="Article Number"
          value={formData.articleNumber}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="listPrice"
          placeholder="List Price"
          value={formData.listPrice}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price50"
          placeholder="Price for 50+"
          value={formData.price50}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price100"
          placeholder="Price for 100+"
          value={formData.price100}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* ✅ Category Dropdown */}
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        {/* ✅ Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="border p-2 rounded"
          required
        />

        {/* ✅ Show Selected Files (Optional) */}
        {files.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Selected Images: {files.map((file) => file.name).join(", ")}
          </div>
        )}

        {/* ✅ Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
        >
          {loading
            ? "Saving..."
            : editingProduct
            ? "Update Product"
            : "Add Product"}
        </button>

        {/* ✅ Cancel Button (Only when editing) */}
        {editingProduct && (
          <button
            type="button"
            onClick={() => setEditingProduct(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}
