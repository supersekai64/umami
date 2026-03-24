import type { QueryFilters } from '@/lib/types';

const DEFAULT_PAGE_SIZE = 10;

export async function getAllUserTeams(_userId: string): Promise<any[]> {
  return [];
}

export async function getUserTeams(
  _userId: string,
  filters: QueryFilters = {},
): Promise<{ data: any[]; count: number; page: number; pageSize: number; orderBy?: string; search?: string }> {
  const { page = 1, pageSize, orderBy, search } = filters;
  const size = +pageSize || DEFAULT_PAGE_SIZE;

  return { data: [], count: 0, page: +page, pageSize: size, orderBy, search };
}
