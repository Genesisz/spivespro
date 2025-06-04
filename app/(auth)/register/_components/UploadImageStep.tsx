import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import DragDropUpload from '@/components/ui/drag-drop';
import FileUploadProgress from '@/components/ui/upload-progress';

type FileStatus = 'idle' | 'uploading' | 'error' | 'success';

interface UploadingFile {
  name: string;
  size: number;
  progress: number;
  status: FileStatus;
  type: string;
  url?: string; // Cloudinary URL
  public_id?: string; // Cloudinary public ID
}

interface UploadImageStepProps {
  uploadedImage: UploadingFile | null;
  setUploadedImage: React.Dispatch<React.SetStateAction<UploadingFile | null>>;
  onContinue: () => void;
  onBack: () => void;
}

const UploadImageStep: React.FC<UploadImageStepProps> = ({ uploadedImage, setUploadedImage, onContinue, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);

  const uploadToCloudinary = async (file: File): Promise<{url: string, public_id: string}> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Upload error:', errorData);
      throw new Error(`Upload failed: ${errorData.error || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Cloudinary response:', data); // Debug log
    return { url: data.url, public_id: data.public_id };
  };

  const handleFile = useCallback(async (file: File) => {
    if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > 3 * 1024 * 1024) {
      setUploadedImage({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'error',
        type: file.type
      });
      return;
    }

    setUploadedImage({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
      type: file.type
    });

    try {
      // Simulate progress for UI feedback
      const progressInterval = setInterval(() => {
        setUploadedImage((prev: UploadingFile | null) => {
          if (!prev || prev.status !== 'uploading') return prev;
          const newProgress = Math.min(prev.progress + 20, 90);
          return { ...prev, progress: newProgress };
        });
      }, 200);

      const cloudinaryResponse = await uploadToCloudinary(file);
      
      clearInterval(progressInterval);
      
      setUploadedImage((prev: UploadingFile | null) => {
        if (!prev) return null;
        return { 
          ...prev, 
          progress: 100,
          status: 'success',
          url: cloudinaryResponse.url,
          public_id: cloudinaryResponse.public_id
        };
      });

      console.log('Image uploaded successfully:', cloudinaryResponse.url); // Debug log
    } catch (error) {
      console.error('Upload error:', error);
      setUploadedImage((prev: UploadingFile | null) => {
        if (!prev) return null;
        return { ...prev, status: 'error', progress: 0 };
      });
    }
  }, [setUploadedImage]);

  const handleContinue = () => {
    setIsComplete(true);
    setTimeout(() => {
      onContinue();
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <motion.h1 className="text-4xl adumu font-bold mb-2 text-orange-400">Upload photo</motion.h1>
      <motion.p className="text-white text-center mb-8">Select a photo you want to use as your profile photo</motion.p>
      <motion.div className="w-full mb-6">
        <DragDropUpload 
          onFileSelect={handleFile}
          maxSizeKb={3072}
          acceptedFileTypes={['image/jpeg', 'image/png']}
        />
      </motion.div>
      {uploadedImage && (
        <motion.div className="w-full mb-12">
          <FileUploadProgress 
            name={uploadedImage.name}
            size={uploadedImage.size}
            progress={uploadedImage.progress}
            status={uploadedImage.status as FileStatus}
            type={uploadedImage.type}
          />
          {uploadedImage.status === 'error' && (
            <div className="text-red-500 text-sm mt-2">
              {uploadedImage.type && !['image/jpeg', 'image/png'].includes(uploadedImage.type) 
                ? 'Only JPEG or PNG files are allowed.' 
                : uploadedImage.size > 3 * 1024 * 1024 
                  ? 'File size must be under 3MB.' 
                  : 'Upload failed. Please try again.'}
            </div>
          )}
          {uploadedImage.status === 'success' && uploadedImage.url && (
            <div className="mt-4 text-center">
              <img 
                src={uploadedImage.url} 
                alt="Uploaded preview" 
                className="w-32 h-32 object-cover rounded-full mx-auto border-2 border-orange-400"
              />
            </div>
          )}
        </motion.div>
      )}
      <div className="flex justify-between w-full max-w-md mt-4">
        <button type="button" onClick={onBack} className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">Back</button>
        <button
          className="bg-blue-900 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinue}
          disabled={
            !uploadedImage ||
            uploadedImage.status !== 'success' ||
            isComplete
          }
        >
          {isComplete ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default UploadImageStep;