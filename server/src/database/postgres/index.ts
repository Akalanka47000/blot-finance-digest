import { moduleLogger } from '@sliit-foss/module-logger';
import AppDataSource from './data-source';

export { CustomRepository } from './repository';

const logger = moduleLogger('postgres');

export const connect = async () => {
  await AppDataSource.initialize();
  logger.info('Connected to Postgres database successfully');
};

export const disconnect = async () => {
  await AppDataSource.destroy();
  logger.info('Disconnected from Postgres database successfully');
};

export const ping = () => {
  return AppDataSource.query('SELECT 1')
    .then(() => true)
    .catch(() => false);
};

export default AppDataSource;
