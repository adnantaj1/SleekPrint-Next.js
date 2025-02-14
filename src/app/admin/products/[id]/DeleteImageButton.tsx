"use client"; // Client Component
import { useRouter } from "next/navigation";

type DeleteImageButtonProps = {
  imageUrl: string; // Pass the image URL to delete
};

export default function DeleteImageButton({
  imageUrl,
}: DeleteImageButtonProps) {
  const router = useRouter();

  const handleDeleteImage = async () => {
    if (confirm("Are you sure you want to delete this image?")) {
      try {
        // ✅ Call the API to delete the image
        const response = await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ imageUrl }), // Pass the image URL to delete
        });

        if (response.ok) {
          // ✅ Refresh the page to reflect the changes
          router.refresh();
        } else {
          console.error("Failed to delete image");
        }
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteImage}
      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
    >
      🗑️
    </button>
  );
}
