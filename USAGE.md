# Artwork Autobrander - Usage Guide

## Quick Start

1. **Open the Application**
   - Navigate to `http://localhost:3000` in your browser
   - The app should be running after `npm run dev`

2. **Upload Your Artwork**
   - Drag and drop your Vodacom/Chatz artwork images into the upload area
   - Or click "browse files" to select images
   - Supports JPG, PNG, WebP formats

3. **Select Store**
   - Choose which Chatz Connect store to brand for:
     - **Newcastle** (Amajuba Mall)
     - **Vryheid** (Vryheid Mall) 
     - **Ermelo** (Ermelo Mall)

4. **Choose Export Size**
   - **WhatsApp Status**: 1080×1920 (9:16) - Perfect for WhatsApp stories
   - **Facebook Post**: 1200×630 (1.91:1) - Standard Facebook post format
   - **Facebook Story**: 1080×1920 (9:16) - Facebook stories
   - **Instagram Post**: 1080×1080 (1:1) - Square Instagram posts
   - **Instagram Story**: 1080×1920 (9:16) - Instagram stories

5. **Customize (Optional)**
   - Override the price (e.g., "R699")
   - Override package details (e.g., "PM x36, 2GB RED CORE")
   - Leave empty to keep original pricing from artwork

6. **Process & Download**
   - Click "Process & Download" button
   - The app will:
     - Extract background colors from your artwork
     - Extend the background to fit the new aspect ratio
     - Add circular patterns matching the original design
     - Overlay store information in a clean footer
     - Apply any price/package overrides
     - Generate a ZIP file with all processed images

## Features Explained

### Background Matching
- The app automatically samples the bottom edge of your original artwork
- Creates a matching background color
- Adds subtle circular patterns similar to the original design
- Extends the background to accommodate different aspect ratios

### Store Branding
- Adds a semi-transparent footer with:
  - Store name and location
  - Phone and WhatsApp contact numbers
  - Website (Chatzconnect.co.za)
- Uses store-specific colors and branding

### Price Override
- When you provide custom pricing, it appears as an overlay
- Positioned in the top-right corner with a dark background
- Maintains readability while not interfering with the main design

## File Organization

### Input Files
- Upload your original Vodacom/Chatz artwork
- No specific naming convention required
- Multiple files can be processed at once

### Output Files
- ZIP file contains all processed images
- Naming format: `{Store_Name}_{Export_Size}_{Original_Filename}`
- Example: `Chatz_Connect_Newcastle_WhatsApp_Status_xiaomi_ad.jpg`

## Store Configuration

To update store information, edit `src/config/stores.ts`:

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

## Adding Store Logos

1. Place your store logos in `public/logos/`
2. Recommended format: PNG with transparency
3. Update the logo path in `src/config/stores.ts`
4. Current placeholder: `placeholder.svg`

## Troubleshooting

### Common Issues

1. **Images not processing**
   - Check that images are in supported formats (JPG, PNG, WebP)
   - Ensure images are not corrupted
   - Try with smaller file sizes

2. **Background not matching**
   - The app samples the bottom edge of images
   - Ensure your artwork has a consistent background color at the bottom
   - Images with complex bottom edges may not work as well

3. **Store information not appearing**
   - Check that a store is selected
   - Verify store configuration in `src/config/stores.ts`

4. **Export sizes not working**
   - Ensure you've selected an export size
   - Check browser console for any errors

### Performance Tips

- Process images in batches of 5-10 for best performance
- Larger images will take longer to process
- Close other browser tabs to free up memory

## Future Features

The app is designed to be extensible. Future features will include:

- **Template Designer**: Create custom ads from scratch
- **WhatsApp Integration**: Direct upload to WhatsApp Status
- **Facebook Integration**: Post directly to Facebook Pages
- **OCR Price Detection**: Automatically detect and replace prices
- **Circle Background Generator**: Create custom background patterns
- **Batch Store Processing**: Generate for all stores at once

## Support

For issues or feature requests, check the code in:
- `src/lib/imageProcessor.ts` - Core image processing logic
- `src/components/` - UI components
- `src/config/` - Configuration files
