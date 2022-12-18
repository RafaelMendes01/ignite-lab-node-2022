import { cancelNotification } from "@application/use-cases/cancel-notification";
import { countRecipientNotifications } from "@application/use-cases/count-recipient-notifications";
import { getRecipientNotifications } from "@application/use-cases/get-recipient-notifications";
import { readNotification } from "@application/use-cases/read-notification";
import { unreadNotification } from "@application/use-cases/unread-notification";
import { Module } from "@nestjs/common";
import { sendNotification } from "src/application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controller/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [
    sendNotification,
    cancelNotification,
    countRecipientNotifications,
    readNotification,
    unreadNotification,
    getRecipientNotifications
   ]
})

export class httpModule {}