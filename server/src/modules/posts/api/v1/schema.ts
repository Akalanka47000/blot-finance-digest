import { PostSource } from '@shared/constants';
import { Joi } from 'celebrate';

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  external_article_url: Joi.string().required(),
  featured_image_url: Joi.string().required()
});

export const getPostsQuerySchema = Joi.object({
  source: Joi.string()
    .valid(...Object.values(PostSource))
    .required()
}).unknown(true);
