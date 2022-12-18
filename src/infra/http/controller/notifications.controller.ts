import { Body, Controller, Post } from '@nestjs/common';
import { sendNotification } from '@application/use-cases/send-notification';
import { createNotificationBody } from '../DTO/createNotification.body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: sendNotification) { }

  @Post()
  async create(@Body() body: createNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return { notification }
  }
}
