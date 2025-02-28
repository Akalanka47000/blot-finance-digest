import { Request } from 'express';
import { default as context } from 'express-http-context';
import { ctxAuthorizerError, ctxHeaders, ctxUser, headers } from '@shared/constants';
import { asyncHandler } from '@sliit-foss/functions';
import { default as createError } from 'http-errors';
import { Blacklist, errors, verify } from '@/modules/auth/utils';
import { getUserById } from '@/modules/users/repository';

export const forbiddenRouteError = createError(403, 'Route forbidden');

const whitelistedRoutes = [
  '/v1/auth/login',
  '/v1/auth/register',
  '/v1/auth/refresh-token',
  '/system/health',
  '/system/liveness',
  '/system/readiness'
];

export const sentinel = asyncHandler(async (req: Request) => {
  if (process.env.SERVICE_REQUEST_KEY && req.headers[headers.serviceRequestKey] === process.env.SERVICE_REQUEST_KEY)
    return;

  if (whitelistedRoutes.find((route) => req.path.match(new RegExp(route)))) {
    return;
  }

  const token = req.headers.authorization?.replace('Bearer ', '')?.replace('null', '');

  if (!token) {
    return context.set(ctxAuthorizerError, errors.missing_token);
  }

  let decodedUser;

  try {
    decodedUser = verify(token);
  } catch (e) {
    return context.set(ctxAuthorizerError, e);
  }

  const user = await getUserById(decodedUser._id);

  if (!user) {
    return context.set(ctxAuthorizerError, errors.invalid_token);
  }
  if (await Blacklist.has(token)) {
    return context.set(ctxAuthorizerError, errors.cancelled_token);
  }

  req.user = user;
  req.token = token;
  req.headers[headers.userId] = user?.id;
  req.headers[headers.userEmail] = user?.email;

  context.set(ctxUser, user);
  context.set(ctxHeaders, req.headers);
});

export const protect = asyncHandler(function protect(req: Request) {
  if (process.env.SERVICE_REQUEST_KEY && req.headers[headers.serviceRequestKey] === process.env.SERVICE_REQUEST_KEY)
    return;
  const authorizerErr = context.get(ctxAuthorizerError);
  if (authorizerErr) throw authorizerErr;
});

export const internal = asyncHandler(function interalRouteGuard(req: Request) {
  if (process.env.SERVICE_REQUEST_KEY && req.headers[headers.serviceRequestKey] === process.env.SERVICE_REQUEST_KEY)
    return;
  throw forbiddenRouteError;
});
