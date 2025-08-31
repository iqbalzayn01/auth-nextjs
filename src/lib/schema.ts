import { z } from 'zod';

export const ALLOW_MIME_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
export const ALLOWED_ZIP_TYPES = [
  'application/zip',
  'application/x-zip-compressed',
];
export const roleEnum = z.enum(['admin', 'customer']);
export const productStatusEnum = z.enum(['draft', 'published', 'archived']);

export const loginSchema = z.object({
  email: z
    .email({ error: 'Invalid email & password' })
    .min(1, 'Email is required'),
  password: z
    .string({ error: 'Invalid email & password' })
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

export const signupSchema = loginSchema.extend({
  name: z
    .string({ error: 'Invalid name' })
    .min(3, 'Name must be at least 3 characters'),
});

export const userSchema = z.object({
  name: z.string().min(1),
  email: z.email(),
  role: roleEnum,
  avatar: z.url().optional(),
});

export const productSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  status: productStatusEnum.default('draft'),
  images: z
    .any()
    .refine((files: File[]) => files.length === 3, {
      message: 'Please upload 3 image product',
    })
    .refine(
      (files: File[]) => {
        let validate = false;

        Array.from(files).find((file) => {
          validate = ALLOW_MIME_TYPES.includes(file.type);
        });

        return validate;
      },
      {
        message: 'Uploaded file should image',
      }
    ),
});

export const updateProductSchema = productSchema
  .extend({
    id: z.uuid('Invalid product ID'),
  })
  .omit({ images: true });
