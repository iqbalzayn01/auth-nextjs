'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { ActionResult } from '@/types';
import { signIn } from '@/lib/auth';
import { loginSchema, signupSchema } from '@/lib/schema';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function login(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message };
  }

  const { email, password } = parsed.data;

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (!existingUser) return { error: 'User not found. Please sign up!' };

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) return { error: 'Password is incorrect.' };

  try {
    await signIn('credentials', { email, password, redirect: false });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' };
        default:
          return { error: 'Something went wrong' };
      }
    }

    console.error('Login error:', error);
    return { error: 'Something went wrong, please try again!' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parsed = signupSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0].message };

  try {
    const { name, email, password } = parsed.data;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) return { error: 'User already exists' };

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'customer',
      },
    });
  } catch (error) {
    console.error('Sign Up Error:', error);
    return { error: 'Something went wrong, please try again!' };
  }

  revalidatePath('/', 'layout');
  redirect('/login');
}
