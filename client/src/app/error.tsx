'use client';

import { HighImportanceText } from '@/components';
import { Button } from '@/components/common/core';

export default function Error(): JSX.Element {
  return (
    <div className="container max-w-screen-xl flex flex-col gap-12 justify-center items-center">
      <HighImportanceText>Hang tight, we&apos;re fixing something</HighImportanceText>
      <div className="flex flex-col items-center justify-center sm:flex-row gap-y-2 gap-x-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          See if it&apos;s fixed
        </Button>
      </div>
    </div>
  );
}
