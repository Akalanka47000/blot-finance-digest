'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { PostSource } from '@shared/constants';
import { Loader2 } from 'lucide-react';
import { Post } from '@/components/common';
import { retrievePosts } from './action';

interface IRenderBoxProps {
  initialPosts: IPost[];
}

export function RenderBox({ initialPosts }: IRenderBoxProps): JSX.Element {
  const [page = 1, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState(initialPosts);
  const [reachedEnd, setReachedEnd] = useState<boolean>(false);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView && !loading) {
      setLoading(true);
      retrievePosts(page + 1)
        .then((newPosts) => {
          if (newPosts.length === 0) {
            setReachedEnd(true);
            return;
          }
          setPosts([...posts, ...newPosts]);
          setPage(page + 1);
        })
        .finally(() => setLoading(false));
    }
  }, [inView, loading]);

  return (
    <>
      <div className="pt-0 lg:pt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts?.map((p) => <Post key={p.id} post={p} source={PostSource.FINNHUB} />)}
      </div>
      {!reachedEnd && (
        <div
          ref={ref}
          className="col-span-1 mt-16 mb-12 flex items-center justify-center sm:col-span-2 md:col-span-3 lg:col-span-4">
          <Loader2 className="animate-spin h-12 w-12 text-gray-500" />
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </>
  );
}

export default RenderBox;
