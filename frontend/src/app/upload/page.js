"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UploadResume() {
  const router = useRouter();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const handleFileChange = (e) => {
    setMessage("");
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!file) {
      setMessage("Please choose a file first.");
      return;
    }

    const token = localStorage.getItem("access_token");
    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`"${data.filename}" uploaded successfully.`);
        setFile(null);
      } else {
        setMessage(data.error || "Upload failed.");
      }
    } catch (err) {
      setMessage("Could not connect to the server.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-8 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Upload Your Resume</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        Accepted formats: PDF or DOCX. Maximum file size: 5MB.
      </p>

      <form onSubmit={handleUpload} className="w-full max-w-sm flex flex-col gap-4">
        <label htmlFor="resume-file" className="sr-only">
          Choose resume file
        </label>
        <input
          id="resume-file"
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileChange}
          className="border border-gray-300 rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          disabled={isUploading}
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload and Analyze Resume"}
        </button>
        {message && (
          <p className="text-gray-600" role="status">
            {message}
          </p>
        )}
      </form>
    </main>
  );
}