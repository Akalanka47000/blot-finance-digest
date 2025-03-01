import { passwordValidationFailureMessage, regex } from '@shared/constants';
import { z } from 'zod';

export default z
  .object({
    email: z.string().email(),
    password: z.string().optional(),
  })
  .refine((data) => data.password && regex.password.test(data.password), {
    message: passwordValidationFailureMessage,
    path: ['password']
  })
