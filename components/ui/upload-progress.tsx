"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
interface FileUploadProgressProps {
  name: string;
  size: number;
  progress: number;
  status: 'idle' | 'uploading' | 'error' | 'success';
  type: string;
}

const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  name,
  size,
  progress,
  status,
  type
}) => {
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    return `${Math.round(kb)} KB`;
  };

  return (
    <motion.div 
      className="w-full bg-gray-100 rounded-2xl p-6 flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex-shrink-0">
        <Image src={`/images/Spives Web App Group 6.svg`} alt="hero background" width={40} height={40} />
        {/* <FileIcon type={type} /> */}
      </div>
      
      <div className="ml-4 flex-1">
        <div className="flex flex-col justify-between items-start gap-1 mb-4">
          <p className="text-gray-900 font-medium">{name}</p>
          <div className="flex items-center">
            <p className="text-gray-500 text-sm">
              {formatFileSize(size * (progress / 100))} of {formatFileSize(size)}
            </p>
            {status === 'uploading' && (
              <div className="ml-2">
                <motion.div 
                  className="w-4 h-4"
                  animate={{ 
                    rotate: 360 
                  }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                >
                  <svg className="w-4 h-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </motion.div>
              </div>
            )}
            <span className="ml-2 text-gray-500">
              {status === 'uploading' ? 'Uploading...' : 'Complete'}
            </span>
          </div>
        </div>
        
        <div className="w-full bg-gray-300 rounded-full h-2 mt-2">
          <motion.div 
            className="bg-blue-600 h-2 rounded-full" 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          ></motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default FileUploadProgress;

// To use this component in the upload-photo.tsx file:
// 
// import FileUploadProgress from '../components/FileUploadProgress';
// 
// // And replace the uploadingFile rendering with:
// {uploadingFile && (
//   <FileUploadProgress 
//     name={uploadingFile.name}
//     size={uploadingFile.size}
//     progress={uploadingFile.progress}
//     status={uploadingFile.status}
//     type={uploadingFile.type}
//   />
// )}