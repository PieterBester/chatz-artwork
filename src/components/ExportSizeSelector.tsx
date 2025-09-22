'use client';

import { ExportSize } from '@/config/exportSizes';

interface ExportSizeSelectorProps {
  sizes: ExportSize[];
  selectedSizeId: string;
  onSizeChange: (sizeId: string) => void;
}

export default function ExportSizeSelector({ sizes, selectedSizeId, onSizeChange }: ExportSizeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Export Size</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {sizes.map((size) => (
          <div
            key={size.id}
            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
              selectedSizeId === size.id
                ? 'border-chatzBlue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onSizeChange(size.id)}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{size.name}</h4>
                <p className="text-sm text-gray-600">{size.width} × {size.height}</p>
                <p className="text-xs text-gray-500">{size.description}</p>
              </div>
              
              {selectedSizeId === size.id && (
                <div className="w-5 h-5 bg-chatzBlue text-white rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
