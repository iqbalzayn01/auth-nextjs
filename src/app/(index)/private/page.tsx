import { auth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { ProductCard } from './_components/product-card';
import { getAllProduct } from './lib/data';
import Logout from '../_components/logout-form';
import Link from 'next/link';
import React from 'react';

export default async function PrivatePage() {
  const session = await auth();
  const products = await getAllProduct();

  if (!session?.user) return null;

  return (
    <main className="container mx-auto px-5">
      <section className="flex flex-col items-center justify-center gap-1 min-h-screen">
        <h1 className="text-xl font-medium">{session?.user.name}</h1>
        <span className="text-base">{session?.user.email}</span>
        <span className="text-base">{session?.user.role}</span>
        <Button asChild>
          <Link href={`/private/add`}>Create Product</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href={`/`}>Home</Link>
        </Button>
        <Logout />
      </section>

      <section>
        {products.length > 0 ? (
          <ProductCard products={products} />
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto max-w-md">
              <h3 className="mt-4 text-xl font-semibold">No products found</h3>
              <p className="mt-2 text-gray-600">
                Try adjusting your search or filter to find what you&apos;re
                looking for.
              </p>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
