import { makeNotification } from "../../../src/test/factories/notification-factory";
import { Notification } from "../../../src/application/entities/notification";
import { InMemoryNotificationRepository } from "../../../src/test/repositories/in-memory-notification-repository";
import { cancelNotification } from "./cancel-notification";

describe('cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const cancelNotifications = new cancelNotification(notificationRepository);

        const notification = new Notification(makeNotification({recipientId: 'b'}));

        await notificationRepository.create(notification);

        await cancelNotifications.execute({
            notificationId: notification.id
        });

        expect(notificationRepository.notifications[0].canceledAt).toEqual(expect.any(Date))
    })

    it('should not be able to cancel a notification when it does not exist', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const cancelNotifications = new cancelNotification(notificationRepository);

        expect(async () => {
            return await cancelNotifications.execute({
                notificationId: 'fake notification id',
            });
        }).rejects.toThrow()
    })
})