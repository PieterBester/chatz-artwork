export interface ExportSize {
  id: string;
  name: string;
  width: number;
  height: number;
  description: string;
}

export const exportSizes: ExportSize[] = [
  {
    id: 'whatsapp-status',
    name: 'WhatsApp Status',
    width: 1080,
    height: 1920,
    description: '9:16 aspect ratio for WhatsApp stories'
  },
  {
    id: 'facebook-post',
    name: 'Facebook Post',
    width: 1200,
    height: 630,
    description: '1.91:1 aspect ratio for Facebook posts'
  },
  {
    id: 'facebook-story',
    name: 'Facebook Story',
    width: 1080,
    height: 1920,
    description: '9:16 aspect ratio for Facebook stories'
  },
  {
    id: 'instagram-post',
    name: 'Instagram Post',
    width: 1080,
    height: 1080,
    description: '1:1 square format for Instagram posts'
  },
  {
    id: 'instagram-story',
    name: 'Instagram Story',
    width: 1080,
    height: 1920,
    description: '9:16 aspect ratio for Instagram stories'
  }
];

export const getExportSizeById = (id: string): ExportSize | undefined => {
  return exportSizes.find(size => size.id === id);
};
