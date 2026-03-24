import { Prisma } from '@/generated/prisma/client';
import { uuid } from '@/lib/crypto';
import prisma from '@/lib/prisma';
import type { QueryFilters } from '@/lib/types';

import WebsiteUserFindManyArgs = Prisma.WebsiteUserFindManyArgs;

export async function findWebsiteUser(criteria: Prisma.WebsiteUserFindUniqueArgs) {
  return prisma.client.websiteUser.findUnique(criteria);
}

export async function getWebsiteUser(websiteId: string, userId: string) {
  return prisma.client.websiteUser.findFirst({
    where: {
      websiteId,
      userId,
    },
  });
}

export async function getWebsiteUsers(criteria: WebsiteUserFindManyArgs, filters?: QueryFilters) {
  const { search } = filters || {};

  const where: Prisma.WebsiteUserWhereInput = {
    ...criteria.where,
    ...prisma.getSearchParameters(search, [{ user: { username: 'contains' } }]),
  };

  return prisma.pagedQuery(
    'websiteUser',
    {
      ...criteria,
      where,
    },
    filters,
  );
}

export async function createWebsiteUser(userId: string, websiteId: string, role: string) {
  return prisma.client.websiteUser.create({
    data: {
      id: uuid(),
      userId,
      websiteId,
      role,
    },
  });
}

export async function updateWebsiteUser(
  websiteUserId: string,
  data: Prisma.WebsiteUserUpdateInput,
) {
  return prisma.client.websiteUser.update({
    where: {
      id: websiteUserId,
    },
    data,
  });
}

export async function deleteWebsiteUser(websiteId: string, userId: string) {
  return prisma.client.websiteUser.deleteMany({
    where: {
      websiteId,
      userId,
    },
  });
}

export async function deleteWebsiteUsers(websiteId: string) {
  return prisma.client.websiteUser.deleteMany({
    where: {
      websiteId,
    },
  });
}
