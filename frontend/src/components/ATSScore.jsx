import React from 'react';

export default function ATSScore({ result }) {
  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold">ATS Score Breakdown</h2>
      <ul className="list-disc pl-6">
        <li><strong>Final Score:</strong> {result.final_score}/100</li>
        <li><strong>Keyword Match:</strong> {result.keyword_match}/100</li>
        <li><strong>Readability:</strong> {result.readability.toFixed(1)}/100</li>
        <li><strong>Section Completeness:</strong> {result.completeness.toFixed(1)}%</li>
      </ul>
      <div className="w-full bg-gray-300 rounded-full h-4 mt-2">
        <div className="bg-green-500 h-4 rounded-full" style={{ width: `${result.final_score}%` }}></div>
      </div>
    </div>
  );