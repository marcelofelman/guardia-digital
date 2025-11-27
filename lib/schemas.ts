import { z } from 'zod';
import { SERVICES } from '@/data/services';

export const solicitudSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  country: z.string().min(2, {
    message: "Please select a country.",
  }),
  serviceType: z.enum(SERVICES.map(s => s.asunto) as [string, ...string[]]),
  description: z.string().min(1, {
    message: "Please provide a description.",
  }).max(320, {
    message: "Description must not be longer than 320 characters.",
  }),
  urgency: z.enum(['Alta','Media','Baja']),
  acceptPrivacy: z.literal(true, {
    message: "You must accept the privacy policy.",
  }),
});
