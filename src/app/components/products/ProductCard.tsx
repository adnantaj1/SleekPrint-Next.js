"use client"; // ✅ Client Component
import { useState, useEffect } from "react";
import { Product } from "@/lib/db/schema";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    // ✅ Fetch images for this product
    const fetchImages = async () => {
      const res = await fetch(`/api/products/${product.id}/images`);
      if (res.ok) {
        const data = await res.json();
        setImageUrls(data.map((img: { imageUrl: string }) => img.imageUrl));
      }
    };
    fetchImages();
  }, [product.id]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* ✅ Image Slider */}
      <div className="relative w-full h-48 mb-4">
        {imageUrls.length > 0 ? (
          <Image
            src={imageUrls[0]} // Show first image
            alt={product.title}
            width={300}
            height={200}
            className="object-cover w-full h-full rounded-lg"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            No Image
          </div>
        )}
      </div>

      <h2 className="text-lg font-semibold">{product.title}</h2>
      <p className="text-gray-500">${product.price}</p>

      <div className="mt-4 flex space-x-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Edit
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
}
