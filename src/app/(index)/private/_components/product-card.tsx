'use client';

import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types';
import { getPublicUrl } from '@/lib/supabase';
import DeleteForm from './delete-form';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export function ProductCard({ products }: { products: ProductType[] }) {
  return (
    <div className="grid justify-center gap-5">
      {products.map((product) => {
        const firstImage = product.images?.[0]
          ? getPublicUrl('bucket-images', product.images[0])
          : '/placeholder.png';

        return (
          <div key={product.id} className="size-fit">
            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
              <Image
                src={firstImage}
                alt={product.name}
                height="400"
                width="400"
                className="object-cover"
                priority
              />
              <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                {product.name}
              </p>

              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {product.description}
              </p>
              <Badge variant="outline">{product.status}</Badge>
              <div className="flex items-center gap-3 mt-4">
                <Button asChild>
                  <Link href={`/private/edit/${product.id}`}>Edit</Link>
                </Button>
                <DeleteForm id={product.id} />
              </div>
            </BackgroundGradient>
          </div>
        );
      })}
    </div>
  );
}
