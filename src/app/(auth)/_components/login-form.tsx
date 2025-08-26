'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';
import { ActionResult } from '@/types';
import { login } from '../lib/actions';
import React, { useActionState } from 'react';
import Link from 'next/link';

const initialState: ActionResult = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full cursor-pointer">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      ) : (
        'Login'
      )}
    </Button>
  );
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && <p className="text-red-500 mb-2">{state.error}</p>}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="flex flex-col gap-3">
                <SubmitButton />
              </div>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
              <Link
                href="/"
                className="flex hover:underline underline-offset-4"
              >
                {`< Back`}
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
