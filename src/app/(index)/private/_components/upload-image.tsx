'use client';

import React, { ChangeEvent, useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface ImageUploaderProps {
  initialImageUrls?: string[];
}

export default function ImageUploader({
  initialImageUrls = [],
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrls, setPreviewUrls] = useState<string[]>(initialImageUrls);
  const [files, setFiles] = useState<File[]>([]);

  console.log('COMPONENT_UPLOAD_IMAGES: ', initialImageUrls);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    const newUrls = previewUrls.filter((_, i) => i !== index);

    setFiles(newFiles);
    setPreviewUrls(newUrls);

    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      newFiles.forEach((file) => dataTransfer.items.add(file));
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  return (
    <div className="grid w-1/2 items-center gap-2">
      <Label>Upload Image</Label>
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {previewUrls.map((url, idx) => (
            <div
              key={idx}
              className="relative group rounded-md overflow-hidden border"
            >
              <Image
                src={url}
                alt={`Preview ${idx + 1}`}
                width={120}
                height={120}
                className="w-full h-32 object-cover"
              />
              <button
                type="button"
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                onClick={() => removeFile(idx)}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-1 mt-2">
        <Button
          type="button"
          onClick={handleClick}
          className="flex h-12 w-12 items-center justify-center rounded-md border border-dashed"
        >
          <Upload className="h-6 w-6 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </Button>
        <Input
          ref={fileInputRef}
          onChange={handleImageChange}
          type="file"
          name="images"
          className="hidden"
          accept="image/*"
          multiple
        />
      </div>
    </div>
  );
}
