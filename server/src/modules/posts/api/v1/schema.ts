import { Joi } from 'celebrate';

export const createPostSchema = Joi.object({
  title: Joi.string().required(),
  external_article_url: Joi.string().required(),
  featured_image_url: Joi.string().required()
});
