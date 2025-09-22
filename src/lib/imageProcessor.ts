import { Store } from '@/config/stores';
import { ExportSize } from '@/config/exportSizes';

export interface ProcessedImage {
  canvas: HTMLCanvasElement;
  blob: Blob;
  url: string;
}

export interface ProcessingOptions {
  store: Store;
  exportSize: ExportSize;
  originalImage: HTMLImageElement;
  priceOverride?: string;
  packageOverride?: string;
}

export class ImageProcessor {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async processImage(options: ProcessingOptions): Promise<ProcessedImage> {
    const { store, exportSize, originalImage, priceOverride, packageOverride } = options;
    
    // Set canvas size to export dimensions
    this.canvas.width = exportSize.width;
    this.canvas.height = exportSize.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Extract background color from bottom edge of original image
    const backgroundColor = this.extractBackgroundColor(originalImage);
    
    // Fill background with extracted color
    this.ctx.fillStyle = backgroundColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Add subtle circular patterns (mimicking the original design)
    this.addCircularPatterns(backgroundColor);

    // Calculate dimensions for the original image
    const imageAspectRatio = originalImage.width / originalImage.height;
    const targetAspectRatio = exportSize.width / exportSize.height;
    
    let imageWidth, imageHeight, imageX, imageY;
    
    if (imageAspectRatio > targetAspectRatio) {
      // Image is wider than target, fit by height
      imageHeight = this.canvas.height * 0.8; // Leave space for footer
      imageWidth = imageHeight * imageAspectRatio;
      imageX = (this.canvas.width - imageWidth) / 2;
      imageY = (this.canvas.height - imageHeight) / 2;
    } else {
      // Image is taller than target, fit by width
      imageWidth = this.canvas.width * 0.9;
      imageHeight = imageWidth / imageAspectRatio;
      imageX = (this.canvas.width - imageWidth) / 2;
      imageY = (this.canvas.height - imageHeight) / 2;
    }

    // Draw the original image
    this.ctx.drawImage(originalImage, imageX, imageY, imageWidth, imageHeight);

    // Add footer with store information
    this.addStoreFooter(store, imageY + imageHeight);

    // Add price/package override if provided
    if (priceOverride || packageOverride) {
      this.addPriceOverride(priceOverride, packageOverride);
    }

    // Convert to blob
    const blob = await this.canvasToBlob();
    const url = URL.createObjectURL(blob);

    return {
      canvas: this.canvas,
      blob,
      url
    };
  }

  private extractBackgroundColor(image: HTMLImageElement): string {
    // Create a temporary canvas to sample the bottom edge
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d')!;
    
    tempCanvas.width = image.width;
    tempCanvas.height = image.height;
    tempCtx.drawImage(image, 0, 0);
    
    // Sample pixels from the bottom edge
    const imageData = tempCtx.getImageData(0, image.height - 10, image.width, 10);
    const pixels = imageData.data;
    
    let r = 0, g = 0, b = 0, count = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
      r += pixels[i];
      g += pixels[i + 1];
      b += pixels[i + 2];
      count++;
    }
    
    r = Math.round(r / count);
    g = Math.round(g / count);
    b = Math.round(b / count);
    
    return `rgb(${r}, ${g}, ${b})`;
  }

  private addCircularPatterns(backgroundColor: string) {
    // Parse the background color to get RGB values
    const rgbMatch = backgroundColor.match(/rgb\((\d+), (\d+), (\d+)\)/);
    if (!rgbMatch) return;
    
    const [, r, g, b] = rgbMatch.map(Number);
    
    // Create lighter version for circles
    const lighterR = Math.min(255, r + 30);
    const lighterG = Math.min(255, g + 30);
    const lighterB = Math.min(255, b + 30);
    
    this.ctx.fillStyle = `rgba(${lighterR}, ${lighterG}, ${lighterB}, 0.1)`;
    
    // Add random circular patterns
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const radius = Math.random() * 100 + 50;
      
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private addStoreFooter(store: Store, startY: number) {
    const footerHeight = 120;
    const footerY = Math.max(startY + 20, this.canvas.height - footerHeight);
    
    // Semi-transparent background for footer
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, footerY, this.canvas.width, footerHeight);
    
    // Store name
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 24px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(store.name, this.canvas.width / 2, footerY + 30);
    
    // Location
    this.ctx.font = '18px Inter, sans-serif';
    this.ctx.fillText(store.location, this.canvas.width / 2, footerY + 55);
    
    // Contact information
    this.ctx.font = '16px Inter, sans-serif';
    this.ctx.fillText(`📞 ${store.phone}`, this.canvas.width / 2 - 100, footerY + 80);
    this.ctx.fillText(`💬 ${store.whatsapp}`, this.canvas.width / 2 + 100, footerY + 80);
    
    // Website
    this.ctx.font = '14px Inter, sans-serif';
    this.ctx.fillText('Chatzconnect.co.za', this.canvas.width / 2, footerY + 105);
  }

  private addPriceOverride(price?: string, packageInfo?: string) {
    if (!price && !packageInfo) return;
    
    // Position in top-right corner
    const x = this.canvas.width - 20;
    const y = 50;
    
    // Background for price override
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(x - 150, y - 30, 150, 60);
    
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 20px Inter, sans-serif';
    this.ctx.textAlign = 'right';
    
    if (price) {
      this.ctx.fillText(price, x - 10, y);
    }
    
    if (packageInfo) {
      this.ctx.font = '14px Inter, sans-serif';
      this.ctx.fillText(packageInfo, x - 10, y + 20);
    }
  }

  private async canvasToBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', 0.9);
    });
  }
}
