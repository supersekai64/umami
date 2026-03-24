import { z } from 'zod';
import { getQueryFilters, parseRequest } from '@/lib/request';
import { badRequest, json, notFound, unauthorized } from '@/lib/response';
import { pagingParams, searchParams, websiteRoleParam } from '@/lib/schema';
import { canManageWebsiteUsers, canViewWebsite } from '@/permissions';
import { createWebsiteUser, getWebsiteUser, getWebsiteUsers, getUserByUsername } from '@/queries/prisma';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ websiteId: string }> },
) {
  const schema = z.object({
    ...pagingParams,
    ...searchParams,
  });

  const { auth, query, error } = await parseRequest(request, schema);

  if (error) {
    return error();
  }

  const { websiteId } = await params;

  if (!(await canViewWebsite(auth, websiteId))) {
    return unauthorized();
  }

  const filters = await getQueryFilters(query);

  const users = await getWebsiteUsers(
    {
      where: {
        websiteId,
        user: {
          deletedAt: null,
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    },
    filters,
  );

  return json(users);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ websiteId: string }> },
) {
  const schema = z.object({
    username: z.string().min(1),
    role: websiteRoleParam,
  });

  const { auth, body, error } = await parseRequest(request, schema);

  if (error) {
    return error();
  }

  const { websiteId } = await params;

  if (!(await canManageWebsiteUsers(auth, websiteId))) {
    return unauthorized();
  }

  const { username, role } = body;

  const targetUser = await getUserByUsername(username);

  if (!targetUser) {
    return notFound({ message: 'User not found.' });
  }

  if (targetUser.id === auth.user.id) {
    return badRequest({ message: 'You cannot add yourself.' });
  }

  const websiteUser = await getWebsiteUser(websiteId, targetUser.id);

  if (websiteUser) {
    return badRequest({ message: 'User already has access to this website.' });
  }

  const result = await createWebsiteUser(targetUser.id, websiteId, role);

  return json(result);
}
