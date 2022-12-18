import { Content } from "@application/entities/content";
import { Notification, NotificationProps } from "@application/entities/notification"

type override = Partial<NotificationProps>;

export function makeNotification(override: override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Nova solicitação de amizade!'),
        recipientId: 'example-recipient-id',
        ...override
    });
}