import { z } from 'zod';

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpeg'];

const baseSchema = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .refine((val) => /^[A-Z]/.test(val), {
      message: 'First letter must be uppercase',
    }),

  age: z
    .number()
    .min(0, 'Age must be a non-negative number')
    .int('Age must be a whole number'),

  email: z
    .string()
    .min(1, 'Email is required')
    .refine(
      (val) => {
        const parts = val.split('@');
        if (parts.length !== 2) return false;
        const [local, domain] = parts;
        return !!local && !!domain && domain.includes('.');
      },
      { message: 'Invalid email format' }
    ),

  gender: z.string().min(1, 'Gender is required'),

  acceptedTerms: z
    .boolean()
    .refine((val) => val === true, { message: 'You must accept terms' }),

  password: z.string().min(1, 'Password is required'),
  confirmPassword: z.string().min(1, 'Confirm password is required'),
  country: z.string().min(1, 'Country is required'),
});

export const uncontrolledSchema = baseSchema
  .extend({
    image: z
      .instanceof(File, { message: 'Image is required' })
      .refine(
        (file) => ALLOWED_IMAGE_TYPES.includes(file.type),
        'Only png or jpeg allowed'
      )
      .refine(
        (file) => file.size <= MAX_IMAGE_SIZE,
        'Image must be less than 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export const rhfSchema = baseSchema
  .extend({
    image: z
      .any()
      .refine(
        (files) => files instanceof FileList && files.length > 0,
        'Image is required'
      )
      .refine(
        (files) =>
          files instanceof FileList &&
          ALLOWED_IMAGE_TYPES.includes(files[0]?.type),
        'Only png or jpeg allowed'
      )
      .refine(
        (files) =>
          files instanceof FileList &&
          files[0]?.size <= MAX_IMAGE_SIZE,
        'Image must be less than 2MB'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type RHFFormData = z.infer<typeof rhfSchema>;