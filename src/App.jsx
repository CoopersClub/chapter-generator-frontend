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

  const storyFields = ["bookTitle", "chapterTitle", "summary", "characters", "events", "scripture"];
  const styleFields = ["tone", "pov", "tense", "theme", "wordCount"];

  return (
    <div className="p-10 max-w-4xl mx-auto font-sans text-xl">
      <h1 className="text-5xl font-bold mb-10 text-center">Chapter Generator</h1>

      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4 text-blue-700">Story Setup</h2>
          {storyFields.map((key) => (
            <div key={key} className="flex flex-col mb-4">
              <label className="capitalize mb-2 text-xl font-semibold text-gray-800">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border p-4 rounded text-xl shadow-md"
              />
            </div>
          ))}
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-4 text-green-700">Tone & Style</h2>
          {styleFields.map((key) => (
            <div key={key} className="flex flex-col mb-4">
              <label className="capitalize mb-2 text-xl font-semibold text-gray-800">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                className="border p-4 rounded text-xl shadow-md"
              />
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-6">
          <button
            onClick={generateChapter}
            disabled={loading}
            className="bg-blue-600 text-white py-4 px-6 text-xl rounded shadow hover:bg-blue-700 w-full"
          >
            {loading ? "Generating..." : "Generate Chapter"}
          </button>

          <button
            onClick={regenerateChapter}
            disabled={loading}
            className="bg-green-600 text-white py-4 px-6 text-xl rounded shadow hover:bg-green-700 w-full"
          >
            {loading ? "Regenerating..." : "Regenerate with More Dialogue"}
          </button>
        </div>
      </div>

      <div className="mt-12 whitespace-pre-wrap bg-gray-100 p-8 rounded shadow text-xl leading-relaxed">
        {generatedChapter}
      </div>
    </div>
  );
}