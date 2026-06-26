import { useQuery } from "@tanstack/react-query";
import { CURRENT_USER_ID } from "../constants/currentUser";
import type { UserNotification } from "../entities/response/UserNotification";
import { getNotifications } from "../services/notificationService";

export const useGetNotifications = (userId: number = CURRENT_USER_ID) => {
    return useQuery<UserNotification[]>({
        queryKey: ["notifications", userId],
        queryFn: () => getNotifications(userId),
    });
};
