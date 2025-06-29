import React from 'react';

export default function ATSScore({ result }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">ATS Score Breakdown</h2>
      <div className="space-y-2">
        <ScoreBar label="Final Score" value={result.final_score} />
        <ScoreBar label="Keyword Match" value={result.keyword_match} />
        <ScoreBar label="Readability" value={result.readability} />
        <ScoreBar label="Completeness" value={result.completeness} />
      </div>
    </div>
  );
}

function ScoreBar({ label, value }) {
  return (
    <div>
      <div className="flex justify-between mb-1 text-sm font-medium">
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
