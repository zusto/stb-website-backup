import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

import { formSchema, BasicDetailsFormValues } from './form/basicDetailsSchema';
import NameFields from './form/fields/NameFields';
import LastNameField from './form/fields/LastNameField';
import DateOfBirthField from './form/fields/DateOfBirthField';
import EmailField from './form/fields/EmailField';
import MobileField from './form/fields/MobileField';
import StudentConfirmationField from './form/fields/StudentConfirmationField';
import TermsAgreementField from './form/fields/TermsAgreementField';

const BasicDetailsForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<BasicDetailsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      mobile: '',
      isStudent: false,
      agreedToTerms: false,
    },
  });

    // Load saved data on mount
  useEffect(() => {
    const savedData = sessionStorage.getItem('stbCheckoutDetails');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        console.log('📝 Loading saved form data:', parsedData);
        
        // Reset form with saved values
        form.reset(parsedData);
      } catch (error) {
        console.error('❌ Error loading saved data:', error);
        toast({
          title: "Warning",
          description: "Could not load your previous details.",
          variant: "destructive",
        });
      }
    }
  }, [form, toast]);

  const onSubmit: SubmitHandler<BasicDetailsFormValues> = async (data) => {
    try {
      // Save to session storage
      sessionStorage.setItem('stbCheckoutDetails', JSON.stringify(data));

      // Submit to Zoho CRM
      try {
        await axios.post('https://studenttravelbuddy.com/api/intakes/submit', {
          First_Name: data.firstName,
          Middle_Name: data.middleName || '',
          Last_Name: data.lastName,
          Date_of_Birth: data.dateOfBirth,
          Email: data.email,
          Mobile: data.mobile,
          Submission_Date: new Date().toISOString(),
          Lead_Source: 'ISIC Card Application'
        });
      } catch (apiError) {
        console.error('Zoho API submission error:', apiError);
      }

      // Continue to payment regardless of API result
      navigate('/checkout/payment');
    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Warning",
        description: "There was an error saving your details, but you can continue to payment.",
        variant: "destructive",
      });
      navigate('/checkout/payment');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-200">
        <NameFields control={form.control} />
        <LastNameField control={form.control} />
        <DateOfBirthField control={form.control} />
        <EmailField control={form.control} />
        <MobileField control={form.control} />
        <StudentConfirmationField control={form.control} />
        <TermsAgreementField control={form.control} />

        <Button type="submit" className="w-full stb-button text-lg py-3">
          Continue to Payment
        </Button>
      </form>
    </Form>
  );
};

export default BasicDetailsForm;
