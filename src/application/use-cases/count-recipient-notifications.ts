import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notifications-not-found";

interface CountRecipientNotificationsResquest {
    recipientId: string;

}

interface CountRecipientNotificationsResponse {
    count: number;
}

@Injectable()
export class CountRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {};


    async execute(request: CountRecipientNotificationsResquest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

       return {
        count
       }
    };
}