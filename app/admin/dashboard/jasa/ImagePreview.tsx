'use client';

import { useState } from 'react';

export default function ImagePreview({ defaultImage }: { defaultImage?: string | null }) {
  // Gunakan defaultImage sebagai tampilan awal jika ada
  const [preview, setPreview] = useState<string | null>(defaultImage || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      // Jika batal pilih foto, kembalikan ke foto lama
      setPreview(defaultImage || null);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
      <div className="relative flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all overflow-hidden">
        
        {preview ? (
          <img src={preview} alt="Preview" className="w-full h-full object-contain p-2" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none">
            <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-1 text-sm text-gray-500"><span className="font-semibold text-blue-600">Klik untuk ganti</span> foto</p>
          </div>
        )}
        
        <input type="file" name="gambar" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>
    </div>
  );
}