import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ATSScore from "./components/ATSScore";
import Recommendations from "./components/Recommendations";
import ResumeTextPreview from "./components/ResumeTextPreview";

function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          GenAI Resume Analyzer
        </h1>

        {/* Upload Form */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <ResumeForm onResult={setResult} />
        </div>

        {/* ATS Score */}
        {result?.ats_result && (
          <ATSScore result={result.ats_result} />
        )}

        {/* Recommendations */}
        {result?.suggestions?.recommendations && (
          <Recommendations recommendations={result.suggestions.recommendations} />
        )}

        {/* Corrected Resume */}
        {result?.fixed_resume_text && (
          <ResumeTextPreview text={result.fixed_resume_text} />
        )}
      </div>
    </div>
  );
}

export default App;
