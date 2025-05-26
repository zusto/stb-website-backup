import { Router } from 'express';
import multer from 'multer';
import { StorageService } from '../services/storageService';

const uploadRouter = Router();
const storageService = new StorageService();

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB size limit
  },
  fileFilter: (req, file, cb) => {
    // Allow only certain file types
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, JPEG, and PNG files are allowed'));
    }
  },
});

// Create the upload endpoint
uploadRouter.post(
  '/',
  upload.array('documents', 5),
  async (req, res) => {
    try {
      console.log('📁 Received upload request');

      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        throw new Error('No files uploaded');
      }

      // Upload each file
      const uploadedFiles = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
          const url = await storageService.uploadFile(file);
          return {
            url,
            name: file.originalname,
            size: file.size,
            type: file.mimetype,
          };
        })
      );

      console.log('✅ Files uploaded successfully:', uploadedFiles);
      res.json({ success: true, files: uploadedFiles });
    } catch (error) {
      console.error('❌ Upload error:', error);
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      });
    }
  }
);

export { uploadRouter };