import { hasPermission } from '@/lib/auth';
import { PERMISSIONS } from '@/lib/constants';
import type { Auth } from '@/lib/types';
import { getWebsite, getWebsiteUser } from '@/queries/prisma';

export async function canViewWebsite({ user, shareToken }: Auth, websiteId: string) {
  if (user?.isAdmin) {
    return true;
  }

  if (shareToken?.websiteId === websiteId) {
    return true;
  }

  if (!user) {
    return false;
  }

  // Any authenticated user can view any website
  return true;
}

export async function canViewAllWebsites({ user }: Auth) {
  return user.isAdmin;
}

export async function canCreateWebsite({ user }: Auth) {
  return user.isAdmin;
}

export async function canUpdateWebsite({ user }: Auth, websiteId: string) {
  if (user.isAdmin) {
    return true;
  }

  const website = await getWebsite(websiteId);

  if (!website) {
    return false;
  }

  if (website.userId) {
    if (user.id === website.userId) {
      return true;
    }

    const websiteUser = await getWebsiteUser(websiteId, user.id);

    return websiteUser ? hasPermission(websiteUser.role, PERMISSIONS.websiteUpdate) : false;
  }

  return false;
}

export async function canDeleteWebsite({ user }: Auth, websiteId: string) {
  return user.isAdmin;
}

export async function canManageWebsiteUsers({ user }: Auth, websiteId: string) {
  if (user.isAdmin) {
    return true;
  }

  const website = await getWebsite(websiteId);

  if (!website) {
    return false;
  }

  return website.userId === user.id;
}
