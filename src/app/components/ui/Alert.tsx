"use client";
import { useState } from "react";
import {
  Toast,
  ToastDescription,
  ToastProvider,
  ToastViewport,
} from "@radix-ui/react-toast";

export default function Alert({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  const [open, setOpen] = useState(true);

  return (
    <ToastProvider>
      {open && (
        <Toast
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white ${
            type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <ToastDescription>{message}</ToastDescription>
        </Toast>
      )}
      <ToastViewport />
    </ToastProvider>
  );
}
