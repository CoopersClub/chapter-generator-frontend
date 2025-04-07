// src/App.jsx
import React, { useState } from "react";

export default function App() {
  const [form, setForm] = useState({
    bookTitle: "",
    chapterTitle: "",
    summary: "",
    wordCount: 1000,
    characters: "",
    events: "",
    scripture: "",
    tone: "",
    pov: "Third person",
    tense: "Past",
    theme: "",
  });
  const [generatedChapter, setGeneratedChapter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://chapter-api-live.onrender.com/api/generate-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setGeneratedChapter(data.chapter || "Error generating chapter.");
    } catch (error) {
      setGeneratedChapter("Failed to generate chapter. Please try again later.");
    }
    setLoading(false);
  };

  const regenerateChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://chapter-api-live.onrender.com/api/regenerate-chapter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      setGeneratedChapter(data.chapter || "Error regenerating chapter.");
    } catch (error) {
      setGeneratedChapter("Failed to regenerate chapter. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Chapter Generator</h1>
      <div className="grid gap-4">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.replace(/([A-Z])/g, " $1")}
            className="border p-2 rounded"
          />
        ))}
        <button
          onClick={generateChapter}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded shadow hover:bg-blue-700"
        >
          {loading ? "Generating..." : "Generate Chapter"}
        </button>
        <button
          onClick={regenerateChapter}
          disabled={loading}
          className="bg-green-600 text-white py-2 px-4 rounded shadow hover:bg-green-700"
        >
          {loading ? "Regenerating..." : "Regenerate with More Dialogue"}
        </button>
      </div>
      <div className="mt-6 whitespace-pre-wrap bg-gray-100 p-4 rounded">
        {generatedChapter}
      </div>
    </div>
  );
}