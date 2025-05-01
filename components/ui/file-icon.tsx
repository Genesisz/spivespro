// components/FileIcon.tsx
import React from 'react';

interface FileIconProps {
  type: string;
}

const FileIcon: React.FC<FileIconProps> = ({ type }) => {
  // Function to determine file type and render appropriate icon
  const renderIcon = () => {
    if (type.includes('pdf')) {
      return (
        <div className="w-12 h-14 relative">
          {/* Paper background */}
          <div className="absolute inset-0 bg-white border border-gray-200 rounded shadow"></div>
          
          {/* Red PDF label */}
          <div className="absolute top-0 left-0 right-0 h-5 bg-red-500 flex items-center justify-center">
            <span className="text-white text-xs font-bold">PDF</span>
          </div>
          
          {/* Folded corner */}
          <div className="absolute top-0 right-0 w-3 h-3 bg-white border-b border-l border-gray-200 transform -rotate-90"></div>
        </div>
      );
    }
    
    if (type.includes('image')) {
      return (
        <div className="w-12 h-14 relative">
          {/* Paper background */}
          <div className="absolute inset-0 bg-white border border-gray-200 rounded shadow"></div>
          
          {/* Image content representation */}
          <div className="absolute top-5 left-2 right-2 bottom-2 bg-blue-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      );
    }
    
    // Default document icon
    return (
      <div className="w-12 h-14 relative">
        {/* Paper background */}
        <div className="absolute inset-0 bg-white border border-gray-200 rounded shadow"></div>
        
        {/* Document lines */}
        <div className="absolute top-3 left-2 right-2 flex flex-col space-y-1">
          <div className="h-1 bg-gray-200 rounded"></div>
          <div className="h-1 bg-gray-200 rounded"></div>
          <div className="h-1 bg-gray-200 rounded"></div>
          <div className="h-1 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  };

  return renderIcon();
};

export default FileIcon;

// To use this component in the upload-photo.tsx file:
// Replace the getFileIcon function with:
// 
// const getFileIcon = () => {
//   if (!uploadingFile) return null;
//   return <FileIcon type={uploadingFile.type} />;
// };