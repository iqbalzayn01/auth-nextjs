import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getProductById } from '../../lib/data';
import { TypeParams } from '@/types';
import ProductForm from '../../_components/product-form';
import Link from 'next/link';
import React from 'react';

export default async function EditProductPage({ params }: TypeParams) {
  const { id: productId } = await params;
  const product = await getProductById(productId);

  return (
    <div className="mx-auto flex flex-1 flex-col gap-4 p-4">
      <Card className="max-w-[768px]">
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
          <CardDescription>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            cupiditate nostrum excepturi sint!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductForm type="EDIT" data={product} />
          <Button variant="outline" asChild>
            <Link href={`/private`}>Back</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
