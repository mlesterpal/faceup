import { axiosInstance } from "./apiClient";
import type { UserNotification } from "../entities/response/UserNotification";

const base = "/notification";

type NotificationResults<T> = { results: T[] };

export const getNotifications = async (userId: number): Promise<UserNotification[]> => {
    const { data } = await axiosInstance.get<NotificationResults<UserNotification>>(base, {
        params: { userId },
    });

    return data.results ?? [];
};
