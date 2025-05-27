import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class StorageService {
  // Where we'll store files
  private uploadDir: string;
  // Where files can be accessed from the internet
  private publicUrl: string;

  constructor() {
    console.log('🌍 Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      UPLOAD_DIR: process.env.UPLOAD_DIR,
      FILE_BASE_URL: process.env.FILE_BASE_URL
    });
    
    if (!process.env.UPLOAD_DIR || !process.env.FILE_BASE_URL) {
      throw new Error('Missing required environment variables');
    }

    // Update paths to match VPS configuration
    this.uploadDir = process.env.UPLOAD_DIR || '/var/www/stb-website/uploads';
    this.publicUrl = process.env.PUBLIC_URL || 'https://studenttravelbuddy.com/uploads';
    
    // Ensure upload directory exists
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  // Function to save a file
  async uploadFile(file: Express.Multer.File): Promise<string> {
    // Generate unique filename
    const fileExt = path.extname(file.originalname);
    const fileName = `${crypto.randomBytes(16).toString('hex')}${fileExt}`;
    const filePath = path.join(this.uploadDir, fileName);

    // Save file
    await fs.promises.writeFile(filePath, file.buffer);

    // Return public URL
    return `${this.publicUrl}/${fileName}`;
  }
}