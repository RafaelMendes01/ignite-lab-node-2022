import { Content } from "./content"
import { Notification } from "./notification"

describe('notification', () => {
    it('it should be able to create a notification', () => {
        const notification = new Notification({
            recipientId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            content: new Content('aaaaaaaaaaaaaaa'),
            category: 'aaaaaaaaaaaaa'
        })

        expect(notification).toBeTruthy()
    })
})
