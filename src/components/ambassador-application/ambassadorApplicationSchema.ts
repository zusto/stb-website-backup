
import * as z from 'zod';

export const MAX_FILE_SIZE_MB = 5;
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
export const ACCEPTED_FILE_TYPES = ["application/pdf"];

export const ambassadorApplicationSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  mobile: z.string().min(10, { message: "Mobile number seems too short." }),
  birthday: z.string().regex(/^\d{2}-\d{2}-\d{4}$/, { message: "Birthday must be DD-MM-YYYY." })
    .refine(val => {
      const [day, month, year] = val.split('-').map(Number);
      const date = new Date(year, month - 1, day);
      const ageDiffMs = Date.now() - date.getTime();
      const ageDate = new Date(ageDiffMs);
      return Math.abs(ageDate.getUTCFullYear() - 1970) >= 18;
    }, { message: "You must be at least 18 years old." }),
  homeBaseUS: z.string().min(2, { message: "Please enter your home base." }),
  collegeUniversity: z.string().min(2, { message: "Please enter your college/university." }),
  abroadLocation: z.string().min(2, { message: "Please enter your abroad location." }),
  guideLocation: z.boolean().default(false),
  preferredDestinations: z.string().optional(),
  resume: z.any()
    .refine(files => files?.length > 0, "Resume is required.")
    .refine(files => files?.[0]?.size <= MAX_FILE_SIZE_BYTES, `Max file size is ${MAX_FILE_SIZE_MB}MB.`)
    .refine(files => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type), "Only .pdf files are accepted."),
  pitch: z.string().min(10, { message: "Pitch is too short." }).max(1500, { message: `Pitch must be 250 words or less (approx 1500 chars).` }),
  payoutMethod: z.string().min(2, { message: "Please specify payout method and details." }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and privacy policy." }),
  leadSource: z.string().optional(), // Hidden
  instagramHandle: z.string().optional(),
  tiktokHandle: z.string().optional(),
  youtubeLink: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success, { message: "Invalid YouTube URL." }),
  hoursCommitment: z.string().min(1, { message: "Please specify commitment hours." }),
  languagesSpoken: z.string().min(2, { message: "Please list languages." }),
  portfolioLink: z.string().optional().refine(val => !val || z.string().url().safeParse(val).success, { message: "Invalid portfolio URL." }),
  howHeard: z.string().min(2, { message: "Please let us know how you heard about us." }),
  pastGigs: z.string().optional(),
  preferredChat: z.string().min(2, { message: "Please specify preferred chat channel." }),
}).refine(data => data.guideLocation || (data.preferredDestinations && data.preferredDestinations.length > 0), {
  message: "If not guiding current abroad location, please specify preferred destinations.",
  path: ["preferredDestinations"],
});

export type AmbassadorFormValues = z.infer<typeof ambassadorApplicationSchema>;

