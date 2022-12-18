import { SendNotification } from "./send-notification"
import { InMemoeryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";

describe('Send notifications', () => {
    it('shoud be able to sand a notification', async () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const sendNotification = new SendNotification(notificationsRepository);

        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id'
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    })
})