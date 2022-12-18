import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface getRecipientNotificationsRequest {
    recipientId: string;
}

interface getRecipientNotificationsResponse {
   notifications: Notification[];
}

@Injectable()
export class getRecipientNotifications {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: getRecipientNotificationsRequest): Promise<getRecipientNotificationsResponse> {
        const { recipientId } = request

        const notifications = await this.notificationRepository.findManyByRecipientId(recipientId);

        return {
            notifications
        }
    }
}