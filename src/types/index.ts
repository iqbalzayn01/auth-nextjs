import { loginSchema, signupSchema, userSchema } from '@/lib/schema';
import z from 'zod';

export type ActionResult = {
  error: string;
  success?: string;
};

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof signupSchema>;
export type UserType = z.infer<typeof userSchema>;
