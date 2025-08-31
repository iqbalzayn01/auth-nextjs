'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import type { ActionResult } from '@/types';
import { createProduct } from '../lib/actions';
import { useActionState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ProductStatus } from '@prisma/client';
import { ProductType } from '@/types';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import React from 'react';
import ImageUploader from './upload-image';

interface ProductFormProps {
  children?: React.ReactNode;
  type: 'ADD' | 'EDIT';
  data?: ProductType | null;
}
const initialState: ActionResult = {
  error: '',
};

const ProductStatusLabels: Record<ProductStatus, string> = {
  draft: 'Draft',
  published: 'Published',
  archived: 'Archived',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Mohon tunggu
        </>
      ) : (
        'Simpan'
      )}
    </Button>
  );
};

export default function ProductForm({
  children,
  type,
  data,
}: ProductFormProps) {
  //   const updateProductWithId = (_: unknown, formData: FormData) => {
  //     return updateProduct(_, formData, data?.id ?? '');
  //   };
  //   const [state, formAction] = useActionState(
  //     type ? createProduct : updateProductWithId,
  //     initialState
  //   );
  const [state, formAction] = useActionState(createProduct, initialState);

  if (data) {
    console.log('DATA PRODUCT:', data);
    console.log('IMAGE:', data.images);
  }

  return (
    <main className="max-w-xl mx-auto p-6">
      <form action={formAction} className="space-y-6">
        {state.error && (
          <p className="text-red-500 text-sm font-medium">{state.error}</p>
        )}

        {type === 'EDIT' && <input type="hidden" name="id" value={data?.id} />}

        <div className="space-y-1">
          <Label className="block text-sm font-medium">Product Name</Label>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            defaultValue={data?.name}
            required
          />
        </div>

        <div className="space-y-1">
          <Label className="block text-sm font-medium">Description</Label>
          <Textarea
            name="description"
            placeholder="Description"
            defaultValue={data?.description}
            required
          />
        </div>

        {children}

        <div className="grid w-full items-center gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            name="status"
            defaultValue={data?.status ?? ProductStatus.draft}
          >
            <SelectTrigger id="status" aria-label="Select status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ProductStatusLabels).map(([value, label]) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label className="block text-sm font-medium">Product Images</Label>
          <ImageUploader initialImageUrls={data?.images} />
        </div>

        <SubmitButton />
      </form>
    </main>
  );
}
