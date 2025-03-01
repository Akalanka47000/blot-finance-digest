'use client';

import { useEffect, useState } from 'react';
import { PostSource } from '@shared/constants';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Post
} from '@/components/common';
import { cn } from '@/utils';
import { retrievePosts } from './action';

interface IRenderBoxProps {
  initialPosts: IPost[];
}

export function RenderBox({ initialPosts }: IRenderBoxProps): JSX.Element {
  const [api, setApi] = useState<CarouselApi>();
  const [page = 1, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (!api) {
      return;
    }
    function onCurrentChange(current: number) {
      if (current >= posts.length - 10) {
        const nextPage = page + 1;
        if (loading) {
          return;
        }
        setLoading(true);
        retrievePosts(nextPage)
          .then((newPosts) => {
            setPosts([...posts, ...newPosts]);
            setPage(page + 1);
          })
          .finally(() => {
            setLoading(false);
          });
      }
    }
    onCurrentChange(api.selectedScrollSnap() + 1);
    const selectHandler = () => onCurrentChange(api.selectedScrollSnap() + 1);
    api.on('select', selectHandler);
    return () => {
      api.off('select', selectHandler);
    };
  }, [api, posts?.length]);

  return (
    <div className={cn(posts.length ? 'py-12' : 'py-24')}>
      <Carousel setApi={setApi} className="w-[calc(100%+2rem)] sm:w-[calc(100%+1rem)] -ml-4 sm:-ml-2">
        <CarouselContent className="-ml-2 pl-2 mr-2 sm:pl-0 sm:mr-0">
          {posts.length ? (
            posts.map((p, index) => {
              const position = (index % 3) + 1;
              return (
                <CarouselItem
                  key={p.id}
                  className={cn(
                    'pl-2',
                    position === 1
                      ? 'basis-[60%] lg:basis-[42.5%]'
                      : position === 2
                        ? 'basis-[40%] lg:basis-[35%]'
                        : 'basis-[23.67%]'
                  )}>
                  <Post post={p} source={PostSource.BLOTT} />
                </CarouselItem>
              );
            })
          ) : (
            <span className=" mx-auto text-center text-3xl">No posts from Blott.io at the moment</span>
          )}
        </CarouselContent>
        {!!posts.length && (
          <>
            <CarouselPrevious className="hidden sm:inline-flex" />
            <CarouselNext className="hidden sm:inline-flex" />
          </>
        )}
      </Carousel>
    </div>
  );
}

export default RenderBox;
