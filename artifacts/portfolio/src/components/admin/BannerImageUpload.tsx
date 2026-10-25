import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { X, Image as ImageIcon } from 'lucide-react';

interface BannerImageUploadProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  bucket?: string;
  className?: string;
  aspectRatio?: string;
}

export function BannerImageUpload({ label, value, onChange, bucket = 'hero-images', className = '', aspectRatio = 'aspect-[21/9]' }: BannerImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      throw new Error(`Invalid file type. Only JPG, PNG, and WEBP allowed.`);
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error(`File too large. Maximum size is 10MB.`);
    }
    return true;
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    try {
      validateFile(file);
      setIsUploading(true);
      setProgress(0);

      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_');
      const filePath = `${Date.now()}-${Math.random().toString(36).substr(2, 5)}-${cleanFileName}`;

      let currentPercent = 0;
      const progressInterval = setInterval(() => {
        if (currentPercent < 90) {
          currentPercent += Math.floor(Math.random() * 15) + 5;
          if (currentPercent > 90) currentPercent = 90;
          setProgress(currentPercent);
        }
      }, 150);

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      clearInterval(progressInterval);

      if (uploadError) throw uploadError;

      setProgress(100);

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      if (!publicUrlData || !publicUrlData.publicUrl) {
        throw new Error(`Failed to retrieve public URL`);
      }

      onChange(publicUrlData.publicUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
      setProgress(null);
      // Reset input value to allow uploading the same file again
      if (e.target) e.target.value = '';
    }
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="flex flex-col gap-2 w-full text-left">
      <label className="text-[9px] uppercase tracking-[0.2em] text-foreground/60 font-bold">{label}</label>
      
      {value ? (
        <div className={`relative w-full ${aspectRatio} rounded-lg overflow-hidden border border-foreground/10 bg-secondary group shadow-sm ${className}`}>
          <img 
            src={value} 
            alt={label} 
            className="w-full h-full object-cover" 
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/75 text-white rounded-full transition-colors cursor-pointer"
            title="Remove Image"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full ${aspectRatio} bg-foreground/5 hover:bg-foreground/[0.08] border border-dashed border-foreground/20 rounded-lg cursor-pointer transition-all p-4 text-center relative overflow-hidden ${className}`}>
          {isUploading ? (
            <div className="flex flex-col items-center justify-center w-full h-full p-4">
              <span className="text-[10px] uppercase tracking-wider text-foreground/75 font-semibold mb-2">Uploading</span>
              <div className="w-1/2 bg-foreground/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary h-full transition-all duration-150" style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-[10px] text-foreground/75 font-bold mt-2">{progress}%</span>
            </div>
          ) : (
            <>
              <ImageIcon className="w-6 h-6 text-foreground/35 mb-2" />
              <span className="text-[9px] uppercase tracking-wider text-foreground/50 font-bold">Choose Image</span>
            </>
          )}
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileSelect} 
            className="hidden" 
            disabled={isUploading}
          />
        </label>
      )}
      
      {error && (
        <span className="text-[10px] text-destructive mt-1 font-semibold">{error}</span>
      )}
    </div>
  );
}
