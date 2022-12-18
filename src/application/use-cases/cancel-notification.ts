import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface CancelNotificationResquest {
    notificationId: string;

}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};


    async execute(request: CancelNotificationResquest): Promise<CancelNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findBy(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.cancel();

        await this.notificationsRepository.save(notification);
    };
}