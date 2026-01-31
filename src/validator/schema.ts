import { z } from 'zod';

const SignupSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string(),
  role: z.enum(['USER', 'SERVICE_PROVIDER']),
});

const LoginSchema = z.object({
  email: z.email(),
  password: z.string(),
});

const CreateServiceSchema = z.object({
    name: z.string(),
    type: z.enum(['MEDICAL','HOUSE_HELP','BEAUTY','FITNESS','EDUCATION', 'OTHER']),
    durationMinutes: z.number()
});

const SetAvailabilitySchema = z.object({
    dayOfWeek: z.number().min(0).max(6),
    startTime: z.iso.time(),
    endTime: z.iso.time()
});

export const schemas = {
    SignupSchema,
    LoginSchema,
    CreateServiceSchema,
    SetAvailabilitySchema
}