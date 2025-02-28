import { Joi } from 'celebrate';
import { optionalSchema } from '@/utils';

export const createUserSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email().required()
});

export const updateUserSchema = optionalSchema(createUserSchema);
