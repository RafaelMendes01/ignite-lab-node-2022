import { makeNotification } from "../../../src/test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../src/test/repositories/in-memory-notification-repository";
import { getRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipients notification', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const getRecipient = new getRecipientNotifications(notificationRepository);

        await notificationRepository.create(makeNotification({recipientId: 'b'}));

        await notificationRepository.create(makeNotification( {recipientId: 'a'}));

        await notificationRepository.create(makeNotification({recipientId: 'a'}));


        const { notifications } = await getRecipient.execute({
            recipientId: 'a',
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'a' }),
            expect.objectContaining({ recipientId: 'a' }),
        ]))
    })
})