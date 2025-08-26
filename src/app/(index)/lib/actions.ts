'use server';

import { ActionResult } from '@/types';
import { signOut } from '@/lib/auth';

export async function logout(): Promise<ActionResult> {
  await signOut({ redirectTo: '/' });
  return { error: 'Failed to log out', success: 'Logged out successfully' };
}
