"use client";
import { useState, useEffect } from "react";
import { Product } from "@/lib/db/schema";
import Link from "next/link";
import ImageSlider from "../ui/ImageSlider";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`/api/products/${product.id}/images`);
        if (res.ok) {
          const data = await res.json();
          setImageUrls(data.map((img: { imageUrl: string }) => img.imageUrl));
        }
      } catch (error) {
        console.error("Failed to fetch images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [product.id]);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* ✅ Image Slider Section */}
      <div className="relative w-full h-48">
        {isLoading ? (
          <div className="w-full h-full bg-gray-200 animate-pulse"></div>
        ) : (
          <ImageSlider images={imageUrls} />
        )}
      </div>

      {/* ✅ Product Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          {product.title}
        </h2>
        <p className="text-gray-700">${product.price.toFixed(2)}</p>

        {/* ✅ View Details Button */}
        <Link
          href={`/admin/products/${product.id}`}
          className="block mt-4 text-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
