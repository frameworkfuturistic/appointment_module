import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import axiosInstance from '@/lib/axiosInstance';

interface ImageUploaderProps {
  onUploadComplete: (urls: string[]) => void;
  onUploadError: (error: string) => void;
  maxFiles?: number;
}

const imageUploaderV2 = async (files: File[]): Promise<string[]> => {
  const toReturn: string[] = [];
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('image', file); // Use the field name 'image' as defined in your backend
    });

    const uploadResponse = await axiosInstance.post('/gallery', formData, { // Change to your backend URL
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    toReturn.push(...uploadResponse.data.paths); // Assuming your backend returns an array of paths
  } catch (err) {
    throw err;
  }
  return toReturn;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadComplete, onUploadError, maxFiles = 1 }) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setProgress(0);
    setError(null);

    try {
      const urls = await imageUploaderV2(acceptedFiles);
      onUploadComplete(urls);
      setProgress(100);
    } catch (err) {
      setError('Upload failed. Please try again.');
      onUploadError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete, onUploadError]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles,
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground'
        }`}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground animate-bounce" />
            <p className="text-sm text-muted-foreground">Uploading...</p>
            <Progress value={progress} className="w-full" />
          </div>
        ) : (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Drag & drop image{maxFiles > 1 ? 's' : ''} here, or click to select
            </p>
          </div>
        )}
      </div>
      {error && (
        <div className="mt-4 flex items-center text-destructive">
          <AlertCircle className="mr-2 h-4 w-4" />
          <span className="text-sm">{error}</span>
        </div>
      )}
      {progress === 100 && (
        <div className="mt-4 flex items-center text-green-600">
          <CheckCircle2 className="mr-2 h-4 w-4" />
          <span className="text-sm">Upload complete!</span>
        </div>
      )}
    </div>
  );
};
