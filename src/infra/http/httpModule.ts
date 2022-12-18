import { Module } from "@nestjs/common";
import { sendNotification } from "src/application/use-cases/send-notification";
import { DatabaseModule } from "../database/database.module";
import { NotificationsController } from "./controller/notifications.controller";

@Module({
    imports: [DatabaseModule],
    controllers: [NotificationsController],
    providers: [sendNotification]
})

export class httpModule {}