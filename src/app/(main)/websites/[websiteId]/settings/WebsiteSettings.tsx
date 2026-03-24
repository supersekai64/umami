import { Column } from '@umami/react-zen';
import { Panel } from '@/components/common/Panel';
import { useLoginQuery, useMessages, useWebsite } from '@/components/hooks';
import { WebsiteData } from './WebsiteData';
import { WebsiteEditForm } from './WebsiteEditForm';
import { WebsiteShareForm } from './WebsiteShareForm';
import { WebsiteTrackingCode } from './WebsiteTrackingCode';
import { WebsiteUsersDataTable } from './WebsiteUsersDataTable';

export function WebsiteSettings({ websiteId }: { websiteId: string; openExternal?: boolean }) {
  const website = useWebsite();
  const { user } = useLoginQuery();
  const { formatMessage, labels } = useMessages();

  const isOwner = user?.isAdmin || website?.userId === user?.id;

  return (
    <Column gap="6">
      <Panel>
        <WebsiteEditForm websiteId={websiteId} />
      </Panel>
      <Panel>
        <WebsiteTrackingCode websiteId={websiteId} />
      </Panel>
      <Panel>
        <WebsiteShareForm websiteId={websiteId} shareId={website.shareId} />
      </Panel>
      {isOwner && website?.userId && (
        <Panel title={formatMessage(labels.sharedUsers)}>
          <WebsiteUsersDataTable websiteId={websiteId} allowEdit={isOwner} />
        </Panel>
      )}
      <Panel>
        <WebsiteData websiteId={websiteId} />
      </Panel>
    </Column>
  );
}
