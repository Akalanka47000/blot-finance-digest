import { BlottPosts, FinnhubPosts, Hero } from '@/components/home';

export const revalidate = 60;

export default function Page(): JSX.Element {
  return (
    <main className="grow px-5 md:px-10">
      <Hero />
      <BlottPosts />
      <FinnhubPosts />
    </main>
  );
}
