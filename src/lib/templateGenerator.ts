import { AdTemplate, CircleBackground } from '@/config/templates';
import { Store } from '@/config/stores';
import { ExportSize } from '@/config/exportSizes';

export interface TemplateGenerationOptions {
  template: AdTemplate;
  store: Store;
  exportSize: ExportSize;
  productName: string;
  price: string;
  packageInfo: string;
  productImage?: HTMLImageElement;
}

export class TemplateGenerator {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d')!;
  }

  async generateAd(options: TemplateGenerationOptions): Promise<{ canvas: HTMLCanvasElement; blob: Blob; url: string }> {
    const { template, store, exportSize, productName, price, packageInfo, productImage } = options;
    
    // Set canvas size
    this.canvas.width = exportSize.width;
    this.canvas.height = exportSize.height;

    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background with circles
    this.drawBackground(template.background);

    // Draw product image if provided
    if (productImage) {
      this.drawProductImage(productImage, template.layout);
    }

    // Draw product name
    this.drawProductName(productName);

    // Draw pricing
    this.drawPricing(price, packageInfo, template.pricePosition, template.packagePosition);

    // Draw store footer
    this.drawStoreFooter(store);

    // Convert to blob
    const blob = await this.canvasToBlob();
    const url = URL.createObjectURL(blob);

    return {
      canvas: this.canvas,
      blob,
      url
    };
  }

  private drawBackground(background: CircleBackground) {
    // Fill base color
    this.ctx.fillStyle = background.baseColor;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw circles based on pattern
    this.ctx.fillStyle = `rgba(${this.hexToRgb(background.circleColor)}, ${background.opacity})`;

    switch (background.pattern) {
      case 'concentric':
        this.drawConcentricCircles();
        break;
      case 'scattered':
        this.drawScatteredCircles();
        break;
      case 'radial':
        this.drawRadialCircles();
        break;
    }
  }

  private drawConcentricCircles() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;
    const maxRadius = Math.max(this.canvas.width, this.canvas.height) / 2;

    for (let i = 0; i < 8; i++) {
      const radius = (maxRadius / 8) * (i + 1);
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawScatteredCircles() {
    for (let i = 0; i < 25; i++) {
      const x = Math.random() * this.canvas.width;
      const y = Math.random() * this.canvas.height;
      const radius = Math.random() * 80 + 20;

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawRadialCircles() {
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      const distance = Math.random() * 200 + 100;
      const x = centerX + Math.cos(angle) * distance;
      const y = centerY + Math.sin(angle) * distance;
      const radius = Math.random() * 60 + 30;

      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  private drawProductImage(image: HTMLImageElement, layout: string) {
    let imageWidth, imageHeight, imageX, imageY;

    switch (layout) {
      case 'phone-focused':
        // Center the image with space for footer
        imageHeight = this.canvas.height * 0.6;
        imageWidth = imageHeight * (image.width / image.height);
        imageX = (this.canvas.width - imageWidth) / 2;
        imageY = this.canvas.height * 0.1;
        break;
      case 'product-focused':
        // Larger image, more prominent
        imageHeight = this.canvas.height * 0.7;
        imageWidth = imageHeight * (image.width / image.height);
        imageX = (this.canvas.width - imageWidth) / 2;
        imageY = this.canvas.height * 0.05;
        break;
      case 'lifestyle':
        // Smaller image, more space for text
        imageHeight = this.canvas.height * 0.4;
        imageWidth = imageHeight * (image.width / image.height);
        imageX = (this.canvas.width - imageWidth) / 2;
        imageY = this.canvas.height * 0.15;
        break;
      default:
        imageHeight = this.canvas.height * 0.6;
        imageWidth = imageHeight * (image.width / image.height);
        imageX = (this.canvas.width - imageWidth) / 2;
        imageY = this.canvas.height * 0.1;
    }

    this.ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
  }

  private drawProductName(name: string) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 32px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(name, this.canvas.width / 2, 80);
  }

  private drawPricing(price: string, packageInfo: string, pricePosition: string, packagePosition: string) {
    this.ctx.fillStyle = 'white';
    this.ctx.font = 'bold 48px Inter, sans-serif';
    this.ctx.textAlign = 'center';

    let priceX, priceY;
    switch (pricePosition) {
      case 'top-right':
        this.ctx.textAlign = 'right';
        priceX = this.canvas.width - 20;
        priceY = 100;
        break;
      case 'bottom-center':
        priceX = this.canvas.width / 2;
        priceY = this.canvas.height - 200;
        break;
      case 'overlay':
        priceX = this.canvas.width / 2;
        priceY = this.canvas.height / 2 + 100;
        break;
      default:
        priceX = this.canvas.width / 2;
        priceY = this.canvas.height - 200;
    }

    this.ctx.fillText(price, priceX, priceY);

    // Draw package info
    if (packageInfo) {
      this.ctx.font = '24px Inter, sans-serif';
      let packageX = priceX;
      let packageY = priceY + 40;

      if (packagePosition === 'separate') {
        packageY = priceY + 80;
      } else if (packagePosition === 'inline') {
        packageX = priceX + 20;
        packageY = priceY;
      }

      this.ctx.fillText(packageInfo, packageX, packageY);
    }
  }

  private drawStoreFooter(store: Store) {
    const footerHeight = 120;
    const footerY = this.canvas.height - footerHeight;

    // Semi-transparent background
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

    // Contact info
    this.ctx.font = '16px Inter, sans-serif';
    this.ctx.fillText(`📞 ${store.phone}`, this.canvas.width / 2 - 100, footerY + 80);
    this.ctx.fillText(`💬 ${store.whatsapp}`, this.canvas.width / 2 + 100, footerY + 80);

    // Website
    this.ctx.font = '14px Inter, sans-serif';
    this.ctx.fillText('Chatzconnect.co.za', this.canvas.width / 2, footerY + 105);
  }

  private hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '255, 255, 255';
    
    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    
    return `${r}, ${g}, ${b}`;
  }

  private async canvasToBlob(): Promise<Blob> {
    return new Promise((resolve) => {
      this.canvas.toBlob((blob) => {
        resolve(blob!);
      }, 'image/jpeg', 0.9);
    });
  }
}
