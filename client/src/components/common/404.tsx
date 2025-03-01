import { HandCoins } from 'lucide-react';
import { HighImportanceText } from './typography';

export function NotFound() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-12">
      <HighImportanceText>Oops, this page doesn't exist</HighImportanceText>
      <HandCoins className="w-52 h-52 md:w-60 md:h-60 stroke-[0.5]" />
    </div>
  );
}
