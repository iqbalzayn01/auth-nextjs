import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ProductForm from '../_components/product-form';
import Link from 'next/link';
import React from 'react';

export default function CreateProductPage() {
  return (
    <div className="mx-auto flex flex-1 flex-col gap-4 p-4">
      <Card className="max-w-[768px]">
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            cupiditate nostrum excepturi sint!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm type="ADD" />
          <Button variant="outline" asChild>
            <Link href={`/private`}>Back</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
