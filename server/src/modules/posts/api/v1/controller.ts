import express, { Request, Response } from 'express';
import { traced, tracedAsyncHandler } from '@sliit-foss/functions';
import { celebrate, Segments } from 'celebrate';
import { protect, toSuccess } from '@/middleware';
import { createPostSchema } from './schema';
import * as service from './service';

const layer = 'service';

const post = express.Router();

post.post(
  '/',
  protect,
  celebrate({ [Segments.BODY]: createPostSchema }),
  tracedAsyncHandler(async function createPost(req: Request, res: Response) {
    const post = await traced[layer](service.createPost)(req.body);
    return toSuccess({
      res,
      data: post,
      message: 'Post successfully added'
    });
  })
);

post.get(
  '/',
  protect,
  tracedAsyncHandler(async function getAllPosts(req: Request, res: Response) {
    const posts = await traced[layer](service.getAllPosts)();
    return toSuccess({
      res,
      data: posts,
      message: 'Posts fetched successfully'
    });
  })
);

export default post;
