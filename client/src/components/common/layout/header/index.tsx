'use client';

import { default as Link } from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTE_CREATE_POST, ROUTE_HOME } from '@/constants';
import { Logo } from '@/icons';
import { ExtendedButton } from '../../core';

export default function Header(): JSX.Element {
  const pathname = usePathname();
  return (
    <div className="flex justify-center items-center py-12">
      <Logo />
      {pathname === ROUTE_HOME && (
        <Link href={ROUTE_CREATE_POST} className="hidden md:block">
          <ExtendedButton className="ml-auto absolute right-10 top-[3.1rem]">Create Post</ExtendedButton>
        </Link>
      )}
    </div>
  );
}
