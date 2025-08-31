'use client';

import { BackgroundGradient } from '@/components/ui/background-gradient';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductType } from '@/types';
import { getPublicUrl } from '@/lib/supabase';
import Image from 'next/image';
import React from 'react';

export function ProductCard({ products }: { products: ProductType[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
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
              <Badge>{product.status}</Badge>
              <Button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                <span>Detail</span>
              </Button>
            </BackgroundGradient>
          </div>
        );
      })}
    </div>
  );
}
