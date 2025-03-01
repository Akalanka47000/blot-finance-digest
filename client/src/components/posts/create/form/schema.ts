import { z } from 'zod';

export default z.object({
  title: z.string().min(1, { message: 'A title is required' }),
  external_article_url: z.string().min(1, { message: 'An external article link is required' }),
  featured_image_url: z.string().optional()
});
