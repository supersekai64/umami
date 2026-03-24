import { ConfirmationForm } from '@/components/common/ConfirmationForm';
import { useDeleteQuery, useMessages, useModified } from '@/components/hooks';
import { Trash } from '@/components/icons';
import { DialogButton } from '@/components/input/DialogButton';
import { messages } from '@/components/messages';

export function WebsiteUserRemoveButton({
  websiteId,
  userId,
  userName,
  onSave,
}: {
  websiteId: string;
  userId: string;
  userName: string;
  onSave?: () => void;
}) {
  const { formatMessage, labels, FormattedMessage } = useMessages();
  const { mutateAsync, isPending, error } = useDeleteQuery(
    `/websites/${websiteId}/users/${userId}`,
  );
  const { touch } = useModified();

  const handleConfirm = async (close: () => void) => {
    await mutateAsync(null, {
      onSuccess: () => {
        touch('websites:users');
        onSave?.();
        close();
      },
    });
  };

  return (
    <DialogButton
      icon={<Trash />}
      title={formatMessage(labels.confirm)}
      variant="quiet"
      width="400px"
    >
      {({ close }) => (
        <ConfirmationForm
          message={
            <FormattedMessage
              {...messages.confirmRemove}
              values={{
                target: <b>{userName}</b>,
              }}
            />
          }
          isLoading={isPending}
          error={error}
          onConfirm={handleConfirm.bind(null, close)}
          onClose={close}
          buttonLabel={formatMessage(labels.remove)}
          buttonVariant="danger"
        />
      )}
    </DialogButton>
  );
}
