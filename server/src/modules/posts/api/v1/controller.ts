import express, { Request, Response } from 'express';
import { PostSource } from '@shared/constants';
import { traced, tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { cache, cacheSuccess, protect, toSuccess } from '@/middleware';
import { cacheKey } from '../../constants';
import { createPostSchema, getPostsQuerySchema } from './schema';
import * as service from './service';

const layer = 'service';

const post = express.Router();

post.post(
  '/',
  protect,
  celebrate({ [Segments.BODY]: createPostSchema }),
  tracedAsyncHandler(async function createPost(req: Request, res: Response) {
    const post = await traced[layer](service.createPost)(req.body);
    cache.clear(cacheKey(PostSource.BLOTT));
    return toSuccess({
      res,
      data: post,
      message: 'Post successfully added'
    });
  })
);

post.get(
  '/',
  cacheSuccess('30 seconds'), // Since this is a blog API we can cache this without any issues
  celebrate({ [Segments.QUERY]: getPostsQuerySchema }),
  tracedAsyncHandler(async function getAllPosts(req: Request, res: Response) {
    req.apicacheGroup = cacheKey(req.query.source as PostSource);
    const posts = await traced[layer](service.getPosts)(req.query as any);
    return toSuccess({
      res,
      data: posts,
      message: 'Posts fetched successfully'
    });
  })
);

export default post;
