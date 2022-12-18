import { InMemoeryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";
import { makeNotification } from "@test/factories/notification-factory";
import { UnreadNotification } from "./unread-notification";

describe('Unread notifications', () => {
    it('shoud be able to unread a notification', async () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        const notification = makeNotification({
            readAt: new Date()
        });

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    });
    it('should not be able to Unread a non existing notification', () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository);

        expect(() => {
            return unreadNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);


    })
})