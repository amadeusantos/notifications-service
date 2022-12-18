import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface UnreadNotificationResquest {
    notificationId: string;

}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};


    async execute(request: UnreadNotificationResquest): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findBy(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.notificationsRepository.save(notification);
    };
}