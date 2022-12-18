import { InMemoryNotificationRepository } from "../../../src/test/repositories/in-memory-notification-repository";
import { sendNotification } from "./send-notification"

describe('send notification', () => {
    it('should be able to send a notification', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const sendNotifications = new sendNotification(notificationRepository);

        const {notification} = await sendNotifications.execute({
            recipientId: 'aaaaaaaaaaaaa',
            content: 'aaaaaaaaaaaaaa',
            category: 'aaaaaaaaaaaaaa'
        })

        expect(notification).toBeTruthy();

        const isNotEmpty = notificationRepository.notifications.length !== 0;

        expect(isNotEmpty).toEqual(true);
        expect(notificationRepository.notifications[0]).toEqual(notification);
    })
})