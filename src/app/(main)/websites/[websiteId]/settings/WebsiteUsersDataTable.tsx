import { Button, Dialog, DialogTrigger, Modal } from '@umami/react-zen';
import { DataGrid } from '@/components/common/DataGrid';
import { useMessages, useModified, useWebsiteUsersQuery } from '@/components/hooks';
import { Plus } from '@/components/icons';
import { WebsiteUserAddForm } from './WebsiteUserAddForm';
import { WebsiteUsersTable } from './WebsiteUsersTable';

export function WebsiteUsersDataTable({
  websiteId,
  allowEdit = false,
}: {
  websiteId: string;
  allowEdit?: boolean;
}) {
  const queryResult = useWebsiteUsersQuery(websiteId);
  const { formatMessage, labels } = useMessages();
  const { touch } = useModified();

  const handleSave = () => {
    touch('websites:users');
  };

  return (
    <DataGrid
      query={queryResult}
      allowSearch
      renderActions={
        allowEdit
          ? () => (
              <DialogTrigger>
                <Button>
                  <Plus />
                  {formatMessage(labels.addUser)}
                </Button>
                <Modal>
                  <Dialog title={formatMessage(labels.addUser)} style={{ width: 400 }}>
                    {({ close }) => (
                      <WebsiteUserAddForm
                        websiteId={websiteId}
                        onSave={handleSave}
                        onClose={close}
                      />
                    )}
                  </Dialog>
                </Modal>
              </DialogTrigger>
            )
          : undefined
      }
    >
      {({ data }) => (
        <WebsiteUsersTable data={data} websiteId={websiteId} allowEdit={allowEdit} />
      )}
    </DataGrid>
  );
}
