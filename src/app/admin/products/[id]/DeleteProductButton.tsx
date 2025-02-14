"use client"; // Client Component
import { useRouter } from "next/navigation";

type DeleteProductButtonProps = {
  productId: number;
};

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      await fetch(`/api/products/${productId}`, { method: "DELETE" });
      router.push("/admin/products");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
    >
      Delete Product
    </button>
  );
}
