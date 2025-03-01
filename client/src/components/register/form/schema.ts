import { passwordValidationFailureMessage, regex } from '@shared/constants';
import { z } from 'zod';

export default z
  .object({
    first_name: z
      .string()
      .regex(regex.name, { message: 'First name must contain only letters' })
      .min(2, { message: 'First name must be at least 2 characters' }),
    last_name: z
      .string()
      .regex(regex.name, { message: 'Last name must contain only letters' })
      .min(2, { message: 'Last name must be at least 2 characters' }),
    email: z.string().email(),
    password: z.string().optional(),
    confirm_password: z.string().optional()
  })
  .refine((data) => data.password && regex.password.test(data.password), {
    message: passwordValidationFailureMessage,
    path: ['password']
  })
  .refine((data) => data.password === data.confirm_password, {
    message: 'Passwords do not match',
    path: ['confirm_password']
  });
