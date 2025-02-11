"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Use Next.js router

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/"); // ✅ Redirect without full page reload
  };

  if (loading) return null; // ✅ Prevent flicker while checking auth

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        SleekPrint
      </Link>

      {/* Nav Links */}
      <div className="space-x-4">
        <Link href="/products" className="hover:text-gray-300">
          Products
        </Link>

        {!isLoggedIn ? (
          <>
            <Link href="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link href="/signup" className="hover:text-gray-300">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
