import Link from "next/link";
import ImageSlider from "../ui/ImageSlider";
import { Product } from "@/lib/db/schema";

type ProductWithImages = Product & {
  images: { id: number; imageUrl: string }[];
};

type ProductCardProps = {
  product: ProductWithImages;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* ✅ Image Slider Section */}
      <div className="relative w-full h-48">
        {product.images && product.images.length > 0 ? (
          <ImageSlider images={product.images.map((img) => img.imageUrl)} />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No Image</span>
          </div>
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
