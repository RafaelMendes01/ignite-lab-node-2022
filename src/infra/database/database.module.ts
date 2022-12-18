import { Module } from "@nestjs/common";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "./prisma/prisma.service";
import { prismaNotificationRepository } from "./prisma/repositories/prisma-notifications-repository";

@Module({
    providers: [PrismaService, {
        provide: NotificationRepository,
        useClass: prismaNotificationRepository
    }],
    exports: [NotificationRepository]
})
export class DatabaseModule{}