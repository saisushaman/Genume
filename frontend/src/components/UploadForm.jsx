import React, { useState } from 'react';

function UploadForm() {
const [result, setResult] = useState(null);
const [sugg, setSugg] = useState(null);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const res = await fetch('http://localhost:8000/analyze', {
    method: 'POST',
    body: formData
  });
}

export default UploadForm;
  setResult(data.ats_result);
  setSugg(data.suggestions);
}

return (
  <form onSubmit={handleSubmit} className="space-y-4">
    <input type="file" name="file" required className="block" />
    <input type="text" name="job_title" placeholder="Target Job Title" required className="block" />
    <button className="bg-blue-600 text-white px-4 py-2 rounded">Analyze</button>
    {result && <ATSScore result={result} />}
    {sugg && <Suggestions suggestions={sugg} />}
  </form>
);
}
