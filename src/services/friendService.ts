import { axiosInstance } from "@/services/apiClient";
import type { FriendRequestItem } from "@/entities/FriendRequestItem";
import type { FriendSuggestion } from "@/entities/FriendSuggestion";
import type { FriendUser } from "@/entities/FriendUser";
import type { SendFriendRequestPayload } from "@/entities/SendFriendRequestPayload";

const base = "/friend";

type FriendResults<T> = { results: T[] };

const getResults = async <T>(url: string, userId: number): Promise<T[]> => {
	const { data } = await axiosInstance.get<FriendResults<T>>(url, {
		params: { userId },
	});
	return data.results ?? [];
};

export const getFriends = (userId: number) => getResults<FriendUser>(base, userId);

export const getIncomingFriendRequests = (userId: number) =>
	getResults<FriendRequestItem>(`${base}/incoming`, userId);

export const getOutgoingFriendRequests = (userId: number) =>
	getResults<FriendRequestItem>(`${base}/outgoing`, userId);

export const getFriendSuggestions = (userId: number) =>
	getResults<FriendSuggestion>(`${base}/suggestions`, userId);

export const sendFriendRequest = (userId: number, receiverId: number) =>
	axiosInstance.post<{ message: string }>(
		`${base}/request`,
		{ receiverId } satisfies SendFriendRequestPayload,
		{ params: { userId } },
	);

export const acceptFriendRequest = (userId: number, friendshipId: number) =>
	axiosInstance.post<{ message: string }>(`${base}/accept/${friendshipId}`, null, {
		params: { userId },
	});	

export const rejectFriendRequest = (userId: number, friendshipId: number) =>
	axiosInstance.post<{ message: string }>(`${base}/reject/${friendshipId}`, null, {
		params: { userId },
	});

export const cancelFriendRequest = (userId: number, friendshipId: number) =>
	axiosInstance.delete<{ message: string }>(`${base}/request/${friendshipId}`, {
		params: { userId },
	});

export const unfriend = (userId: number, otherUserId: number) =>
	axiosInstance.delete<{ message: string }>(`${base}/${otherUserId}`, {
		params: { userId },
	});
