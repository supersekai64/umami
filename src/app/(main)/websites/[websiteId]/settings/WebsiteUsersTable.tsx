import { DataColumn, DataTable, Row } from '@umami/react-zen';
import { useMessages } from '@/components/hooks';
import { ROLES } from '@/lib/constants';
import { WebsiteUserRemoveButton } from './WebsiteUserRemoveButton';

export function WebsiteUsersTable({
  data = [],
  websiteId,
  allowEdit = false,
}: {
  data: any[];
  websiteId: string;
  allowEdit: boolean;
}) {
  const { formatMessage, labels } = useMessages();

  const roles = {
    [ROLES.websiteEdit]: formatMessage(labels.websiteEdit),
    [ROLES.websiteView]: formatMessage(labels.websiteView),
  };

  return (
    <DataTable data={data}>
      <DataColumn id="username" label={formatMessage(labels.username)}>
        {(row: any) => row?.user?.username}
      </DataColumn>
      <DataColumn id="role" label={formatMessage(labels.role)}>
        {(row: any) => roles[row?.role]}
      </DataColumn>
      {allowEdit && (
        <DataColumn id="action" align="end">
          {(row: any) => (
            <Row alignItems="center" maxHeight="20px">
              <WebsiteUserRemoveButton
                websiteId={websiteId}
                userId={row?.user?.id}
                userName={row?.user?.username}
              />
            </Row>
          )}
        </DataColumn>
      )}
    </DataTable>
  );
}
