import React from 'react';

export default function ResumeTextPreview({ text }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Corrected Resume Text</h2>
      <pre
        className="whitespace-pre-wrap bg-gray-100 p-3 rounded-lg text-sm text-gray-800 max-h-96 overflow-y-auto"
      >
        {text}
      </pre>
    </div>
  );
}
