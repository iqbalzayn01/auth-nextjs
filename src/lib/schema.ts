import { z } from 'zod';

export const roleEnum = z.enum(['admin', 'customer']);

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
  avatar: z.string().url().optional(),
});
