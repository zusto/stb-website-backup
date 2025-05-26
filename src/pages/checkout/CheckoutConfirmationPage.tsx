import React, { useEffect, useState } from 'react';
import CheckoutLayout from '@/components/checkout/CheckoutLayout';
import { useLocation, Link } from 'react-router-dom';
import { Heart, Globe, Plane, PartyPopper, MailCheck, FileCheck } from 'lucide-react';
import type { VerificationData } from '@/types/checkout';
const CheckoutConfirmationPage = () => {
  const location = useLocation();
  const [userName, setUserName] = useState<string | null>(null);
  const [submissionMethod, setSubmissionMethod] = useState<'upload' | 'emailLater' | null>(null);

  // The image path provided by user upload - success state
  const sunnyMascotImageSuccess = "/lovable-uploads/e01b4658-0123-4f89-8570-6ac27d5408fa.png";
  // The new image path for manual review state
  const sunnyMascotImageManualReview = "/lovable-uploads/c00b5409-2e1c-406c-bddb-742712f51270.png";
  let verificationStatusPath: 'success' | 'manual_required' = 'manual_required'; // Default
  if (location.pathname.endsWith('/success')) {
    verificationStatusPath = 'success';
  } else if (location.pathname.endsWith('/manual')) {
    verificationStatusPath = 'manual_required';
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    const verificationDataString = sessionStorage.getItem('stbVerificationData');
    if (verificationDataString) {
      try {
        const verificationData: VerificationData = JSON.parse(verificationDataString);
        if (verificationData.firstName) {
          setUserName(verificationData.firstName);
          console.log("CheckoutConfirmationPage - User name set:", verificationData.firstName);
        } else {
          console.log("CheckoutConfirmationPage - No firstName found in stbVerificationData.");
        }
      } catch (error) {
        console.error("Error parsing verification data from session storage:", error);
        setUserName(null);
      }
    } else {
      console.log("CheckoutConfirmationPage - No stbVerificationData found in session storage.");
    }

    // Check for submission method from URL params for manual review
    if (verificationStatusPath === 'manual_required') {
      const params = new URLSearchParams(location.search);
      const method = params.get('method');
      if (method === 'upload' || method === 'emailLater') {
        setSubmissionMethod(method);
        console.log("CheckoutConfirmationPage - Submission method set:", method);
      } else {
        setSubmissionMethod('upload'); // Default to 'upload' if param is missing or invalid for manual path
        console.log("CheckoutConfirmationPage - Submission method defaulted to 'upload' for manual path.");
      }
    }
    // The data in stbVerificationData is kept for potential API calls as per requirements.
  }, [location.pathname, location.search, verificationStatusPath]);
  const confettiPieces = Array.from({
    length: 20
  }).map((_, i) => {
    const colors = ["#FCE1F1", "#FFDD4D", "#6EE7B7", "#FCA5A5", "#93C5FD"];
    return {
      left: `${Math.random() * 90 + 5}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 2 + 3}s`,
      color: colors[i % colors.length]
    };
  });
  if (verificationStatusPath === 'success') {
    return <CheckoutLayout currentStep={4} totalSteps={4}>
        <style>{`
          @keyframes fall { 
            to { transform: translateY(100vh) rotate(360deg); opacity: 0; } 
          }
          .confetti-piece { 
            position: absolute; 
            width: 8px; height: 8px;
            background: var(--c, #fff); 
            opacity: .8;
            top: -20px; 
            left: var(--x); 
            animation: fall var(--d, 4s) linear var(--dl, 0s) infinite; 
          }
        `}</style>
        <section className="py-12 md:py-24 relative">
          {confettiPieces.map((p, i) => <div key={i} className="confetti-piece" style={{
          '--x': p.left,
          '--c': p.color,
          '--d': p.duration,
          '--dl': p.delay
        } as React.CSSProperties}></div>)}
          
          <div className="bg-gradient-to-br from-[#FFF9E5] to-[#FCE1F1] p-6 md:p-10 rounded-xl shadow-xl border border-sunny-orange-light/50">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6 px-4 relative z-10 text-center">
              
              <div className="text-4xl md:text-5xl font-bold text-[#0EAD69] flex items-center justify-center">
                Verified! <PartyPopper className="ml-2 h-10 w-10 text-yellow-400" />
              </div>

              <img src={sunnyMascotImageSuccess} width="280" alt="Sunny celebrating" className="max-w-[200px] md:max-w-[280px] my-3 md:my-4" />
              
              <div className="max-w-lg text-midnight">
                <h1 className="text-2xl md:text-3xl font-bold leading-tight mt-2">
                  {userName ? `${userName}, w` : 'W'}elcome aboard Student Travel Buddy!
                </h1>
                <p className="mt-4 text-md md:text-lg">
                  Sunny is generating your digital ISIC right now.
                  Keep an eye on your email — and peek at spam just in case — for login instructions and your welcome letter.
                </p>
                <div className="flex items-center justify-center gap-3 mt-5 text-midnight">
                  <Heart size={20} />
                  <Plane size={20} />
                  <Globe size={20} />
                </div>
                <Link to="/" className="mt-8 md:mt-10 inline-block bg-sunny-orange text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-sunny-orange-dark transition-colors">
                  All set! Go to Homepage
                </Link>
              </div>
            </div>
          </div>
        </section>
      </CheckoutLayout>;
  }

  // Manual Review or any other status (derived from URL path)
  return <CheckoutLayout currentStep={4} totalSteps={4}>
      <section className="py-12 md:py-24 relative">
        <div className="bg-gradient-to-br from-[#FFF9E5] to-[#FCE1F1] p-6 md:p-10 rounded-xl shadow-xl border border-sunny-orange-light/50">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10 px-2 md:px-6 text-center md:text-left">
            <img src={sunnyMascotImageManualReview} width="200" alt="Sunny waiting" className="max-w-[180px] md:max-w-[250px]" />
            <div className="max-w-md text-midnight">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                {submissionMethod === 'upload'}
                {submissionMethod === 'emailLater' && <MailCheck className="h-8 w-8 text-blue-500" />}
                <h1 className="text-3xl md:text-4xl font-bold leading-tight text-sunny-orange-dark">
                  Hang tight{userName ? `, ${userName}` : ''} – Sunny’s on it! ☀️
                </h1>
              </div>

              {submissionMethod === 'upload' && <>
                  <p className="mt-4 text-md md:text-lg">
                    We've received your document and are double-checking your student proof. Expect an update within <b>48 hours</b>. 
                    We’ll ping the inbox & phone you used at checkout the second you’re cleared.
                  </p>
                  <ul className="list-disc list-inside md:list-outside ml-0 md:ml-6 space-y-2 mt-6 text-left">
                    <li>No action needed right now.</li>
                    <li>Need it faster? Reply to the confirmation e-mail with “URGENT – FLIGHT”.</li>
                    <li>Messed up your file upload? Use the link in that e-mail to replace it.</li>
                  </ul>
                </>}

              {submissionMethod === 'emailLater' && <>
                  <p className="mt-4 text-md md:text-lg">You've chosen to email your document. We'll send you an email shortly with instructions on how to submit your verification documents. You can reply directly to that email with your document attached.</p>
                  <p className="mt-3 text-md md:text-lg">
                    Alternatively, if you prefer or if you don't receive our email, please send your document to <strong className="font-semibold">verifications@studenttravelbuddy.com</strong>. Make sure to include your <strong className="font-semibold">full name</strong> in the subject line or body of the email.
                  </p>
                  <p className="mt-3 text-md md:text-lg">
                    Accepted documents include a student ID (front and back, showing expiry) or an enrollment letter. We’ll process it and ping the inbox & phone you used at checkout the second you’re cleared, typically within <b>48 hours</b> of receiving your email.
                  </p>
                  <ul className="list-disc list-inside md:list-outside ml-0 md:ml-6 space-y-2 mt-6 text-left">
                    <li>Remember to send your document within 48 hours to avoid delays.</li>
                    <li>Need it faster once sent? Reply to the confirmation e-mail with “URGENT – FLIGHT”.</li>
                  </ul>
                </>}
              
              <p className="mt-6 text-sm italic">Our sales are final. If a doc fails, we’ll guide you to resubmit until approved.</p>
               <Link to="/" className="mt-8 md:mt-10 inline-block bg-sunny-orange text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-sunny-orange-dark transition-colors">
                  Okay, Go to Homepage
                </Link>
            </div>
          </div>
        </div>
      </section>
    </CheckoutLayout>;
};
export default CheckoutConfirmationPage;