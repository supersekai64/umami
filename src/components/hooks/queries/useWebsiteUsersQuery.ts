import { useApi } from '../useApi';
import { useModified } from '../useModified';
import { usePagedQuery } from '../usePagedQuery';

export function useWebsiteUsersQuery(websiteId: string) {
  const { get } = useApi();
  const { modified } = useModified(`websites:users`);

  return usePagedQuery({
    queryKey: ['websites:users', { websiteId, modified }],
    queryFn: (params: any) => {
      return get(`/websites/${websiteId}/users`, params);
    },
    enabled: !!websiteId,
  });
}
