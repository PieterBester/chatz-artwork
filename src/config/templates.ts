export interface CircleBackground {
  id: string;
  name: string;
  baseColor: string;
  circleColor: string;
  opacity: number;
  pattern: 'concentric' | 'scattered' | 'radial';
}

export interface AdTemplate {
  id: string;
  name: string;
  description: string;
  background: CircleBackground;
  layout: 'phone-focused' | 'product-focused' | 'lifestyle';
  pricePosition: 'top-right' | 'bottom-center' | 'overlay';
  packagePosition: 'below-price' | 'separate' | 'inline';
}

export const circleBackgrounds: CircleBackground[] = [
  {
    id: 'vodacom-red',
    name: 'Vodacom Red',
    baseColor: '#EE1C25',
    circleColor: '#FF4444',
    opacity: 0.1,
    pattern: 'concentric'
  },
  {
    id: 'chatz-grey',
    name: 'Chatz Grey',
    baseColor: '#2E3135',
    circleColor: '#4A4D52',
    opacity: 0.15,
    pattern: 'scattered'
  },
  {
    id: 'chatz-blue',
    name: 'Chatz Blue',
    baseColor: '#1E40AF',
    circleColor: '#3B82F6',
    opacity: 0.12,
    pattern: 'radial'
  },
  {
    id: 'chatz-green',
    name: 'Chatz Green',
    baseColor: '#059669',
    circleColor: '#10B981',
    opacity: 0.1,
    pattern: 'concentric'
  },
  {
    id: 'custom-purple',
    name: 'Custom Purple',
    baseColor: '#7C3AED',
    circleColor: '#A78BFA',
    opacity: 0.08,
    pattern: 'scattered'
  }
];

export const adTemplates: AdTemplate[] = [
  {
    id: 'phone-promo',
    name: 'Phone Promotion',
    description: 'Standard phone promotion with product image and pricing',
    background: circleBackgrounds[0], // Vodacom Red
    layout: 'phone-focused',
    pricePosition: 'bottom-center',
    packagePosition: 'below-price'
  },
  {
    id: 'home-internet',
    name: 'Home Internet',
    description: 'Home internet promotion with lifestyle elements',
    background: circleBackgrounds[0], // Vodacom Red
    layout: 'lifestyle',
    pricePosition: 'bottom-center',
    packagePosition: 'separate'
  },
  {
    id: 'product-showcase',
    name: 'Product Showcase',
    description: 'Clean product showcase with minimal text',
    background: circleBackgrounds[1], // Chatz Grey
    layout: 'product-focused',
    pricePosition: 'top-right',
    packagePosition: 'inline'
  }
];

export const getTemplateById = (id: string): AdTemplate | undefined => {
  return adTemplates.find(template => template.id === id);
};

export const getBackgroundById = (id: string): CircleBackground | undefined => {
  return circleBackgrounds.find(background => background.id === id);
};
