import { default as serviceConnector } from '@sliit-foss/service-connector';

const options = {
  baseURL: process.env.FINHUB_BASE_URL,
  service: 'Finhub',
  headerIntercepts: () => ({
    'X-Finnhub-Token': process.env.FINNHUB_API_KEY
  })
};

export const connector = serviceConnector(options);

connector.enableRetry();
