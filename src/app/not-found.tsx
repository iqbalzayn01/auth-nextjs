import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="max-w-md text-center">
      <h4 className="mt-9 mb-9 text-2xl leading-snug font-medium text-gray-900 dark:text-white">
        Sorry, we didn&apos;t find any match!
      </h4>
      <Button asChild>
        <Link href={'/'}>Back to Home</Link>
      </Button>
    </div>
  </div>
);

export default NotFoundPage;
