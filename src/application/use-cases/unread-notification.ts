import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { notificationNotFound } from "./errors/notification-not-found";

interface unreadNotificationRequest {
    notificationId: string;
}

type unreadNotificationResponse = void

@Injectable()
export class unreadNotification {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: unreadNotificationRequest): Promise<unreadNotificationResponse> {
        const { notificationId } = request

       const notification = await this.notificationRepository.findById(notificationId);

       if(!notification){
        throw new notificationNotFound();
       }

       notification.unread();

       await this.notificationRepository.save(notification);
    }
}