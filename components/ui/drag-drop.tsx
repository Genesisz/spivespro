"use client"
import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import Image from 'next/image';
interface DragDropUploadProps {
  onFileSelect: (file: File) => void;
  maxSizeKb?: number;
  acceptedFileTypes?: string[];
}

const DragDropUpload: React.FC<DragDropUploadProps> = ({ 
  onFileSelect, 
  maxSizeKb = 3072, 
  acceptedFileTypes = ['image/jpeg', 'image/png'] 
}) => {
  const [dragActive, setDragActive] = useState(false);
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

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
      return { 
        valid: false, 
        error: `Invalid file type. Please upload ${acceptedFileTypes.map(type => type.split('/')[1].toUpperCase()).join(' or ')}` 
      };
    }
    
    // Check file size
    if (file.size > maxSizeKb * 1024) {
      return { 
        valid: false, 
        error: `File size should not exceed ${maxSizeKb}kb` 
      };
    }
    
    return { valid: true };
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const validation = validateFile(file);
      
      if (validation.valid) {
        onFileSelect(file);
      } else if (validation.error) {
        alert(validation.error);
      }
    }
  }, [onFileSelect, acceptedFileTypes, maxSizeKb]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateFile(file);
      
      if (validation.valid) {
        onFileSelect(file);
      } else if (validation.error) {
        alert(validation.error);
      }
    }
  }, [onFileSelect, acceptedFileTypes, maxSizeKb]);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  const formattedAcceptedTypes = acceptedFileTypes
    .map(type => type.split('/')[1].toUpperCase())
    .join(', ');

  // Format max size for display in MB if >= 1024kb
  const formattedMaxSize = maxSizeKb >= 1024 ? `${(maxSizeKb / 1024).toFixed(0)}MB` : `${maxSizeKb}kb`;

  return (
    <div 
      className={`w-full bg-white rounded-2xl p-12 flex flex-col items-center justify-center relative ${
        dragActive ? 'border-2 border-blue-400' : ''
      }`}
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
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 0.8 
            }}
            className="flex flex-col items-center"
          >
            <Cloud size={48} className="text-blue-500 mb-4" />
            <p className="text-blue-900 font-medium">Drop your file here</p>
          </motion.div>
        </div>
      )}
      
      <Image src={`/images/Group 3 from Spives Web App.svg`} alt="hero background" className='my-12' width={40} height={40} />
      
      <p className="text-gray-800 text-lg font-medium mb-2">Choose a file or drag & drop it here</p>
      <p className="text-gray-500 text-sm mb-20">{formattedAcceptedTypes} up to {formattedMaxSize}</p>
      
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept={acceptedFileTypes.join(',')}
      />
      
      <motion.button 
        className="py-1 text-sm px-8 border-2 border-blue-900 text-blue-900 rounded-xl hover:bg-blue-50 transition-colors"
        onClick={openFileDialog}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Browse File
      </motion.button>
    </div>
  );
};

export default DragDropUpload;

// To use this component in the upload-photo.tsx file, modify the component to:
// 
// import DragDropUpload from '../components/DragDropUpload';
// 
// // Inside the component:
// const handleFile = useCallback((file: File) => {
//   setUploadingFile({
//     name: file.name,
//     size: file.size,
//     progress: 0,
//     status: 'uploading',
//     type: file.type
//   });
//   
//   // Simulate upload progress
//   let progress = 0;
//   const interval = setInterval(() => {
//     progress += 10;
//     setUploadingFile(prev => {
//       if (!prev) return null;
//       return { ...prev, progress: Math.min(progress, 100) };
//     });
//     
//     if (progress >= 100) {
//       clearInterval(interval);
//       setUploadingFile(prev => {
//         if (!prev) return null;
//         return { ...prev, status: 'success' };
//       });
//     }
//   }, 300);
// }, []);
// 
// // And use the component:
// <motion.div 
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.4 }}
// >
//   <DragDropUpload 
//     onFileSelect={handleFile}
//     maxSizeKb={105}
//     acceptedFileTypes={['image/jpeg', 'image/png']}
//   />
// </motion.div>