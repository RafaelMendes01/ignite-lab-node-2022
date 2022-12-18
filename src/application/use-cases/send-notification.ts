import { Injectable } from "@nestjs/common";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { NotificationRepository } from "../repositories/notification-repository";

interface sendNotificationRequest {
    recipientId: string,
    content: string,
    category: string
}

interface sendNotificationResponse {
    notification: Notification
}

@Injectable()
export class sendNotification {
    constructor(private notificationRepository: NotificationRepository){}
    async execute(request: sendNotificationRequest): Promise<sendNotificationResponse> {
        const { recipientId, content, category } = request

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category
        })

        await this.notificationRepository.create(notification)

        return {notification};
    }
    }