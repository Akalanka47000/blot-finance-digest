'use client';

import { Inter } from 'next/font/google';
import { Button } from '@/components/common/core';

const inter = Inter({ subsets: ['latin'] });

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  console.debug('error', error);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-svh flex justify-center items-center`}>
        <main className="grow">
          <div className="container max-w-screen-xl flex justify-center items-center">
            <div className="max-w-lg flex flex-col gap-12 my-24">
              <div className="flex flex-col items-center justify-center sm:flex-row gap-y-2 gap-x-4">
                <Button variant="outline" onClick={() => reset()}>
                  Try again
                </Button>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
