import { makeNotification } from "../../../src/test/factories/notification-factory";
import { InMemoryNotificationRepository } from "../../../src/test/repositories/in-memory-notification-repository";
import { countRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipients notification', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationRepository = new InMemoryNotificationRepository()
        const countRecipient = new countRecipientNotifications(notificationRepository);

        await notificationRepository.create(makeNotification({recipientId: 'b'}));

        await notificationRepository.create(makeNotification( {recipientId: 'a'}));

        await notificationRepository.create(makeNotification({recipientId: 'a'}));


        const { count } = await countRecipient.execute({
            recipientId: 'a',
        })

        expect(count).toEqual(2);
    })
})