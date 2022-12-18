import { makeNotification } from "../../test/factories/notification-factory";
import { Notification } from "../entities/notification";
import { InMemoryNotificationRepository } from "../../test/repositories/in-memory-notification-repository";
import { unreadNotification } from "./unread-notification";

describe('unread notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const unreadNotifications = new unreadNotification(notificationRepository);

        const notification = new Notification(makeNotification({readAt: new Date()}));

        await notificationRepository.create(notification);

        await unreadNotifications.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].readAt).toBeNull()
    })

    it('should not be able to unread a notification when it does not exist', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const unreadNotifications = new unreadNotification(notificationRepository);

        expect(async () => {
            return await unreadNotifications.execute({
                notificationId: 'fake notification id',
            });
        }).rejects.toThrow()
    })
})