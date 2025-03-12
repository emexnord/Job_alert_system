import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Notification } from './models/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private readonly notificationModel: Model<Notification>,
  ) {}

  async createNotification(dto: CreateNotificationDto): Promise<Notification> {
    const notification = new this.notificationModel({
      recipient: new Types.ObjectId(dto.recipient),
      title: dto.title,
      content: dto.content,
      img: dto.img,
      url: dto.url,
      type: dto.type,
    });

    return await notification.save();
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    return await this.notificationModel
      .find({ recipient: new Types.ObjectId(userId) })
      .exec();
  }

  async getUnreadCount(userId: string): Promise<number> {
    return await this.notificationModel.countDocuments({
      recipient: new Types.ObjectId(userId),
      isRead: false,
    });
  }

  async markAsRead(
    notificationId: string,
    userId: string,
  ): Promise<Notification> {
    const notification = await this.notificationModel
      .findById(notificationId)
      .exec();
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    if (notification.recipient.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to mark this notification as read',
      );
    }
    notification.isRead = true;
    return await notification.save();
  }

  async markMultipleAsRead(
    notificationIds: string[],
    userId: string,
  ): Promise<Notification[]> {
    if (!notificationIds.every((id) => Types.ObjectId.isValid(id))) {
      throw new BadRequestException('One or more invalid IDs');
    }
    const notifications = await this.notificationModel
      .find({
        _id: { $in: notificationIds.map((id) => new Types.ObjectId(id)) },
        recipient: new Types.ObjectId(userId),
      })
      .exec();

    if (!notifications || notifications.length === 0) {
      throw new NotFoundException('Notifications not found');
    }

    notifications.forEach((notification) => {
      notification.isRead = true;
    });

    await Promise.all(notifications.map((notification) => notification.save()));
    return notifications;
  }

  async deleteNotification(
    notificationId: string,
    userId: string,
  ): Promise<any> {
    if (
      !Types.ObjectId.isValid(notificationId) ||
      !Types.ObjectId.isValid(userId)
    ) {
      throw new BadRequestException('Invalid ID');
    }
    const notification = await this.notificationModel
      .findById(notificationId)
      .exec();
    if (!notification) {
      throw new NotFoundException('Notification not found');
    }
    if (notification.recipient.toString() !== userId) {
      throw new UnauthorizedException(
        'You are not authorized to delete this notification',
      );
    }
    return await this.notificationModel
      .findByIdAndDelete(notificationId)
      .exec();
  }

  async deleteAllNotifications(ids: string[], userId: string): Promise<any> {
    if (!ids.every((id) => Types.ObjectId.isValid(id))) {
      throw new BadRequestException('One or more invalid IDs');
    }

    return await this.notificationModel
      .deleteMany({
        _id: { $in: ids.map((id) => new Types.ObjectId(id)) },
        recipient: new Types.ObjectId(userId),
      })
      .exec();
  }

  // Administrative methods
  async count(): Promise<number> {
    return await this.notificationModel.countDocuments();
  }
}
