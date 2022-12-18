import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { sendNotification } from '@application/use-cases/send-notification';
import { createNotificationBody } from '../DTO/createNotification.body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { cancelNotification } from '@application/use-cases/cancel-notification';
import { readNotification } from '@application/use-cases/read-notification';
import { unreadNotification } from '@application/use-cases/unread-notification';
import { countRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { getRecipientNotifications } from '@application/use-cases/get-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
  private sendNotification: sendNotification,
  private cancelNotification: cancelNotification, 
  private readNotification: readNotification,
  private unreadNotification: unreadNotification,
  private countRecipientNotifications: countRecipientNotifications,
  private getRecipientNotifications: getRecipientNotifications
  ) { }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  };

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string): Promise<{count: Number}> {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId: recipientId
    });

    return {
      count
    }
   };

   @Get('from/:recipientId')
   async getcountFromRecipient(@Param('recipientId') recipientId: string){
     const { notifications } = await this.getRecipientNotifications.execute({
       recipientId: recipientId
     });
 
     return {
       notifications: notifications.map(NotificationViewModel.toHTTP)
     }
    };

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    })
  };;

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    })
  };;


  @Post()
  async create(@Body() body: createNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    })

    return NotificationViewModel.toHTTP(notification);
  }
}
