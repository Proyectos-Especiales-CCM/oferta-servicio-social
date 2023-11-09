import React, { useState } from "react"
import { Upload } from "lucide-react";

export default function ProjectImageUpload(): React.ReactNode {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please provide a file.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', file.name);

    const response = await fetch('/api/project-images', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (response.ok) {
      alert('File uploaded successfully!');
      setFile(null);
    } else {
      alert(`Error uploading file: ${result.error}`);
    }
    setUploading(false);
  };

  return (
    <div className="bg-slate-100 rounded p-2">
      <span className="font-semibold">Subir una nueva imagen:</span>
      <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-4 mt-2">
        <input type="file" id="file-input" className="hidden" onChange={handleFileChange} />
        <label
          htmlFor="file-input"
          className="inline-block p-2 cursor-pointer bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
        >
          Seleccione un archivo
        </label>
        <button className={`text-white rounded-lg p-2 ${file === null ? 'bg-slate-400 hover:none' : 'bg-green-600 hover:bg-green-600'}`}
        type="submit" disabled={file === null}><Upload size={20} /></button>
        {uploading ? 'Uploading...' : ''}
      </form>
    </div>
  );
};
