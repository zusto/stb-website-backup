import React, { useEffect, useState } from 'react';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { Button } from '@/components/ui/button';
import { UploadCloud, FileText, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { BasicDetails, VerificationData } from '@/types/checkout';
import { UploadDocsForm } from '@/components/checkout/UploadDocsForm';
import { useVerification } from '../../hooks/useVerification';
import { ZohoCRMService } from '@/services/zohoCrmService';

interface UploadFormData {
  uploadMethod: 'upload' | 'email';
  documents: File[];
}

const CheckoutUploadDocsPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState<UploadFormData>({
    uploadMethod: 'upload',
    documents: []
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { verificationStatus } = useVerification();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    console.log('🔄 Upload page mounted');
    
    // Check session storage immediately
    const verificationData = sessionStorage.getItem('stbVerificationData');
    console.log('📋 Found verification data:', verificationData);

    if (!verificationData) {
      console.log('❌ No verification data found - redirecting');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please complete the verification process first"
      });
      navigate('/checkout/verify');
      return;
    }

    try {
      const parsedData = JSON.parse(verificationData);
      console.log('✅ Loaded verification data:', parsedData);
      setUserData(parsedData);
    } catch (error) {
      console.error('❌ Parse error:', error);
      navigate('/checkout/verify');
    }
  }, [navigate, toast]);

  useEffect(() => {
    // Get both sets of data
    const verificationData = sessionStorage.getItem('stbVerificationData');
    const checkoutData = sessionStorage.getItem('stbCheckoutDetails');
    
    console.log('📋 Available Data:', {
      verificationData: verificationData ? JSON.parse(verificationData) : null,
      checkoutData: checkoutData ? JSON.parse(checkoutData) : null
    });

    // For underage users, we can use checkout data if verification data is missing
    if (!verificationData && checkoutData) {
      try {
        const checkoutDetails = JSON.parse(checkoutData);
        const age = calculateAge(checkoutDetails.dateOfBirth);
        
        if (age <= 17) {
          const manualData = {
            ...checkoutDetails,
            verificationStatus: 'Manual',
            verificationDate: new Date().toISOString(),
            age
          };
          
          sessionStorage.setItem('stbVerificationData', JSON.stringify(manualData));
          console.log('✅ Created verification data from checkout details:', manualData);
          setUserData(manualData);
          return;
        }
      } catch (error) {
        console.error('❌ Error processing checkout data:', error);
      }
    }

    if (!verificationData) {
      console.log('❌ No verification data found - redirecting');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please complete the verification process first"
      });
      navigate('/checkout/verify');
    }
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const verificationData = sessionStorage.getItem('stbVerificationData');
      if (!verificationData) {
        throw new Error('No verification data found');
      }

      const userData = JSON.parse(verificationData);
      console.log('📤 Submitting verification data:', userData);

      const zohoCRM = new ZohoCRMService();
      await zohoCRM.createStudentRecordWithDocuments({
        ...userData,
        uploadMethod: formData.uploadMethod,
        documents: formData.uploadMethod === 'email' 
          ? ['Opted to Email']
          : formData.documents.map(file => file.name)
      });

      // Clear stored data
      sessionStorage.removeItem('stbVerificationData');
      sessionStorage.removeItem('stbCheckoutDetails');

      toast({
        title: "Success!",
        description: "Your information has been submitted successfully"
      });

      navigate('/checkout/confirmation/manual');

    } catch (error) {
      console.error('❌ Submission error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to calculate age
  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Debug: Log stored data on mount
  useEffect(() => {
    const verificationData = sessionStorage.getItem('stbVerificationData');
    console.log('📋 Stored verification data:', verificationData ? JSON.parse(verificationData) : null);
  }, []);

  return (
    <CheckoutLayout currentStep={3} totalSteps={4}> {/* Updated totalSteps */}
      <div className="text-center">
        {formData.uploadMethod === 'upload' ? (
            <UploadCloud className="h-16 w-16 text-sunny-orange mx-auto mb-6" />
        ) : (
            <Mail className="h-16 w-16 text-sky-500 mx-auto mb-6" />
        )}
        <h1 className="text-3xl font-display text-sunny-orange-dark mb-4">
          Step 3: Provide Verification Documents
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-md mx-auto">
          Since you are under 17 or automatic verification was not possible, please provide a document for manual verification (e.g., student ID, enrollment letter). You can upload it now or choose to email it to us later.
        </p>

        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow border border-gray-200">
          <RadioGroup
            value={formData.uploadMethod}
            onValueChange={(value: 'upload' | 'email') => 
              setFormData(prev => ({ ...prev, uploadMethod: value }))
            }
            className="mb-6 space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upload" id="option-upload" />
              <Label htmlFor="option-upload" className="font-medium">Upload document now</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="email" id="option-email" />
              <Label htmlFor="option-email" className="font-medium">I'll email it later</Label>
            </div>
          </RadioGroup>

          {formData.uploadMethod === 'upload' && (
            <>
              <div className="mb-4">
                <label htmlFor="document-upload" className="block text-sm font-medium text-gray-700 mb-2">
                  Choose document to upload (PDF, JPG, PNG)
                </label>
                <Input
                  id="document-upload"
                  type="file"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setFormData(prev => ({ ...prev, documents: files }));
                  }}
                  className="stb-input"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={isProcessing}
                />
              </div>

              {formData.documents.length > 0 && (
                <div className="mb-4 p-3 bg-gray-100 rounded-md flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-700">{formData.documents.map(file => file.name).join(', ')}</span>
                  </div>
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, documents: [] }))}
                    className="text-xs text-red-500 hover:text-red-700"
                    disabled={isProcessing}
                  >
                    Remove
                  </button>
                </div>
              )}
            </>
          )}
          
          {formData.uploadMethod === 'email' && (
            <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-700">
              <p>You've chosen to email your documents. Please send them to <strong className="font-semibold">verifications@studenttravelbuddy.com</strong> within 48 hours. Don't forget to include your name and order details if possible!</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <Button
              type="submit"
              disabled={isSubmitting || (formData.uploadMethod === 'upload' && formData.documents.length === 0)}
              className="w-full stb-button bg-sunny-orange hover:bg-sunny-orange-dark text-white"
              size="lg"
            >
              {isSubmitting 
                ? (formData.uploadMethod === 'upload' ? "Uploading..." : "Processing...") 
                : (formData.uploadMethod === 'upload' ? "Upload and Submit" : "Submit")}
            </Button>
          </form>
        </div>
        <p className="text-sm text-gray-500 mt-6">
          {formData.uploadMethod === 'upload' ? "Your documents will be reviewed within 24-48 hours after submission." : "Please send your documents as soon as possible to avoid delays in your verification."}
          <br />
          If you have any questions, please contact support.
        </p>
      </div>
    </CheckoutLayout>
  );
};

export default CheckoutUploadDocsPage;

export const UploadDocsPage = () => {
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Upload Verification Documents</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <UploadDocsForm onError={setError} />
    </div>
  );
};
