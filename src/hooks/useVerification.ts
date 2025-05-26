import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verificationService } from '@/services/studentVerificationService';
import { ZohoCRMService } from '@/services/zohoCrmService';

const zohoCRM = new ZohoCRMService();

interface BasicDetails {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  isStudent: boolean;
  agreedToTerms: boolean;
  middleName?: string; // Making this optional since it's not always required
}

type VerificationStatus = 'idle' | 'loading' | 'success' | 'error' | 'manual_required';

export const useVerification = () => {
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<VerificationStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerification = async (
    schoolIdentifier: string,
    consentGiven: boolean,
    isSchoolManual: boolean
  ) => {
    try {
      setVerificationStatus('loading');
      console.log('🚀 Starting verification process...');

      // Clear any existing verification data
      sessionStorage.removeItem('stbVerificationData');

      // Get and validate checkout details
      const storedDetails = sessionStorage.getItem('stbCheckoutDetails');
      console.log('🔍 Retrieved checkout details:', storedDetails);
      
      if (!storedDetails) {
        throw new Error('Checkout details not found');
      }

      const userDetails = JSON.parse(storedDetails);
      console.log('📋 Parsed user details:', userDetails);
      
      // Validate required fields
      if (!userDetails.firstName || !userDetails.lastName || !userDetails.dateOfBirth) {
        throw new Error('Missing required user details');
      }

      // Calculate age
      const birthDate = new Date(userDetails.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      
      if (today.getMonth() < birthDate.getMonth() || 
         (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) {
        age--;
      }

      console.log('📅 Age calculation:', { age, birthDate, today });

      // Handle underage case
      if (age <= 17) {
        const manualData = {
          firstName: userDetails.firstName,
          middleName: userDetails.middleName || '',
          lastName: userDetails.lastName,
          email: userDetails.email,
          dateOfBirth: userDetails.dateOfBirth,
          mobile: userDetails.mobile || '',
          college: schoolIdentifier,
          consentGiven,
          verificationStatus: 'Manual',
          verificationDate: new Date().toISOString(),
          age
        };

        console.log('📝 Attempting to store manual data:', manualData);

        try {
          // Store data synchronously
          sessionStorage.setItem('stbVerificationData', JSON.stringify(manualData));
          
          // Verify storage immediately
          const storedData = sessionStorage.getItem('stbVerificationData');
          if (!storedData) {
            throw new Error('Failed to verify stored data');
          }

          const parsedStoredData = JSON.parse(storedData);
          console.log('✅ Manual data stored successfully:', parsedStoredData);

          // Set status before navigation
          setVerificationStatus('manual_required');
          
          // Ensure all state updates are complete before navigation
          await new Promise(resolve => setTimeout(resolve, 100));
          
          console.log('🔄 Redirecting to upload docs...');
          navigate('/checkout/upload-docs');
          return;

        } catch (storageError) {
          console.error('❌ Storage error:', storageError);
          throw new Error(`Failed to store verification data: ${storageError.message}`);
        }
      }

      // Continue with verification for 18+
      const token = sessionStorage.getItem('authToken') || '';
      const verificationResponse = await verificationService.verifyStudent(token, userDetails);

      // Check for status 'F' in any enrollment data
      const isVerified = verificationResponse.enrollmentDetails?.some(enrollment => 
        enrollment.enrollmentData?.some(record => 
          record.enrollmentStatus?.trim().toUpperCase() === 'F'
        )
      ) ?? false;

      if (isVerified) {
        // Only make Zoho API call for verified students
        await zohoCRM.createStudentRecord({
          ...userDetails,
          automaticVerification: 'Verified',
          verificationResponse,
          verificationDate: new Date().toISOString(),
          college: schoolIdentifier,
          consentGiven
        }, {
          amount: 0,
          date: new Date().toISOString(),
          id: '',
          transactionId: ''
        });
        setVerificationStatus('success');
        navigate('/checkout/confirmation/success');
      } else {
        // Store data for later submission
        sessionStorage.setItem('stbVerificationData', JSON.stringify({
          ...userDetails,
          college: schoolIdentifier,
          consentGiven,
          verificationResponse,
          verificationStatus: 'Failed',
          age
        }));
        setVerificationStatus('manual_required');
        navigate('/checkout/upload-docs');
      }

    } catch (error) {
      console.error('❌ Verification error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Verification failed');
      setVerificationStatus('error');
    }
  };

  const handleCompleteAndGoHome = () => {
    // Clear all verification data
    sessionStorage.removeItem('stbVerificationData');
    sessionStorage.removeItem('stbCheckoutDetails');
    navigate('/');
  };

  const handleProceedToManualUpload = () => {
    setVerificationStatus('manual_required');
    navigate('/checkout/upload-docs');
  };

  return {
    verificationStatus,
    errorMessage,
    handleVerification,
    handleCompleteAndGoHome,
    handleProceedToManualUpload
  };
};
