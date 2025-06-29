import React, { useState } from "react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [jobTitle, setJobTitle] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobTitle) {
      setError("Please upload a file and enter a job title.");
      return;
    }
    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_title", jobTitle);

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server error");
      }
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h2>GenAI Resume Analyzer</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload Resume (PDF or DOCX):</label><br />
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Job Title:</label><br />
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Enter job title"
            style={{ width: "100%" }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{ marginTop: 15 }}
        >
          {loading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>ATS Score Breakdown</h3>
          <ul>
            <li><b>Final Score:</b> {result.ats_result.final_score}</li>
            <li><b>Keyword Match:</b> {result.ats_result.keyword_match}</li>
            <li><b>Readability:</b> {result.ats_result.readability.toFixed(2)}</li>
            <li><b>Completeness:</b> {result.ats_result.completeness.toFixed(2)}</li>
          </ul>

          <h3>Recommendations</h3>
          <ul>
            {result.suggestions.recommendations.map((rec, idx) => (
              <li key={idx}>{rec}</li>
            ))}
          </ul>

          <h3>Fixed Resume Text</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              backgroundColor: "#f5f5f5",
              padding: 10,
              borderRadius: 5,
              maxHeight: 300,
              overflowY: "auto",
            }}
          >
            {result.fixed_resume_text}
          </pre>
        </div>
      )}
    </div>
  );
}
