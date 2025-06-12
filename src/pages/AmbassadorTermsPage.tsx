
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import WaveDivider from '@/components/WaveDivider';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AmbassadorTermsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Link 
            to="/ambassador-application" 
            className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#fe4c02] mb-8 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Ambassador Application
          </Link>
          
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 border border-amber-200">
            <h1 className="text-3xl md:text-4xl font-display text-[#F97316] mb-8 text-center">
              Ambassador Terms & Conditions
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Organized by:</strong> CKM SYTS, a non-profit organization registered in the Slovak Republic, 
                  with its seat at Vysoká 32, 81106 Bratislava, ID No. ICO 317 681 64, registered with the Slovak 
                  registry ("Organizer", "We", "Us").
                </p>
                <p className="text-gray-700">
                  These Terms and Conditions govern participation in our Ambassador Reward Program ("Program") 
                  operated via Rewardful (or another compatible platform such as Stripe) for individuals who 
                  refer ISIC card sales.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#F97316] mb-4">1. Eligibility</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Participants ("Ambassadors") must be individuals at least 18 years old, residing outside of Slovakia.</li>
                  <li>By signing up, you confirm that you are eligible and agree to be bound by these Terms.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#F97316] mb-4">2. Reward Structure</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ambassadors will earn $50 USD for every 10 successfully referred ISIC card purchases completed through their unique referral link.</li>
                  <li>Only confirmed and paid transactions will count toward the reward calculation.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#F97316] mb-4">3. Payment Terms</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Payments will be made via Stripe, PayPal, or another secure payment processor that complies with international payout regulations.</li>
                  <li>All Ambassadors must provide valid payment and identification details, which may include tax or bank verification, depending on jurisdiction.</li>
                  <li>Rewards are typically processed within 15 business days after the threshold (10 cards) is reached and verified.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-[#F97316] mb-4">4. Taxation and Legal Compliance</h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Ambassadors are solely responsible for reporting and paying any applicable income taxes or social contributions in their country of residence.</li>
                  <li>The Organizer, as a Slovak non-profit, is exempt from VAT on these transactions and reports disbursements as expenses for promotional and outreach activities under Slovak law.</li>
                  <li>The Organizer does not withhold taxes for Ambassadors residing outside Slovakia but may report total disbursements to Slovak authorities if required by law.</li>
                  <li>We reserve the right to require a signed declaration of income receipt or tax residency status if mandated by applicable Slovak regulations.</li>
                </ul>
              </section>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mt-8">
                <p className="text-sm text-gray-600 text-center">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 text-center mt-2">
                  By participating in the Ambassador Program, you acknowledge that you have read, 
                  understood, and agree to be bound by these Terms and Conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <WaveDivider />
      <Footer />
    </div>
  );
};

export default AmbassadorTermsPage;