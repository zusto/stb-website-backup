import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export class StorageService {
  // Where we'll store files
  private uploadDir: string;
  // Where files can be accessed from the internet
  private baseUrl: string;

  constructor() {
    // Update paths to match VPS configuration
    this.uploadDir = process.env.UPLOAD_DIR || '/var/www/uploads';
    this.baseUrl = process.env.FILE_BASE_URL || 'http://31.97.42.47/uploads';
  }

  // Function to save a file
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      // Generate unique filename
      const uniqueId = crypto.randomBytes(8).toString('hex');
      const safeFilename = `${uniqueId}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, '')}`;
      const filePath = path.join(this.uploadDir, safeFilename);

      // Ensure upload directory exists
      await fs.mkdir(this.uploadDir, { recursive: true });

      // Save file
      await fs.writeFile(filePath, file.buffer);
      console.log('✅ File saved:', safeFilename);

      // Return public URL
      const fileUrl = `${this.baseUrl}/${safeFilename}`;
      console.log('📎 File URL:', fileUrl);
      return fileUrl;

    } catch (error) {
      console.error('❌ File upload error:', error);
      throw new Error('Failed to upload file');
    }
  }
}