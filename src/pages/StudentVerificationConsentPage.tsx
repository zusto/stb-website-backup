
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const StudentVerificationConsentPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-md">
          <Link to="/checkout/verify" className="inline-flex items-center text-sm text-sunny-orange hover:text-sunny-orange-dark mb-6">
            <ArrowLeft size={18} className="mr-1" />
            Back to Verification Step
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-sunny-orange-dark mb-6">
            Student-Status Verification Consent
          </h1>
          
          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
            <h2 className="text-xl font-semibold text-midnight mb-2">1. Student-Status Verification</h2>
            
            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.1 Authorisation</h3>
            <p>
              By completing your purchase you authorise CKM SYTS s.r.o., d/b/a Student Travel Buddy (“STB”) 
              to transmit the personal data you provide (first name, middle name, last name, date of birth 
              and selected school) to the National Student Clearinghouse® (“NSC”) for the sole purpose of 
              verifying your current full-time student status.
            </p>

            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.2 NSC & ISIC Interaction</h3>
            <p>
              The NSC acts as the authorised agent of your educational institution. STB will use the NSC response only:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                (a) to confirm your eligibility for STB membership and related student-discount services, and
              </li>
              <li>
                (b) to transmit your name, date of birth, purchase date, ISIC card number and “verified” status 
                to the ISIC Association (or its technical service provider) for the sole purpose of issuing 
                and managing your International Student Identity Card (ISIC).
              </li>
            </ul>
            <p className="mt-2">
              STB will not use NSC data for credit, employment, insurance or any other decision regulated by 
              the U.S. Fair Credit Reporting Act (“FCRA”), nor will STB resell or disclose NSC data to any 
              party except ISIC as described above.
            </p>

            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.3 Data handling & retention</h3>
            <p>
              STB stores the verification request and result in its customer-relationship system for 
              compliance and audit purposes. STB does not resell, re-disclose or aggregate NSC data for 
              any other party. For details on how STB protects your information, see our Privacy and 
              Data Protection Notice.
            </p>

            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.4 If verification fails</h3>
            <p>
              If the NSC cannot confirm your full-time status, STB will notify you and outline acceptable 
              alternative documents (e.g. current semester transcript, enrolment letter, student ID with 
              expiry date). You may upload new documents at no extra cost until verification succeeds. 
              The membership fee remains non-refundable while verification is pending.
            </p>

            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.5 Dispute process</h3>
            <p>
              You have the right to dispute the accuracy of any information returned by the NSC. 
              To do so, contact us at <a href="mailto:hello@studenttravelbuddy.com" className="text-sunny-orange hover:underline">hello@studenttravelbuddy.com</a> and we will forward the dispute 
              to the NSC in accordance with § 8 of our Verification Services Agreement.
            </p>

            <h3 className="text-lg font-medium text-midnight mt-4 mb-1">1.6 Your rights under the FCRA</h3>
            <p>
              Before completing your purchase, please review the U.S. “Summary of Your Rights Under the FCRA,” 
              available <a href="https://www.consumer.ftc.gov/sites/default/files/articles/pdf/pdf-0111-fair-credit-reporting-act.pdf" target="_blank" rel="noopener noreferrer" className="text-sunny-orange hover:underline">here</a>. 
              By proceeding you acknowledge receipt of that notice.
            </p>

            <p className="mt-6">
              For all other terms that govern your membership, see the <Link to="/terms-and-conditions" className="text-sunny-orange hover:underline">Terms & Conditions</Link>. 
              {/* Assuming a general T&C page might exist or be created later at /terms-and-conditions */}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StudentVerificationConsentPage;
