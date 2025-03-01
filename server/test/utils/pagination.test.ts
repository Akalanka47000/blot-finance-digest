import { describe, expect, test } from 'bun:test';
import { paginate } from '@/utils/pagination';

describe('Pagination', () => {
  const docs = Array.from({ length: 100 }, (_, i) => i + 1);

  test('should return the complete list when page is not defined', () => {
    const result = paginate(docs, undefined, 10);
    expect(result.length).toBe(100);
  });

  test('should return the second page when page is 2', () => {
    const result = paginate(docs, 2, 10);
    expect(result.docs).toHaveLength(10);
    expect(result.totalDocs).toBe(100);
    expect(result.limit).toBe(10);
    expect(result.page).toBe(2);
    expect(result.totalPages).toBe(10);
    expect(result.nextPage).toBe(3);
    expect(result.prevPage).toBe(1);
    expect(result.hasPrevPage).toBeTruthy();
    expect(result.hasNextPage).toBeTruthy();
  });

  test('should return the last page when page is 10', () => {
    const result = paginate(docs, 10, 10);
    expect(result.docs).toHaveLength(10);
    expect(result.totalDocs).toBe(100);
    expect(result.limit).toBe(10);
    expect(result.page).toBe(10);
    expect(result.totalPages).toBe(10);
    expect(result.nextPage).toBeNull();
    expect(result.prevPage).toBe(9);
    expect(result.hasPrevPage).toBeTruthy();
    expect(result.hasNextPage).toBeFalsy();
  });

  test('should return the last page when page is 11', () => {
    const result = paginate(docs, 11, 10);
    expect(result.docs).toHaveLength(0);
    expect(result.totalDocs).toBe(100);
    expect(result.limit).toBe(10);
    expect(result.page).toBe(11);
    expect(result.totalPages).toBe(10);
    expect(result.nextPage).toBeNull();
    expect(result.prevPage).toBe(10);
    expect(result.hasPrevPage).toBeTruthy();
    expect(result.hasNextPage).toBeFalsy();
  });

  test('should return the first page when page is 1', () => {
    const result = paginate(docs, 1, 10);
    expect(result.docs).toHaveLength(10);
    expect(result.totalDocs).toBe(100);
    expect(result.limit).toBe(10);
    expect(result.page).toBe(1);
    expect(result.totalPages).toBe(10);
    expect(result.nextPage).toBe(2);
    expect(result.prevPage).toBeNull();
    expect(result.hasPrevPage).toBeFalsy();
    expect(result.hasNextPage).toBeTruthy();
  });
});
