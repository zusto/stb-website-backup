import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export class StorageService {
  // Where we'll store files
  private uploadDir: string;
  // Where files can be accessed from the internet
  private baseUrl: string;

  constructor() {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    
    // Debug environment variables
    console.log('🌍 Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      UPLOAD_DIR: process.env.UPLOAD_DIR,
      FILE_BASE_URL: process.env.FILE_BASE_URL
    });
    
    // Use environment variables with fallbacks
    this.uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, '../../../public/lovable-uploads');
    // Update baseUrl to match OpenLiteSpeed context
    this.baseUrl = process.env.FILE_BASE_URL || 'https://studenttravelbuddy.com/uploads';
    
    console.log('📁 Storage paths:', {
      uploadDir: this.uploadDir,
      publicUrl: this.baseUrl
    });

    // Ensure upload directory exists
    try {
      if (!fs.existsSync(this.uploadDir)) {
        fs.mkdirSync(this.uploadDir, { recursive: true });
        console.log('📁 Created upload directory:', this.uploadDir);
      }
    } catch (error) {
      console.error('❌ Failed to create upload directory:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to initialize storage: ${errorMessage}`);
    }
  }

  // Function to save a file
  async uploadFile(file: Express.Multer.File): Promise<string> {
    try {
      // Ensure directory exists with LiteSpeed-friendly permissions
      await fs.promises.mkdir(this.uploadDir, { 
        recursive: true, 
        mode: 0o755  // rwxr-xr-x
      });

      const uniquePrefix = new Date().toISOString().split('T')[0] + '-';
      const safeName = file.originalname.replace(/[^a-zA-Z0-9.]/g, '_');
      const filename = `${uniquePrefix}${safeName}`;
      const filePath = path.join(this.uploadDir, filename);

      // Write file with proper permissions for LiteSpeed
      await fs.promises.writeFile(filePath, file.buffer);
      await fs.promises.chmod(filePath, 0o644);  // rw-r--r--

      console.log('📁 File saved for LiteSpeed:', {
        path: filePath,
        permissions: '644',
        url: `${this.baseUrl}/${filename}`
      });

      return `${this.baseUrl}/${filename}`;
    } catch (error) {
      console.error('❌ Storage error:', error);
      throw new Error('File storage failed');
    }
  }
}