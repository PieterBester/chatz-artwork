'use client';

import { useState } from 'react';
// Icons will be replaced with simple SVG icons

interface ImagePreviewProps {
  originalUrl: string;
  processedUrl?: string;
  filename: string;
  onDownload?: () => void;
}

export default function ImagePreview({ originalUrl, processedUrl, filename, onDownload }: ImagePreviewProps) {
  const [showProcessed, setShowProcessed] = useState(true);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Preview</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowProcessed(!showProcessed)}
            className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            {showProcessed ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
            <span>{showProcessed ? 'Hide' : 'Show'} Processed</span>
          </button>
          
          {processedUrl && onDownload && (
            <button
              onClick={onDownload}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-chatzBlue text-white hover:bg-blue-700 rounded-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download</span>
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <div className="aspect-[9/16] bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={showProcessed && processedUrl ? processedUrl : originalUrl}
            alt={filename}
            className="w-full h-full object-contain"
          />
        </div>
        
        {processedUrl && (
          <div className="absolute top-2 left-2">
            <div className="bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
              {showProcessed ? 'Processed' : 'Original'}
            </div>
          </div>
        )}
      </div>
      
      <p className="text-sm text-gray-600 truncate">{filename}</p>
    </div>
  );
}
