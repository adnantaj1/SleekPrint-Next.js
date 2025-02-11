"use client";
import { useState } from "react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (data.success) {
      alert("Signup successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="p-6 border rounded-lg shadow-md bg-white text-gray-800"
        onSubmit={handleSignup}
      >
        <h2 className="text-2xl mb-4">Signup</h2>
        <input
          type="text"
          placeholder="Name"
          className="border p-2 w-full mb-4 rounded-lg text-gray-800 placeholder-gray-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded-lg text-gray-800 placeholder-gray-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-4 rounded-lg text-gray-800 placeholder-gray-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
