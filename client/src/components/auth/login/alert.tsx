'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

let alerted = false;

export function LoginAlert() {
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  useEffect(() => {
    if (source === 'post-create' && !alerted) {
      alerted = true;
      setTimeout(() => {
        toast.success('Please login to create a post');
      }, 0);
    }
  }, [source, alerted]);

  return <></>;
}

export default LoginAlert;
