import { makeNotification } from "../../../src/test/factories/notification-factory";
import { Notification } from "../../../src/application/entities/notification";
import { InMemoryNotificationRepository } from "../../../src/test/repositories/in-memory-notification-repository";
import { readNotification } from "./read-notification";

describe('read notification', () => {
    it('should be able to read a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const readNotifications = new readNotification(notificationRepository);

        const notification = new Notification(makeNotification({recipientId: 'b'}));

        await notificationRepository.create(notification);

        await readNotifications.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].readAt).toEqual(expect.any(Date))
    })

    it('should not be able to read a notification when it does not exist', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const readNotifications = new readNotification(notificationRepository);

        expect(async () => {
            return await readNotifications.execute({
                notificationId: 'fake notification id',
            });
        }).rejects.toThrow()
    })
})