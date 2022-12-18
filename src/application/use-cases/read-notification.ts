import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface ReadNotificationResquest {
    notificationId: string;

}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
    constructor(private notificationsRepository: NotificationsRepository) {};


    async execute(request: ReadNotificationResquest): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findBy(notificationId);

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.read();

        await this.notificationsRepository.save(notification);
    };
}