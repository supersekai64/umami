import {
  Button,
  Form,
  FormButtons,
  FormField,
  FormSubmitButton,
  ListItem,
  Select,
  TextField,
} from '@umami/react-zen';
import { useMessages, useUpdateQuery } from '@/components/hooks';
import { ROLES } from '@/lib/constants';

export function WebsiteUserAddForm({
  websiteId,
  onSave,
  onClose,
}: {
  websiteId: string;
  onSave?: () => void;
  onClose?: () => void;
}) {
  const { mutateAsync, error, isPending } = useUpdateQuery(`/websites/${websiteId}/users`);
  const { formatMessage, labels, getErrorMessage } = useMessages();

  const handleSubmit = async (data: any) => {
    await mutateAsync(data, {
      onSuccess: async () => {
        onSave?.();
        onClose?.();
      },
    });
  };

  return (
    <Form
      onSubmit={handleSubmit}
      error={getErrorMessage(error)}
      defaultValues={{ role: ROLES.websiteView }}
    >
      <FormField
        label={formatMessage(labels.username)}
        name="username"
        rules={{ required: formatMessage(labels.required) }}
      >
        <TextField />
      </FormField>
      <FormField
        name="role"
        rules={{ required: formatMessage(labels.required) }}
        label={formatMessage(labels.role)}
      >
        <Select>
          <ListItem id={ROLES.websiteEdit}>{formatMessage(labels.websiteEdit)}</ListItem>
          <ListItem id={ROLES.websiteView}>{formatMessage(labels.websiteView)}</ListItem>
        </Select>
      </FormField>
      <FormButtons>
        <Button isDisabled={isPending} onPress={onClose}>
          {formatMessage(labels.cancel)}
        </Button>
        <FormSubmitButton variant="primary" isDisabled={isPending}>
          {formatMessage(labels.save)}
        </FormSubmitButton>
      </FormButtons>
    </Form>
  );
}
