import { PostSource } from '@shared/constants';
import { ArrowUpCircle } from 'lucide-react';
import { cn } from '@/utils';

interface IPostProps {
  post: IPost;
  source: PostSource;
  className?: string;
}

export function Post({ post, source, className }: IPostProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <div className="relative">
        <img src={post.featured_image_url} alt={post.title} className="rounded-[6px]" />
        <div className="flex items-center justify-center bg-white absolute bottom-3 right-3 text-xs text-black px-3 py-1 font-bold rounded-[2px]">
          {source.toUpperCase()}
        </div>
      </div>
      <h1 className="text-2xl pb-3">{post.title}</h1>
      <a href={post.external_article_url} target="_blank" rel="noreferrer">
        <div className="flex items-center gap-2">
          <span className="transform translate-y-0.5 underline text-[15px]">Read Article</span>
          <ArrowUpCircle className="transform rotate-[45deg] w-6 h-6 stroke-[0.75]" />
        </div>
      </a>
    </div>
  );
}

export default Post;
