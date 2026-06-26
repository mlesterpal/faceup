export type UserNotification = {
    notificationId: number;
    recipientUserId: number;
    actorUserId?: number | null;
    actorName: string;
    actorProfilePicture?: string | null;
    type: string;
    message: string;
    createdAt: string;
    isRead: boolean;
    relatedEntityType?: string | null;
    relatedEntityId?: number | null;
};
