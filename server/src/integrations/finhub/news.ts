import { connector } from './core';

export const getNews = (category, v = 'v1'): Promise<IFinhubNews> => {
  return connector.get(`/api/${v}/news?category=${category}`).then(connector.resolve);
};
