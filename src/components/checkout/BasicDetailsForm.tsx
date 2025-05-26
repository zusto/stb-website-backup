
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from "@/components/ui/form";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

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

  const onSubmit: SubmitHandler<BasicDetailsFormValues> = (data) => {
    console.log('Form data:', data);
    try {
        sessionStorage.setItem('stbCheckoutDetails', JSON.stringify(data));
        
        const birthDate = new Date(data.dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        toast({
          title: "Details Saved",
          description: "Proceeding to payment.",
        });
        navigate('/checkout/payment'); 
    } catch (error) {
        console.error("Failed to save to session storage:", error);
        toast({
            title: "Error",
            description: "Could not save your details. Please try again.",
            variant: "destructive",
        });
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
