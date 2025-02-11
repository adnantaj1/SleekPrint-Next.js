"use client";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => setIsAdding(false), 1000); // Simulating API call
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
        <p className="text-gray-600 mt-2">${product.price}</p>

        <div className="mt-3 flex space-x-2">
          <Link
            href={`/products/${product.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleAddToCart}
            className={`px-4 py-2 rounded-md w-full ${
              isAdding ? "bg-gray-500" : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
