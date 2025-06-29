import React from 'react';

export default function Recommendations({ recommendations }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Recommendations</h2>
      <ul className="list-disc pl-5 space-y-1 text-gray-700">
        {recommendations.map((rec, idx) => (
          <li key={idx}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}
