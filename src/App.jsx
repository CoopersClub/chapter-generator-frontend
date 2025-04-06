// src/App.jsx
import React, { useState } from "react";
import "./index.css";

function App() {
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
  });
  const [generatedChapter, setGeneratedChapter] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateChapter = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://your-backend-url/api/generate-chapter", {
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

  return (
    <div className="container">
      <h1>Chapter Generator</h1>
      <div className="form">
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="form-group">
            <label>{key.replace(/([A-Z])/g, ' $1')}</label>
            {key === "summary" || key === "characters" || key === "events" ? (
              <textarea name={key} value={value} onChange={handleChange} />
            ) : (
              <input
                type={key === "wordCount" ? "number" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
              />
            )}
          </div>
        ))}
        <button onClick={generateChapter} disabled={loading}>
          {loading ? "Generating..." : "Generate Chapter"}
        </button>
      </div>
      {generatedChapter && (
        <div className="output">
          <h2>Generated Chapter</h2>
          <pre>{generatedChapter}</pre>
        </div>
      )}
    </div>
  );
}

export default App;