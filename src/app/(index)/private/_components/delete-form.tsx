'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ActionResult } from '@/types';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { deleteProduct } from '../lib/actions';
import { useActionState } from 'react';

interface DeleteFormProps {
  id: string;
}

const initialState: ActionResult = {
  error: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Deleting...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </>
      )}
    </Button>
  );
};

export default function DeleteForm({ id }: DeleteFormProps) {
  const [state, formAction] = useActionState(deleteProduct, initialState, id);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="cursor-pointer">
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={formAction}>
          <input type="hidden" name="id" value={id} />
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
            {state?.error && (
              <p className="text-sm text-destructive mt-2">{state.error}</p>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
