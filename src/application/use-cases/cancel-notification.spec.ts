import { CancelNotification } from "./cancel-notification"
import { InMemoeryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { NotificationNotFound } from "./errors/notifications-not-found";
import { makeNotification } from "@test/factories/notification-factory";

describe('Cancel notifications', () => {
    it('shoud be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(expect.any(Date));
    });
    it('should not be able to cancel a non existing notification', () => {
        const notificationsRepository = new InMemoeryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository);

        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow(NotificationNotFound);


    })
})