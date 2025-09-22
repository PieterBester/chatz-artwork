import JSZip from 'jszip';

export interface ExportItem {
  filename: string;
  blob: Blob;
}

export class ZipExporter {
  private zip: JSZip;

  constructor() {
    this.zip = new JSZip();
  }

  addFile(filename: string, blob: Blob): void {
    this.zip.file(filename, blob);
  }

  addFiles(items: ExportItem[]): void {
    items.forEach(item => {
      this.zip.file(item.filename, item.blob);
    });
  }

  async generateZip(): Promise<Blob> {
    return await this.zip.generateAsync({ type: 'blob' });
  }

  async downloadZip(filename: string = 'artwork-branded.zip'): Promise<void> {
    const zipBlob = await this.generateZip();
    const url = URL.createObjectURL(zipBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
  }
}
