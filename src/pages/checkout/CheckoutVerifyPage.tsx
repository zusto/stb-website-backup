import React, { useEffect, useState } from 'react';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Loader2 } from 'lucide-react';
import VerificationConsentCheckbox from '@/components/checkout/verification/VerificationConsentCheckbox';
import VerificationStatusDisplay from '@/components/checkout/verification/VerificationStatusDisplay';
import { useSchoolsList } from '@/hooks/useSchoolsList';
import { useVerification } from '@/hooks/useVerification';
import { ComboSchoolField } from '@/components/checkout/verification/ComboSchoolField';
import { Label } from '@/components/ui/label';
import VerificationAnimation from '@/components/checkout/verification/VerificationAnimation';
import { useToast } from '@/components/ui/use-toast';

const CheckoutVerifyPage = () => {
  const [schoolIdentifier, setSchoolIdentifier] = useState<string>(""); // Will store OPEID or manual text
  const [isSchoolManual, setIsSchoolManual] = useState<boolean>(false);
  const [consentGiven, setConsentGiven] = useState<boolean>(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationDetails, setAnimationDetails] = useState<{
    isSuccess: boolean;
    message: string;
  } | null>(null);

  const { schoolsList, isLoadingSchools, schoolsError } = useSchoolsList();
  const {
    verificationStatus,
    errorMessage,
    handleVerification,
    handleCompleteAndGoHome,
    handleProceedToManualUpload, 
  } = useVerification();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await handleVerification(schoolIdentifier, consentGiven, isSchoolManual);

      // Handle animation based on status
      if (verificationStatus === "success") {
        setAnimationDetails({
          isSuccess: true,
          message: "Great! Your student status has been verified."
        });
        setShowAnimation(true);
        setTimeout(() => handleCompleteAndGoHome(), 2000);
      } else if (verificationStatus === "manual_required") {
        setAnimationDetails({
          isSuccess: false,
          message: "We couldn't verify your student status automatically. You'll need to upload documents."
        });
        setShowAnimation(true);
        setTimeout(() => handleProceedToManualUpload(), 2000);
      }
    } catch (error) {
      console.error('Verification error:', error);
    }
  };

  const isSubmitDisabled = 
    verificationStatus === "loading" || 
    isLoadingSchools || 
    !schoolIdentifier || 
    !consentGiven ||
    !!schoolsError;

  return (
    <CheckoutLayout currentStep={3} totalSteps={4}>
      <div className="text-center max-w-lg mx-auto">
        <ShieldCheck className="h-16 w-16 text-green-500 mx-auto mb-6" />
        <h1 className="text-3xl font-display text-sunny-orange-dark mb-2">
          Step 3: Verify Your Student Status
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Flash Your Student Creds ☀️. Select or enter your institution and consent to verification.
        </p>

        <VerificationStatusDisplay
          status={verificationStatus}
          errorMessage={errorMessage}
          isLoadingSchools={isLoadingSchools} // Pass these down if VerificationStatusDisplay needs them
          schoolsError={schoolsError}
        />
        
        {verificationStatus !== "success" && verificationStatus !== "manual_required" && (
          <form onSubmit={handleSubmit} className="space-y-6 text-left"> {/* Changed to text-left for label alignment */}
            <div>
              <Label htmlFor="school-combobox">Select or type your School/College <span className="text-red-500">*</span></Label>
              <ComboSchoolField
                identifier={schoolIdentifier}
                isManual={isSchoolManual}
                onIdentifierChange={setSchoolIdentifier}
                onIsManualChange={setIsSchoolManual}
                schools={schoolsList}
                isLoadingSchools={isLoadingSchools}
                schoolsError={schoolsError}
                disabled={verificationStatus === "loading"}
                placeholder="Select or type your school..."
              />
            </div>
            <VerificationConsentCheckbox
              isChecked={consentGiven}
              onCheckedChange={setConsentGiven}
              disabled={verificationStatus === "loading"}
            />
            <Button
              type="submit"
              className="w-full stb-button bg-sunny-orange hover:bg-sunny-orange-dark text-white"
              size="lg"
              disabled={isSubmitDisabled}
            >
              {verificationStatus === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Confirming your student status...
                </>
              ) : (
                'Verify Now'
              )}
            </Button>
          </form>
        )}
        
        {verificationStatus === "success" && (
          <>
            <Button 
              onClick={handleCompleteAndGoHome}
              className="w-full stb-button bg-green-500 hover:bg-green-600 text-white mt-6"
              size="lg"
            >
              Proceed to Confirmation
            </Button>
          </>
        )}

        {verificationStatus === "manual_required" && (
           <>
            <Button 
              onClick={handleProceedToManualUpload} 
              className="w-full stb-button bg-sunny-yellow hover:bg-sunny-yellow-dark text-midnight mt-6"
              size="lg"
            >
              Proceed to Document Upload
            </Button>
           </>
        )}

        <p className="text-sm text-gray-500 mt-6">
          If you encounter any issues, please contact support.
        </p>
      </div>

      {showAnimation && animationDetails && (
        <VerificationAnimation
          isSuccess={animationDetails.isSuccess}
          message={animationDetails.message}
        />
      )}
    </CheckoutLayout>
  );
};

export default CheckoutVerifyPage;