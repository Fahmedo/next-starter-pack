import { z } from 'zod';

/** Example reusable schemas. Add feature schemas next to this file. */
export const emailSchema = z.email('Enter a valid email address');

export const requiredString = (label = 'This field') => z.string().min(1, `${label} is required`);

export const contactFormSchema = z.object({
  name: requiredString('Name'),
  email: emailSchema,
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
