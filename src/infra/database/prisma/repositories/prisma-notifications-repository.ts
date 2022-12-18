import { Injectable } from "@nestjs/common";
import { Notification } from "@application/entities/notification";
import { NotificationRepository } from "@application/repositories/notification-repository";
import { PrismaService } from "../prisma.service";
import { prismaNotificationMapper } from "../mappers/prisma-notification-mappers";

@Injectable()
export class prismaNotificationRepository implements NotificationRepository {
    constructor(private prisma: PrismaService) { }
    async countManyByRecipientId(recipientId: string): Promise<Number> {
        const count = await this.prisma.notification.count({
            where: {
                recipientId,
            }
        });

        return count;
    }
   async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
        
       const notifications = await this.prisma.notification.findMany({
        where: {
            recipientId,
        },
       })

       return notifications.map((notifications) => {
        return prismaNotificationMapper.toDomain(notifications);
       })
    }
    async findById(notificationId: string): Promise<Notification | null> {
        const notification = await this.prisma.notification.findUnique({
            where: {
                id: notificationId
            }
        })

        if (!notification) {
            return null;
        }

        return prismaNotificationMapper.toDomain(notification);
    }
    async save(notification: Notification): Promise<void> {
        const raw = prismaNotificationMapper.toPrisma(notification);
        await this.prisma.notification.update({
            where: {
                id: raw.id,
            },
            data: raw,
        })
    }

    async create(notification: Notification): Promise<void> {
        const raw = prismaNotificationMapper.toPrisma(notification);
        await this.prisma.notification.create({
            data: raw
        })
    }

}