import { clsx, type ClassValue } from 'clsx';
import { withExtendedShadows } from 'tailwind-extended-shadows-merge';
import { extendTailwindMerge } from 'tailwind-merge';

export * from './error';

export function cn(...inputs: ClassValue[]) {
  return extendTailwindMerge(withExtendedShadows)(clsx(inputs));
}
