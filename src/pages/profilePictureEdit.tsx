// src/components/ProfileImageUploader.tsx
import React, { useState } from 'react';
import axios from 'axios';

interface ProfileImageUploaderProps {
  onUploadSuccess?: (imageUrl: string) => void;
}

export default function ProfilePictureEdit({
  onUploadSuccess,
}: ProfileImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  var user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user.id;

  // 1. Failo pasirinkimas
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setError(null);
  };  
  // Šis būdas su FormData veikia su Axios ir React be papildomų konfigūracijų :contentReference[oaicite:0]{index=0}.

  // 2. Failo įkėlimas į serverį
  const handleUpload = async () => {
    if (!file) {
      setError('Prašome pasirinkti nuotrauką.');  
      return;
    }

    setUploading(true);

    try {
      // 2.1. Sukuriame FormData ir pridedame failą
      const formData = new FormData();
      formData.append('image', file);  
      // Axios pagal nutylėjimą nustato multipart/form-data :contentReference[oaicite:1]{index=1}.

      // 2.2. POST į jūsų upload endpoint’ą (tarkim: /user/{userId}/upload)
      const uploadResp = await axios.post<{
        filename: string;
        url?: string;
      }>(`https://localhost:7296/user/${userId}/upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });  
      // Serveris turi grąžinti arba filename, arba pilną URL :contentReference[oaicite:2]{index=2}.

      const imageUrl = uploadResp.data.url ?? `/Images/Trainers/${uploadResp.data.filename}`;

      // 3. Atnaujiname vartotojo profilio ImageUrl per PUT endpoint’ą
      await axios.put(
        `https://localhost:7296/user/${userId}/image`,
        { imageUrl },
        { headers: { 'Content-Type': 'application/json' } }
      );  
      // PUT /user/{userId}/image mes sukūrėme anksčiau :contentReference[oaicite:3]{index=3}.

      // Pasiekiame tėvinį komponentą, kad atnaujintų UI
      onUploadSuccess?.(imageUrl);
    } catch (err: any) {
      console.error('Įkėlimo klaida:', err);
      setError('Nepavyko įkelti nuotraukos. Bandykite dar kartą.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`px-4 py-2 rounded text-white ${
          uploading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {uploading ? 'Įkeliama...' : 'Įkelti nuotrauką'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
