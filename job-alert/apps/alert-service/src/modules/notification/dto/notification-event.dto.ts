export enum NotificationEvents {
  JOB_ALERT = 'JOB_ALERT',
  WELCOME = 'WELCOME',
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  recipient: string;
  img: string;
  type: NotificationEvents;
  url: string;
  isRead: boolean;
  jobId?: string;
}
