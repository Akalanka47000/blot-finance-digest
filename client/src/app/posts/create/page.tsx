import { redirect } from 'next/navigation';
import CreatePostFormContainer from '@/components/posts/create';
import { ROUTE_LOGIN } from '@/constants';
import { getCurrentUser } from '@/utils/auth';

export default async function Page(): Promise<JSX.Element> {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect(`${ROUTE_LOGIN}?source=post-create`);
  }
  return (
    <main className="grow">
      <CreatePostFormContainer />
    </main>
  );
}
