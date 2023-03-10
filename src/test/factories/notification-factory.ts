import { Content } from "../../application/entities/content";
import { Notification, NotificationProps } from "../../application/entities/notification";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}){
    return new Notification({
        recipientId: 'a',
        content: new Content('recipient-1'),
        category: 'aaaaaaaaaaaaa',
        ...override  
    })
}