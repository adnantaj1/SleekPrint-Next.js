"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "@/app/components/ui/Alert";

type DeleteProductButtonProps = {
  productId: number;
};

export default function DeleteProductButton({
  productId,
}: DeleteProductButtonProps) {
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setToast({
            message: "Product deleted successfully",
            type: "success",
          });
          setTimeout(() => router.push("/admin/products"), 2000);
        } else {
          throw new Error("Failed to delete product");
        }
      } catch (error) {
        setToast({ message: "Error deleting product", type: "error" });
        console.error(error);
      }
    }
  };

  return (
    <>
      {toast && <Alert message={toast.message} type={toast.type} />}
      <button
        onClick={handleDelete}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Delete Product
      </button>
    </>
  );
}
