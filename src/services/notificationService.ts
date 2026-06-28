import { axiosInstance } from "./apiClient";
import type { UserNotification } from "../entities/response/UserNotification";

const base = "/notification";

type NotificationResults<T> = { results: T[] };
export type MarkNotificationReadResponse = {
    notificationId: number;
    userId: number;
    markedAsRead: boolean;
    message: string;
};

export const getNotifications = async (userId: number): Promise<UserNotification[]> => {
    const { data } = await axiosInstance.get<NotificationResults<UserNotification>>(base, {
        params: { userId },
    });

    return data.results ?? [];
};

export const markNotificationAsRead = async (
    notificationId: number,
    userId: number,
): Promise<MarkNotificationReadResponse> => {
    const { data } = await axiosInstance.patch<MarkNotificationReadResponse>(
        `${base}/${notificationId}/read`,
        null,
        {
            params: { userId },
        },
    );

    return data;
};
