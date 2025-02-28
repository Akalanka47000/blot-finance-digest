import type { Request, Response } from 'express';
import { Cyborg } from '@shared/extensions';
import apicache from 'apicache';

export { apicache as cache };

export const cacheSuccess = (duration: string) =>
  apicache.middleware(duration, (_: Request, res: Response) => res.statusCode === 200);

export const cacheConsumerSuccess = (duration: string) =>
  apicache.middleware(
    duration,
    (req: Request, res: Response) => res.statusCode === 200 && (!req.user || Cyborg.isConsumer(req.user))
  );
