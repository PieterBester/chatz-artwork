'use client';

import { Store } from '@/config/stores';

interface StoreSelectorProps {
  stores: Store[];
  selectedStoreId: string;
  onStoreChange: (storeId: string) => void;
}

export default function StoreSelector({ stores, selectedStoreId, onStoreChange }: StoreSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Select Store</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stores.map((store) => (
          <div
            key={store.id}
            className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedStoreId === store.id
                ? 'border-chatzBlue bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onStoreChange(store.id)}
          >
            <div className="flex items-center space-x-3">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: store.color }}
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{store.name}</h4>
                <p className="text-sm text-gray-600">{store.location}</p>
                <p className="text-xs text-gray-500">{store.phone}</p>
              </div>
            </div>
            
            {selectedStoreId === store.id && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 bg-chatzBlue text-white rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
