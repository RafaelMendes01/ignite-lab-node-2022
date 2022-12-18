import { Injectable } from "@nestjs/common";
import { NotificationRepository } from "../repositories/notification-repository";
import { notificationNotFound } from "./errors/notification-not-found";

interface readNotificationRequest {
    notificationId: string;
}

type readNotificationResponse = void

@Injectable()
export class readNotification {
    constructor(private notificationRepository: NotificationRepository) { }
    async execute(request: readNotificationRequest): Promise<readNotificationResponse> {
        const { notificationId } = request

       const notification = await this.notificationRepository.findById(notificationId);

       if(!notification){
        throw new notificationNotFound();
       }

       notification.read();

       await this.notificationRepository.save(notification);
    }
}