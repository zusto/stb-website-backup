import { useState, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { ZohoCRMService } from '@/services/zohoCrmService';

// Define props interface
interface UploadDocsFormProps {
  onError: Dispatch<SetStateAction<string>>;
}

// Add props typing to component
export const UploadDocsForm: React.FC<UploadDocsFormProps> = ({ onError }) => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'upload' | 'email'>('upload');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const verificationData = sessionStorage.getItem('stbVerificationData');
      if (!verificationData) {
        throw new Error('Verification data not found');
      }

      // Handle file uploads if method is upload
      let documentUrls: string[] = [];
      if (uploadMethod === 'upload' && files.length > 0) {
        const formData = new FormData();
        files.forEach(file => formData.append('documents', file));

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (!uploadResponse.ok) {
          throw new Error('File upload failed');
        }

        const uploadResult = await uploadResponse.json();
        documentUrls = uploadResult.files.map((f: any) => f.url);
      }

      // Create Zoho record
      const zohoCRM = new ZohoCRMService();
      await zohoCRM.createStudentRecordWithDocuments({
        ...JSON.parse(verificationData),
        uploadMethod,
        documents: documentUrls
      });

      // Clear storage and redirect
      sessionStorage.removeItem('stbVerificationData');
      navigate('/checkout/confirmation/manual');

    } catch (error) {
      onError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <div>
        <label htmlFor="documents" className="block text-sm font-medium text-gray-700">
          Upload Verification Documents
        </label>
        <input
          type="file"
          id="documents"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
            }
          }}
          className="mt-1 block w-full"
        />
      </div>
      <Button
        type="submit"
        disabled={isUploading || files.length === 0}
        className="w-full"
      >
        {isUploading ? 'Uploading...' : 'Submit Documents'}
      </Button>
    </form>
  );
};