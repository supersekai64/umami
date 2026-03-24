import type { QueryFilters } from '@/lib/types';

export interface Team {
  id: string;
  name: string;
  createdAt: Date | null;
}

export interface PagedTeams {
  data: Team[];
  count: number;
  page: number;
  pageSize: number;
  orderBy?: string;
  search?: string;
}

const DEFAULT_PAGE_SIZE = 10;

/** Stub: returns an empty list until a Team model is added to the Prisma schema. */
export async function getAllUserTeams(_userId: string): Promise<Team[]> {
  return [];
}

/** Stub: returns an empty paged result until a Team model is added to the Prisma schema. */
export async function getUserTeams(
  _userId: string,
  filters: QueryFilters = {},
): Promise<PagedTeams> {
  const { page = 1, pageSize, orderBy, search } = filters;
  const size = +pageSize || DEFAULT_PAGE_SIZE;

  return { data: [], count: 0, page: +page, pageSize: size, orderBy, search };
}
