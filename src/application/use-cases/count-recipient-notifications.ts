import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";

interface countRecipientNotificationsRequest {
    recipientId: string;
}

interface countRecipientNotificationsResponse {
    count: Number;
}

@Injectable()
export class countRecipientNotifications {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: countRecipientNotificationsRequest): Promise<countRecipientNotificationsResponse> {
        const { recipientId } = request

        const count = await this.notificationRepository.countManyByRecipientId(recipientId);

        return {
            count
        }
    }
}