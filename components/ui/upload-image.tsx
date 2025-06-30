"use client";
import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Cloud, File } from 'lucide-react';

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
  const [dragActive, setDragActive] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<UploadingFile | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, []);

  const handleFile = useCallback((file: File) => {
    if (!file) return;
    
    // Check file type
    const isValidFileType = ['image/jpeg', 'image/png'].includes(file.type);
    if (!isValidFileType) {
      alert('Please upload only JPEG or PNG files');
      return;
    }
    
    // Check file size (105kb = 105 * 1024 bytes)
    if (file.size > 105 * 1024) {
      alert('File size should not exceed 105kb');
      return;
    }
    
    // Mock upload process
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

  const getFileIcon = () => {
    if (!uploadingFile) return null;
    
    if (uploadingFile.type.includes('pdf')) {
      return (
        <div className="w-12 h-12 bg-white rounded border border-gray-200 relative flex justify-center items-center">
          <div className="absolute inset-0 bg-red-500 rounded-t"></div>
          <span className="text-white font-bold text-xs z-10 mt-1">PDF</span>
        </div>
      );
    }
    
    return <File className="w-12 h-12 text-gray-400" />;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    return `${Math.round(kb)} KB`;
  };

  const handleComplete = () => {
    // Handle completion - in a real app this would navigate to the next step
    router.push('/profile');
  };

  return (
    <>
      <Head>
        <title>Upload Photo - Spives</title>
        <meta name="description" content="Upload your profile photo" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 p-4 flex flex-col items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" 
             style={{ backgroundImage: "url('/api/placeholder/1920/1080')" }}>
        </div>
        
        <motion.div 
          className="w-full max-w-2xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1 
            className="text-4xl font-bold mb-2 text-orange-400"
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
            className="w-full bg-white rounded-2xl p-12 mb-6 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onDragEnter={handleDrag}
          >
            {dragActive && (
              <div 
                className="absolute inset-0 z-10 bg-blue-50 rounded-2xl flex items-center justify-center"
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <p className="text-blue-900 font-medium">Drop your file here</p>
              </div>
            )}
            
            <Cloud size={48} className="text-gray-800 mb-4" />
            
            <p className="text-gray-800 text-lg font-medium mb-2">Choose a file or drag & drop it here</p>
            <p className="text-gray-500 text-sm mb-8">JPEG, PNG up to 105kb</p>
            
            <input
              ref={inputRef}
              type="file"
              className="hidden"
              onChange={handleChange}
              accept="image/jpeg,image/png"
            />
            
            <button 
              className="py-2 px-8 border border-blue-900 text-blue-900 rounded-full hover:bg-blue-50 transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              Browse File
            </button>
          </motion.div>
          
          {uploadingFile && (
            <motion.div 
              className="w-full bg-gray-100 rounded-2xl p-6 mb-12 flex items-center"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              {getFileIcon()}
              
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-gray-900 font-medium">{uploadingFile.name}</p>
                  <div className="flex items-center">
                    <p className="text-gray-500 text-sm">
                      {formatFileSize(uploadingFile.size)} of {formatFileSize(uploadingFile.size)}
                    </p>
                    {uploadingFile.status === 'uploading' && (
                      <div className="ml-2 animate-spin">
                        <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    )}
                    <span className="ml-2 text-gray-500">
                      {uploadingFile.status === 'uploading' ? 'Uploading...' : 'Complete'}
                    </span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${uploadingFile.progress}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
          
          <motion.button
            className="bg-blue-900 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleComplete}
            disabled={!uploadingFile || uploadingFile.status === 'uploading'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Complete Profile
          </motion.button>
          
          <motion.p
            className="text-white text-sm mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Now you can view your dashboard!
          </motion.p>
        </motion.div>
      </div>
    </>
  );
};

export default UploadPhotoPage;