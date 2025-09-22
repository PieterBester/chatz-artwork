'use client';

import { useState, useCallback } from 'react';
// Icons will be replaced with simple SVG icons
import ImageUpload from '@/components/ImageUpload';
import StoreSelector from '@/components/StoreSelector';
import ExportSizeSelector from '@/components/ExportSizeSelector';
import PriceOverride from '@/components/PriceOverride';
import ImagePreview from '@/components/ImagePreview';
import { stores } from '@/config/stores';
import { exportSizes } from '@/config/exportSizes';
import { ImageProcessor, ProcessingOptions } from '@/lib/imageProcessor';
import { ZipExporter } from '@/lib/zipExporter';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState(stores[0].id);
  const [selectedSizeId, setSelectedSizeId] = useState(exportSizes[0].id);
  const [priceOverride, setPriceOverride] = useState('');
  const [packageOverride, setPackageOverride] = useState('');
  const [processedImages, setProcessedImages] = useState<{ [key: string]: string }>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentPreview, setCurrentPreview] = useState<{ original: string; processed?: string; filename: string } | null>(null);

  const selectedStore = stores.find(s => s.id === selectedStoreId)!;
  const selectedSize = exportSizes.find(s => s.id === selectedSizeId)!;

  const handleImagesSelected = useCallback((files: File[]) => {
    setSelectedFiles(files);
    setProcessedImages({});
    setCurrentPreview(null);
  }, []);

  const processImages = async () => {
    if (selectedFiles.length === 0) return;

    setIsProcessing(true);
    const processor = new ImageProcessor();
    const exporter = new ZipExporter();
    const newProcessedImages: { [key: string]: string } = {};

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        
        // Create image element
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = URL.createObjectURL(file);
        });

        // Process image
        const options: ProcessingOptions = {
          store: selectedStore,
          exportSize: selectedSize,
          originalImage: img,
          priceOverride: priceOverride || undefined,
          packageOverride: packageOverride || undefined,
        };

        const result = await processor.processImage(options);
        
        // Store processed image
        newProcessedImages[file.name] = result.url;
        
        // Add to zip
        const filename = `${selectedStore.name.replace(/\s+/g, '_')}_${selectedSize.name.replace(/\s+/g, '_')}_${file.name}`;
        exporter.addFile(filename, result.blob);

        // Set first image as preview
        if (i === 0) {
          setCurrentPreview({
            original: URL.createObjectURL(file),
            processed: result.url,
            filename: file.name
          });
        }
      }

      setProcessedImages(newProcessedImages);
      
      // Download zip
      const zipFilename = `Chatz_Connect_${selectedStore.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.zip`;
      await exporter.downloadZip(zipFilename);

    } catch (error) {
      console.error('Error processing images:', error);
      alert('Error processing images. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadSingleImage = (filename: string) => {
    const processedUrl = processedImages[filename];
    if (!processedUrl) return;

    const link = document.createElement('a');
    link.href = processedUrl;
    link.download = `${selectedStore.name.replace(/\s+/g, '_')}_${filename}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const setPreviewImage = (file: File) => {
    setCurrentPreview({
      original: URL.createObjectURL(file),
      processed: processedImages[file.name],
      filename: file.name
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-chatzBlue rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Artwork Autobrander</h1>
                <p className="text-sm text-gray-500">Chatz Connect</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''} selected
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Image Upload */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Upload Artwork
              </h2>
              <ImageUpload onImagesSelected={handleImagesSelected} />
            </div>

            {/* Store Selection */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Store Settings
              </h2>
              <StoreSelector
                stores={stores}
                selectedStoreId={selectedStoreId}
                onStoreChange={setSelectedStoreId}
              />
            </div>

            {/* Export Size */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Export Format
              </h2>
              <ExportSizeSelector
                sizes={exportSizes}
                selectedSizeId={selectedSizeId}
                onSizeChange={setSelectedSizeId}
              />
            </div>

            {/* Price Override */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Customization
              </h2>
              <PriceOverride
                onPriceChange={setPriceOverride}
                onPackageChange={setPackageOverride}
              />
            </div>

            {/* Process Button */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <button
                onClick={processImages}
                disabled={selectedFiles.length === 0 || isProcessing}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-chatzBlue text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Process & Download</span>
                  </>
                )}
              </button>
              
              {selectedFiles.length > 0 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Will process {selectedFiles.length} image{selectedFiles.length !== 1 ? 's' : ''} for {selectedStore.name}
                </p>
              )}
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Preview & Download
              </h2>
              
              {currentPreview ? (
                <ImagePreview
                  originalUrl={currentPreview.original}
                  processedUrl={currentPreview.processed}
                  filename={currentPreview.filename}
                  onDownload={() => downloadSingleImage(currentPreview.filename)}
                />
              ) : (
                <div className="aspect-[9/16] bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>Upload images to see preview</p>
                  </div>
                </div>
              )}

              {/* Image Thumbnails */}
              {selectedFiles.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    All Images ({selectedFiles.length})
                  </h3>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                    {selectedFiles.map((file, index) => (
                      <button
                        key={index}
                        onClick={() => setPreviewImage(file)}
                        className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentPreview?.filename === file.name
                            ? 'border-chatzBlue'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={URL.createObjectURL(file)}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
