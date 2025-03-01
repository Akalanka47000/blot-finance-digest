import { PaginatedResult } from '../database/postgres/repository';

export function paginate<T>(docs: T[], page: undefined | null, limit?: number): T[];
export function paginate<T>(docs: T[], page: number, limit?: number): PaginatedResult<T>;

export function paginate<T>(docs: T[], page?: number | null, limit?: number): T[] | PaginatedResult<T> {
  if (!page) {
    return docs;
  }
  limit = Number(limit) || 10;
  page = Number(page);
  const paginatedDocs = docs.slice((page - 1) * limit, page * limit);
  return {
    docs: paginatedDocs,
    totalDocs: docs.length,
    limit,
    page,
    totalPages: Math.ceil(docs.length / limit),
    nextPage: page < Math.ceil(docs.length / limit) ? page + 1 : null,
    prevPage: page > 1 ? page - 1 : null,
    hasPrevPage: page > 1,
    hasNextPage: page < Math.ceil(docs.length / limit)
  };
}
