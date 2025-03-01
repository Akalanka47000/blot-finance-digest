'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { ROUTE_LOGIN } from '@/constants';

let alerted = false;

export function LoginAlert() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const source = searchParams.get('source');

  useEffect(() => {
    if (source === 'post-create' && !alerted) {
      router.replace(ROUTE_LOGIN);
      alerted = true;
      setTimeout(() => {
        toast.success('Please login to create a post');
      }, 0);
    }
  }, [source, alerted]);

  return <></>;
}

export default LoginAlert;
