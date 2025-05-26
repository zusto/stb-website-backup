import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, PartyPopper } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface BasicDetails {
  dateOfBirth: string;
  // Add other fields if needed for future use
}

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedDetailsString = sessionStorage.getItem('stbCheckoutDetails');
    
    if (storedDetailsString) {
      try {
        const storedDetails: BasicDetails = JSON.parse(storedDetailsString);
        const birthDate = new Date(storedDetails.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        // Clear session storage after use, or decide if it's needed for verification step
        // For now, let's keep it for potential use in verification step.
        // sessionStorage.removeItem('stbCheckoutDetails');

        toast({
          title: "Payment Successful!",
          description: "Proceeding to student verification.",
        });
        
        // Age-based routing as per specification
        if (age >= 17) {
          navigate('/checkout/verify'); // Placeholder for NSC Verification
        } else {
          navigate('/checkout/upload-docs'); // Placeholder for Manual Docs Upload
        }
      } catch (e) {
        console.error("Error processing stored details on success page:", e);
        toast({
          title: "Error",
          description: "Could not process your details for the next step. Please contact support.",
          variant: "destructive"
        });
        // Fallback navigation if details processing fails
        navigate('/');
      }
    } else {
      // If no details found, maybe payment was initiated externally or session cleared
      // For now, just show success and offer to go home
      toast({
        title: "Payment Successful!",
        description: "Your payment was processed successfully.",
      });
    }
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <PartyPopper className="h-24 w-24 text-sunny-yellow mb-6 animate-bounce" />
        <h1 className="text-4xl font-display text-sunny-orange-dark mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-700 mb-8 max-w-md">
          Thank you for your purchase! We're processing your order.
        </p>
        <CheckCircle className="h-16 w-16 text-green-500 mb-8" />
        <p className="text-gray-600 mb-4">
          You will be redirected shortly to the next step. If not, please click below.
        </p>
        {/* The automatic navigation in useEffect should handle this, but providing a fallback. */}
        <div className="flex space-x-4">
            <Button onClick={() => navigate('/')} className="stb-button"> {/* Default to home if issues */}
                Continue to Next Step
            </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
