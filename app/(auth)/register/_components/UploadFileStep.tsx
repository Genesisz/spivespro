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
}

interface UploadFileStepProps {
  uploadedFile: UploadingFile | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<UploadingFile | null>>;
  onContinue: () => void;
  onBack: () => void;
}

const UploadFileStep: React.FC<UploadFileStepProps> = ({ uploadedFile, setUploadedFile, onContinue, onBack }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleFile = useCallback((file: File) => {
    // Accept any file type, max 20MB
    if (file.size > 20 * 1024 * 1024) {
      setUploadedFile({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'error',
        type: file.type
      });
      return;
    }
    setUploadedFile({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
      type: file.type
    });
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadedFile((prev: UploadingFile | null) => {
        if (!prev) return null;
        return { ...prev, progress: Math.min(progress, 100) };
      });
      if (progress >= 100) {
        clearInterval(interval);
        setUploadedFile((prev: UploadingFile | null) => {
          if (!prev) return null;
          return { ...prev, status: 'success' };
        });
      }
    }, 300);
  }, [setUploadedFile]);

  const handleContinue = () => {
    setIsComplete(true);
    setTimeout(() => {
      onContinue();
    }, 800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      <motion.h1 className="text-4xl adumu font-bold mb-2 text-orange-400">Upload file</motion.h1>
      <motion.p className="text-white text-center mb-8">Upload a document (PDF, DOC, DOCX, etc.) up to 20MB</motion.p>
      <motion.div className="w-full mb-6">
        <DragDropUpload 
          onFileSelect={handleFile}
          maxSizeKb={20480}
          acceptedFileTypes={[]}
        />
      </motion.div>
      {uploadedFile && (
        <motion.div className="w-full mb-12">
          <FileUploadProgress 
            name={uploadedFile.name}
            size={uploadedFile.size}
            progress={uploadedFile.progress}
            status={uploadedFile.status as FileStatus}
          />
          {uploadedFile.status === 'error' && (
            <div className="text-red-500 text-sm mt-2">File size should not exceed 20MB.</div>
          )}
        </motion.div>
      )}
      <div className="flex justify-between w-full max-w-md mt-4">
        <button type="button" onClick={onBack} className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">Back</button>
        <button
          className="bg-blue-900 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleContinue}
          disabled={
            !uploadedFile ||
            uploadedFile.status !== 'success' ||
            isComplete
          }
        >
          {isComplete ? "Processing..." : "Continue"}
        </button>
      </div>
    </div>
  );
};

export default UploadFileStep; 