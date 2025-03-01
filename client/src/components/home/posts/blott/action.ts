'use server';

import { PostSource } from '@shared/constants';
import { postService } from '@/services';

export const retrievePosts = async (page: number = 1) => {
  try {
    const response = await postService.getPosts({
      options: {
        params: {
          page,
          limit: 10,
          source: PostSource.BLOTT
        }
      }
    });
    return response.data.data.docs;
  } catch (error) {
    return [];
  }
};
