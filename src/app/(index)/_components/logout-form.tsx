'use client';

import { Button } from '@/components/ui/button';
import { ActionResult } from '@/types';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { logout } from '../lib/actions';
import React, { useActionState } from 'react';

const initialState: ActionResult = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      type="submit"
      variant="destructive"
      className="cursor-pointer"
    >
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Please wait...
        </>
      ) : (
        'Logout'
      )}
    </Button>
  );
}

export default function Logout() {
  const [state, formAction] = useActionState(logout, initialState);

  return (
    <form action={formAction}>
      <SubmitButton />
      {state.error && <p className="text-red-500 mb-2">{state.error}</p>}
    </form>
  );
}
