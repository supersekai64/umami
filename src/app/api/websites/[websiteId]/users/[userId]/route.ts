import { z } from 'zod';
import { parseRequest } from '@/lib/request';
import { badRequest, json, ok, unauthorized } from '@/lib/response';
import { websiteRoleParam } from '@/lib/schema';
import { canManageWebsiteUsers } from '@/permissions';
import { deleteWebsiteUser, getWebsiteUser, updateWebsiteUser } from '@/queries/prisma';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ websiteId: string; userId: string }> },
) {
  const schema = z.object({
    role: websiteRoleParam,
  });

  const { auth, body, error } = await parseRequest(request, schema);

  if (error) {
    return error();
  }

  const { websiteId, userId } = await params;

  if (!(await canManageWebsiteUsers(auth, websiteId))) {
    return unauthorized();
  }

  const websiteUser = await getWebsiteUser(websiteId, userId);

  if (!websiteUser) {
    return badRequest({ message: 'The user does not have access to this website.' });
  }

  const result = await updateWebsiteUser(websiteUser.id, body);

  return json(result);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ websiteId: string; userId: string }> },
) {
  const { auth, error } = await parseRequest(request);

  if (error) {
    return error();
  }

  const { websiteId, userId } = await params;

  if (!(await canManageWebsiteUsers(auth, websiteId))) {
    return unauthorized();
  }

  const websiteUser = await getWebsiteUser(websiteId, userId);

  if (!websiteUser) {
    return badRequest({ message: 'The user does not have access to this website.' });
  }

  await deleteWebsiteUser(websiteId, userId);

  return ok();
}
