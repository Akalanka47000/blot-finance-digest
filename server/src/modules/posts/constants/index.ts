import { PostSource } from '@shared/constants';

export const cacheKey = (source: PostSource) => `posts-${source}`;
