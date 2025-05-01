"use client";
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
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

const UploadPhotoPage: React.FC = () => {
  const router = useRouter();
  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleFile = useCallback((file: File) => {
    // Only accept JPEG/PNG and size <= 10MB
    if (!['image/jpeg', 'image/png'].includes(file.type) || file.size > 10 * 1024 * 1024) {
      setUploadingFile({
        name: file.name,
        size: file.size,
        progress: 0,
        status: 'error',
        type: file.type
      });
      return;
    }

    setUploadingFile({
      name: file.name,
      size: file.size,
      progress: 0,
      status: 'uploading',
      type: file.type
    });
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadingFile(prev => {
        if (!prev) return null;
        return { ...prev, progress: Math.min(progress, 100) };
      });
      
      if (progress >= 100) {
        clearInterval(interval);
        setUploadingFile(prev => {
          if (!prev) return null;
          return { ...prev, status: 'success' };
        });
      }
    }, 300);
  }, []);

  const handleComplete = () => {
    setIsComplete(true);
    
    // Simulate redirect after completion
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Upload Photo - Spives</title>
        <meta name="description" content="Upload your profile photo" />
      </Head>
      
      <div className="min-h-screen max-w-screen relative text-center overflow-x-hidden flex justify-center items-center">
    <div className="absolute top-0 left-0 w-screen h-[100%]">
      <img
        src="/images/landing-page/hero-bg.png"
        alt="hero background"
        className="w-full h-full"
      />
    </div>
    <div className="absolute top-0 left-0 w-screen h-[100%] bg-gradient-to-b from-[#03033E]/60 to-[#000066]/60" />

        
        <motion.div 
          className="w-full max-w-2xl relative z-10 mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl adumu font-bold mb-2 text-orange-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Upload photo
          </motion.h1>
          
          <motion.p 
            className="text-white text-center mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Select a photo you want to use as your profile photo
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full mb-6"
          >
            <DragDropUpload 
              onFileSelect={handleFile}
              maxSizeKb={10240}
              acceptedFileTypes={['image/jpeg', 'image/png']}
            />
          </motion.div>
          
          {uploadingFile && (
            <motion.div 
              className="w-full mb-12"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <FileUploadProgress 
                name={uploadingFile.name}
                size={uploadingFile.size}
                progress={uploadingFile.progress}
                status={uploadingFile.status}
                type={uploadingFile.type}
              />
              {uploadingFile.status === 'error' && (
                <div className="text-red-500 text-sm mt-2">
                  Only JPEG or PNG files under 10MB are allowed.
                </div>
              )}
            </motion.div>
          )}
          
          <motion.button
            className="bg-blue-900 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleComplete}
            disabled={
              !uploadingFile ||
              uploadingFile.status !== 'success' ||
              isComplete
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: (!uploadingFile || uploadingFile.status !== 'success' || isComplete) ? 1 : 1.05 }}
          >
            {isComplete ? "Redirecting..." : "Complete"}
          </motion.button>
        </motion.div>
      </div>
    </>
  );
};

export default UploadPhotoPage;