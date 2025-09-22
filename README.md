# Artwork Autobrander - Chatz Connect

A Next.js application for automatically branding Vodacom/Chatz artwork with store details and logos.

## Features

- **Batch Image Processing**: Upload multiple artwork images and process them all at once
- **Store Branding**: Add store-specific logos, contact details, and location information
- **Background Extension**: Automatically match and extend backgrounds for different aspect ratios
- **Multiple Export Sizes**: Export for WhatsApp Status, Facebook Posts, Instagram, etc.
- **Price Override**: Optionally override pricing and package details
- **ZIP Export**: Download all processed images in a single ZIP file

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Store Logos**
   - Place your store logos in `public/logos/`
   - Recommended format: PNG with transparency
   - Naming convention: `chatz-{store-name}.png`

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   - Navigate to `http://localhost:3000`

## Usage

1. **Upload Artwork**: Drag and drop or browse for your Vodacom/Chatz artwork images
2. **Select Store**: Choose which store to brand the images for
3. **Choose Export Size**: Select the target platform (WhatsApp, Facebook, etc.)
4. **Customize (Optional)**: Override pricing or package details if needed
5. **Process & Download**: Click the process button to generate branded images

## Store Configuration

Edit `src/config/stores.ts` to update store information:

```typescript
{
  id: 'newcastle',
  name: 'Chatz Connect Newcastle',
  location: 'Amajuba Mall',
  address: 'Amajuba Mall, Newcastle',
  phone: '0343124289',
  whatsapp: '0609718728',
  logo: '/logos/chatz-newcastle.png',
  color: '#1E40AF'
}
```

## Export Sizes

The app supports multiple export formats:

- **WhatsApp Status**: 1080×1920 (9:16)
- **Facebook Post**: 1200×630 (1.91:1)
- **Facebook Story**: 1080×1920 (9:16)
- **Instagram Post**: 1080×1080 (1:1)
- **Instagram Story**: 1080×1920 (9:16)

## Future Features

- [ ] Template Designer for creating custom ads
- [ ] WhatsApp Status direct upload
- [ ] Facebook Page posting integration
- [ ] OCR-based price detection and replacement
- [ ] Circle background generator
- [ ] Batch processing for all stores

## Technical Details

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Image Processing**: HTML5 Canvas API
- **Export**: JSZip for batch downloads
- **TypeScript**: Full type safety

## File Structure

```
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── src/
│   ├── components/
│   │   ├── ImageUpload.tsx
│   │   ├── StoreSelector.tsx
│   │   ├── ExportSizeSelector.tsx
│   │   ├── PriceOverride.tsx
│   │   └── ImagePreview.tsx
│   ├── config/
│   │   ├── stores.ts
│   │   └── exportSizes.ts
│   └── lib/
│       ├── imageProcessor.ts
│       └── zipExporter.ts
├── public/
│   └── logos/
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

Private use for Chatz Connect stores only.
