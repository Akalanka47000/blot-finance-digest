// prettier-ignore
import * as database from '@/database/postgres';
import { default as crypto } from 'crypto';
import { default as fs } from 'fs';
import { default as express, NextFunction, Request, Response } from 'express';
import { default as context } from 'express-http-context';
import { headers } from '@shared/constants';
import { moduleLogger } from '@sliit-foss/module-logger';
import { default as stack } from 'callsite';
import { default as compression } from 'compression';
import { default as cookieParser } from 'cookie-parser';
import { default as cors } from 'cors';
import { default as helmet } from 'helmet';
import { default as polyglot } from 'node-polyglot';
import { default as config } from '@/config';
import { locales } from '@/locales';
import { errorHandler, expressHealth, httpLogger, rateLimiter, responseInterceptor, sentinel } from '@/middleware';

await database.connect();

const service = 'Finance-Digest-Service';

const logger = moduleLogger('Server');

const app = express();

const router = express.Router();

app.use(helmet());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(compression());

app.use(
  cors({
    origin: config.FRONTEND_BASE_URL,
    credentials: true
  })
);

app.use(context.middleware as any);

app.use((req: Request, _res: Response, next: NextFunction) => {
  context.set('correlationId', req.headers[headers.correlationId] ?? crypto.randomBytes(16).toString('hex'));
  next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
  const locale = req.headers['accept-language'] ?? 'en';
  res.polyglot = new polyglot({
    allowMissing: true,
    onMissingKey: (key) => key
  });
  res.polyglot.extend(locales[locale]);
  context.set('locale', locale);
  context.set('translate', res.polyglot.t);
  next();
});

expressHealth({
  service,
  checkFunctions: {
    database: () => database.ping()
  }
})(router);

const routes = express.Router();

/* Automatically discovers and mounts all routes from the modules directory */
const root = stack()
  .find((site) => site.getFileName().endsWith('server.ts'))
  ?.getFileName()
  ?.replace('/server.ts', '')
  ?.replace('\\server.ts', '');
fs.readdirSync(`${root}/modules`)?.forEach((module) => {
  if (module.startsWith('_')) return;
  fs.readdirSync(`${root}/modules/${module}/api`)?.forEach((v) => {
    routes.use(`/${v}/${module}`, require(`${root}/modules/${module}/api/${v}/controller`).default);
  });
});

router.use(['/api', '/'], rateLimiter, httpLogger, sentinel, routes);

app.use(responseInterceptor);

app.use([`/${service.toLowerCase().split(' ')[0]}-svc`, '/'], router);

app.all('*', (_req, res) => {
  res.status(404).send();
});

app.use(errorHandler);

const server = app.listen(config.PORT, config.HOST, () => {
  logger.info(`${service} listening on ${config.HOST}:${config.PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('Received SIGTERM. Server shutdown initiated');
  server.close(() => {
    if (process.env.NODE_ENV === 'development') return process.exit(0);
    logger.info('Server shutdown complete. Exiting after 30 seconds');
    setTimeout(async () => {
      await database.disconnect();
      process.exit(0);
    }, 30000);
  });
});
