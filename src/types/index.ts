import { loginSchema, signupSchema, userSchema } from '@/lib/schema';
import z from 'zod';

export type ActionResult = {
  error: string | null;
  success?: string;
};

export type TypeId = {
  id: string;
};

export type TypeParams = {
  params: Promise<TypeId>;
};

export type ProductType = {
  id: string;
  name: string;
  status: string | 'draft';
  images: string[];
  description: string;
};

export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof signupSchema>;
export type UserType = z.infer<typeof userSchema>;
