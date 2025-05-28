import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
export class StorageService {
    constructor() {
        // Debug environment variables
        console.log('🌍 Environment:', {
            NODE_ENV: process.env.NODE_ENV,
            UPLOAD_DIR: process.env.UPLOAD_DIR,
            FILE_BASE_URL: process.env.FILE_BASE_URL
        });
        // Use environment variables with fallbacks
        this.uploadDir = process.env.UPLOAD_DIR || '/home/studenttravelbuddy.com/public_html/node-app/public/lovable-uploads';
        this.publicUrl = process.env.FILE_BASE_URL || 'https://studenttravelbuddy.com/uploads';
        console.log('📁 Storage paths:', {
            uploadDir: this.uploadDir,
            publicUrl: this.publicUrl
        });
        // Ensure upload directory exists
        try {
            if (!fs.existsSync(this.uploadDir)) {
                fs.mkdirSync(this.uploadDir, { recursive: true });
                console.log('📁 Created upload directory:', this.uploadDir);
            }
        }
        catch (error) {
            console.error('❌ Failed to create upload directory:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error(`Failed to initialize storage: ${errorMessage}`);
        }
    }
    // Function to save a file
    async uploadFile(file) {
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
