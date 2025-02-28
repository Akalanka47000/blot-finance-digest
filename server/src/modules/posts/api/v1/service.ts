import { PostSource } from '@shared/constants';
import { traced } from '@sliit-foss/functions';
import { finhub } from '@/integrations';
import { paginate } from '@/utils';
import * as repository from '../../repository';

const layer = 'repository';

export const createPost = (post: IPost) => {
  return traced[layer](repository.createPost)(post);
};

export const getPosts = async ({ source, ...retrievalOptions }: QueryOptions & { source: PostSource }) => {
  if (source === PostSource.FINNHUB) {
    const news = await finhub.getNews('general');
    const posts: IPost[] = news.map((newsItem) => {
      return {
        id: newsItem.id.toString(),
        title: newsItem.headline,
        external_article_url: newsItem.url,
        featured_image_url: newsItem.image,
        created_at: new Date(newsItem.datetime),
        updated_at: new Date(newsItem.datetime)
      };
    });
    /* We paginate the posts here since the finhub API does not support pagination */
    return paginate(posts, retrievalOptions.page, retrievalOptions.limit);
  }
  return traced[layer](repository.getAllPosts)(retrievalOptions);
};
