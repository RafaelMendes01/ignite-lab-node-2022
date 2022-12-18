import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { notificationNotFound } from "./errors/notification-not-found";

interface cancelNotificationRequest {
    notificationId: string;
}

type cancelNotificationResponse = void

@Injectable()
export class cancelNotification {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: cancelNotificationRequest): Promise<cancelNotificationResponse> {
        const { notificationId } = request

       const notification = await this.notificationRepository.findById(notificationId);

       if(!notification){
        throw new notificationNotFound();
       }

       notification.cancel();

       await this.notificationRepository.save(notification);
    }
}