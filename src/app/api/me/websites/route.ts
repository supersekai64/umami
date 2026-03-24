import { z } from 'zod';
import { getQueryFilters, parseRequest } from '@/lib/request';
import { json } from '@/lib/response';
import { pagingParams } from '@/lib/schema';
import { getAllUserWebsites } from '@/queries/prisma/website';

export async function GET(request: Request) {
  const schema = z.object({
    ...pagingParams,
  });

  const { auth, query, error } = await parseRequest(request, schema);

  if (error) {
    return error();
  }

  const filters = await getQueryFilters(query);

  return json(await getAllUserWebsites(auth.user.id, filters));
}
