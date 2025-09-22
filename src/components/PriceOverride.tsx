'use client';

import { useState } from 'react';

interface PriceOverrideProps {
  onPriceChange: (price: string) => void;
  onPackageChange: (packageInfo: string) => void;
}

export default function PriceOverride({ onPriceChange, onPackageChange }: PriceOverrideProps) {
  const [price, setPrice] = useState('');
  const [packageInfo, setPackageInfo] = useState('');

  const handlePriceChange = (value: string) => {
    setPrice(value);
    onPriceChange(value);
  };

  const handlePackageChange = (value: string) => {
    setPackageInfo(value);
    onPackageChange(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Price Override (Optional)</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => handlePriceChange(e.target.value)}
            placeholder="e.g., R699"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chatzBlue focus:border-transparent"
          />
        </div>
        
        <div>
          <label htmlFor="package" className="block text-sm font-medium text-gray-700 mb-2">
            Package Details
          </label>
          <input
            type="text"
            id="package"
            value={packageInfo}
            onChange={(e) => handlePackageChange(e.target.value)}
            placeholder="e.g., PM x36, 2GB RED CORE"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-chatzBlue focus:border-transparent"
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        Leave empty to keep original pricing from the artwork.
      </p>
    </div>
  );
}
