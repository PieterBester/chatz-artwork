'use client';

import { useState } from 'react';
import { AdTemplate, CircleBackground } from '@/config/templates';
import { Store } from '@/config/stores';
import { ExportSize } from '@/config/exportSizes';

interface TemplateDesignerProps {
  templates: AdTemplate[];
  backgrounds: CircleBackground[];
  stores: Store[];
  exportSizes: ExportSize[];
  onGenerate: (options: {
    template: AdTemplate;
    store: Store;
    exportSize: ExportSize;
    productName: string;
    price: string;
    packageInfo: string;
  }) => void;
}

export default function TemplateDesigner({
  templates,
  backgrounds,
  stores,
  exportSizes,
  onGenerate
}: TemplateDesignerProps) {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedStore, setSelectedStore] = useState(stores[0]);
  const [selectedSize, setSelectedSize] = useState(exportSizes[0]);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [packageInfo, setPackageInfo] = useState('');

  const handleGenerate = () => {
    if (!productName || !price) {
      alert('Please fill in product name and price');
      return;
    }

    onGenerate({
      template: selectedTemplate,
      store: selectedStore,
      exportSize: selectedSize,
      productName,
      price,
      packageInfo
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Template Designer</h2>
        
        {/* Template Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Choose Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedTemplate.id === template.id
                    ? 'border-chatzBlue bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate(template)}
              >
                <h4 className="font-medium text-gray-900">{template.name}</h4>
                <p className="text-sm text-gray-600">{template.description}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: template.background.baseColor }}
                  />
                  <span className="text-xs text-gray-500">{template.background.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g., Xiaomi 14T"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chatzBlue focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price *
            </label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g., R699"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chatzBlue focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Package Details
          </label>
          <input
            type="text"
            value={packageInfo}
            onChange={(e) => setPackageInfo(e.target.value)}
            placeholder="e.g., PM x36, 2GB RED CORE"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chatzBlue focus:border-transparent"
          />
        </div>

        {/* Store Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Store</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {stores.map((store) => (
              <div
                key={store.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedStore.id === store.id
                    ? 'border-chatzBlue bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedStore(store)}
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: store.color }}
                  />
                  <span className="font-medium text-gray-900">{store.name}</span>
                </div>
                <p className="text-sm text-gray-600">{store.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Export Size */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Export Size</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {exportSizes.map((size) => (
              <div
                key={size.id}
                className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedSize.id === size.id
                    ? 'border-chatzBlue bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedSize(size)}
              >
                <h4 className="font-medium text-gray-900">{size.name}</h4>
                <p className="text-sm text-gray-600">{size.width} × {size.height}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-chatzBlue text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Generate Ad</span>
        </button>
      </div>
    </div>
  );
}
