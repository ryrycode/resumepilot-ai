"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://127.0.0.1:5000/protected", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Invalid session");
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => {
        localStorage.removeItem("access_token");
        router.push("/login");
      });
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">Dashboard</h1>
      <p className="text-gray-600 mb-8">{message}</p>

      <a
        href="/upload"
        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 mb-4"
      >
        Upload Resume
      </a>
      <button
        onClick={handleLogout}
        className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
      >
        Log Out
      </button>
    </main>
  );
}