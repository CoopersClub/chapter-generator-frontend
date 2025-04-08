import React, { useState } from "react";
import "./index.css";

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
    comments: ""
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
    <div className="container">
      <h1 style={{ fontSize: "2rem", textAlign: "center", marginBottom: "2rem" }}>Chapter Generator</h1>

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>Story Setup</h2>
      {storyFields.map((key) => (
        <div className="form-group" key={key}>
          <label>{key.replace(/([A-Z])/g, " $1")}</label>
          <textarea
            name={key}
            value={form[key]}
            onChange={handleChange}
            rows={4}
          />
        </div>
      ))}

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>Tone & Style</h2>
      {styleFields.map((key) => (
        <div className="form-group" key={key}>
          <label>{key.replace(/([A-Z])/g, " $1")}</label>
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
          />
        </div>
      ))}

      <h2 style={{ fontSize: "1.5rem", marginTop: "2rem" }}>Rewrite</h2>
      <div className="form-group">
        <label>Comments</label>
        <textarea
          name="comments"
          value={form.comments}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
        <button onClick={generateChapter} disabled={loading}>
          {loading ? "Generating..." : "Generate Chapter"}
        </button>
        <button onClick={regenerateChapter} disabled={loading} style={{ backgroundColor: "#22c55e" }}>
          {loading ? "Regenerating..." : "Regenerate with Comments"}
        </button>
      </div>

      <div className="output">
        {generatedChapter}
      </div>
    </div>
  );
}