import React, { useState } from 'react';
import { useForm, FormProvider as Form } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { ambassadorApplicationSchema, AmbassadorFormValues } from './ambassadorApplicationSchema';

// Import new field components
import FullNameField from './fields/FullNameField';
import AmbassadorEmailField from './fields/AmbassadorEmailField';
import AmbassadorMobileField from './fields/AmbassadorMobileField';
import BirthdayField from './fields/BirthdayField';
import HomeBaseUSField from './fields/HomeBaseUSField';
import CollegeUniversityField from './fields/CollegeUniversityField';
import AbroadLocationField from './fields/AbroadLocationField';
import GuideLocationCheckbox from './fields/GuideLocationCheckbox';
import PreferredDestinationsField from './fields/PreferredDestinationsField';
import ResumeUploadField from './fields/ResumeUploadField';
import PitchField from './fields/PitchField';
import PayoutMethodField from './fields/PayoutMethodField';
import LeadSourceHiddenField from './fields/LeadSourceHiddenField';
import InstagramHandleField from './fields/InstagramHandleField';
import TiktokHandleField from './fields/TiktokHandleField';
import YoutubeLinkField from './fields/YoutubeLinkField';
import HoursCommitmentField from './fields/HoursCommitmentField';
import LanguagesSpokenField from './fields/LanguagesSpokenField';
import PortfolioLinkField from './fields/PortfolioLinkField';
import HowHeardField from './fields/HowHeardField';
import PastGigsField from './fields/PastGigsField';
import PreferredChatField from './fields/PreferredChatField';
import AgreeToTermsCheckbox from './fields/AgreeToTermsCheckbox';

const AmbassadorApplicationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<AmbassadorFormValues>({
    resolver: zodResolver(ambassadorApplicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      mobile: "",
      birthday: "",
      homeBaseUS: "",
      collegeUniversity: "",
      abroadLocation: "",
      guideLocation: false,
      preferredDestinations: "",
      pitch: "",
      payoutMethod: "",
      agreeToTerms: false,
      leadSource: "website-ambassador-form", // This can be set based on URL params or other logic if needed
      instagramHandle: "",
      tiktokHandle: "",
      youtubeLink: "",
      hoursCommitment: "",
      languagesSpoken: "",
      portfolioLink: "",
      howHeard: "",
      pastGigs: "",
      preferredChat: "",
    },
  });

  const watchGuideLocation = form.watch("guideLocation");

  const onSubmit = async (data: AmbassadorFormValues) => {
    try {
      setIsSubmitting(true);
      
      const response = await axios.post('https://studenttravelbuddy.com/api/ambassador/apply', data);

      if (response.data.success) {
        setIsSubmitted(true); // Show thank you message
        form.reset();
      }

    } catch (error) {
      console.error('❌ Submission error:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center py-10 px-6 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-xl text-white">
          <h2 className="text-3xl font-bold mb-3">
            Thank You!
          </h2>
          <p className="text-lg mb-6">
            Thank you for applying to become part of The Sunshine Leaders!
          </p>
          <p className="text-md">
            We will respond within 48hrs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 md:p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-xl shadow-2xl border-2 border-amber-400">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-[#F97316] font-display">Ambassador Application</h1>
        <p className="text-gray-600">Join The Sunshine Leaders and inspire student travel!</p>
      </div>
      
      {/* Add Form Provider here */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FullNameField control={form.control} />
          <AmbassadorEmailField control={form.control} />
          <AmbassadorMobileField control={form.control} />
          <BirthdayField control={form.control} />
          <HomeBaseUSField control={form.control} />
          <CollegeUniversityField control={form.control} />
          <AbroadLocationField control={form.control} />
          
          <GuideLocationCheckbox control={form.control} />

          {!watchGuideLocation && ( <PreferredDestinationsField control={form.control} /> )}

          <ResumeUploadField control={form.control} />
          <PitchField control={form.control} />
          <PayoutMethodField control={form.control} />
          
          <LeadSourceHiddenField control={form.control} />

          <h2 className="text-xl font-semibold text-[#F97316] pt-4 border-t border-amber-300/70 mt-6 flex items-center">
             Shine Online! (Optional)
          </h2>
          <InstagramHandleField control={form.control} />
          <TiktokHandleField control={form.control} />
          <YoutubeLinkField control={form.control} />
          
          <h2 className="text-xl font-semibold text-[#F97316] pt-4 border-t border-amber-300/70 mt-6 flex items-center">
             More About You
          </h2>
          <HoursCommitmentField control={form.control} />
          <LanguagesSpokenField control={form.control} />
          <PortfolioLinkField control={form.control} />
          <HowHeardField control={form.control} />
          <PastGigsField control={form.control} />
          <PreferredChatField control={form.control} />

          <AgreeToTermsCheckbox control={form.control} />

          <Button 
            type="submit"
            disabled={isSubmitting} 
            className="w-full bg-gradient-to-r from-[#F97316] to-[#fe4c02] text-white font-bold text-lg py-3 rounded-lg hover:brightness-110 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mt-8"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </div>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AmbassadorApplicationForm;
