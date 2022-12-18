import { InMemoeryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";
import { makeNotification } from "@test/factories/notification-factory";

describe('Get notifications', () => {
    it('shoud be able to get recipient notification', async () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const getRecipientNotification = new GetRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}));

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-1'}));

        await notificationsRepository.create(makeNotification({ recipientId: 'recipient-2'}));

        const { notifications } = await getRecipientNotification.execute({
            recipientId: 'recipient-1'
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.objectContaining([
                expect.objectContaining({ recipientId: 'recipient-1' }),
                expect.objectContaining({ recipientId: 'recipient-1' })
            ]
            )
        )
    });
})