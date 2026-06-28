import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CURRENT_USER_ID } from "../constants/currentUser";
import type { UserNotification } from "../entities/response/UserNotification";
import { getNotifications, markNotificationAsRead, type MarkNotificationReadResponse } from "../services/notificationService";

export const useGetNotifications = (userId: number = CURRENT_USER_ID) => {
    return useQuery<UserNotification[]>({
        queryKey: ["notifications", userId],
        queryFn: () => getNotifications(userId),
    });
};

export const useMarkNotificationAsRead = (userId: number = CURRENT_USER_ID) => {
    const queryClient = useQueryClient();

    return useMutation<MarkNotificationReadResponse, Error, number>({
        mutationFn: (notificationId) => markNotificationAsRead(notificationId, userId),
        onSuccess: (_, notificationId) => {
            queryClient.setQueryData<UserNotification[] | undefined>(
                ["notifications", userId],
                (currentNotifications) => {
                    if (!currentNotifications) {
                        return currentNotifications;
                    }

                    return currentNotifications.map((notification) =>
                        notification.notificationId === notificationId
                            ? { ...notification, isRead: true }
                            : notification,
                    );
                },
            );

            queryClient.invalidateQueries({ queryKey: ["notifications", userId] });
        },
    });
};
