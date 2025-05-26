
import * as z from 'zod';

export const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required").refine(val => {
    const date = new Date(val);
    const today = new Date();
    today.setHours(0,0,0,0); // Compare dates only
    return date < today;
  }, "Date of birth must be in the past."),
  email: z.string().email("Invalid email address"),
  mobile: z.string().optional(),
  isStudent: z.boolean().refine(val => val === true, "You must confirm you are a full-time student."),
  agreedToTerms: z.boolean().refine(val => val === true, "You must agree to the Terms & Conditions and Privacy Policy."),
});

export type BasicDetailsFormValues = z.infer<typeof formSchema>;
