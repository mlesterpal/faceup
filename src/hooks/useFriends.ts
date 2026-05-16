import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CURRENT_USER_ID } from "@/constants/currentUser";
import {
	acceptFriendRequest,
	cancelFriendRequest,
	getFriendSuggestions,
	getFriends,
	getIncomingFriendRequests,
	getOutgoingFriendRequests,
	rejectFriendRequest,
	sendFriendRequest,
	unfriend,
} from "@/services/friendService";

const getErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.message;
		if (typeof message === "string") return message;
	}
	if (error instanceof Error) return error.message;
	return "Something went wrong. Please try again.";
};

export const useFriends = (userId: number = CURRENT_USER_ID) =>
	useQuery({
		queryKey: ["friends", userId],
		queryFn: () => getFriends(userId),
	});

export const useIncomingFriendRequests = (userId: number = CURRENT_USER_ID) =>
	useQuery({
		queryKey: ["friend-incoming", userId],
		queryFn: () => getIncomingFriendRequests(userId),
	});

export const useOutgoingFriendRequests = (userId: number = CURRENT_USER_ID) =>
	useQuery({
		queryKey: ["friend-outgoing", userId],
		queryFn: () => getOutgoingFriendRequests(userId),
	});

export const useFriendSuggestions = (userId: number = CURRENT_USER_ID) =>
	useQuery({
		queryKey: ["friend-suggestions", userId],
		queryFn: () => getFriendSuggestions(userId),
	});

export const useSendFriendRequest = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (receiverId: number) =>
			sendFriendRequest(userId, receiverId).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
			queryClient.invalidateQueries({ queryKey: ["friend-outgoing"] });
		},
	});
};

export const useAcceptFriendRequest = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (friendshipId: number) =>
			acceptFriendRequest(userId, friendshipId).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-incoming"] });
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
		},
	});
};

export const useRejectFriendRequest = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (friendshipId: number) =>
			rejectFriendRequest(userId, friendshipId).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-incoming"] });
			queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
		},
	});
};

export const useCancelFriendRequest = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (friendshipId: number) =>
			cancelFriendRequest(userId, friendshipId).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friend-outgoing"] });
			queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
		},
	});
};

export const useUnfriend = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (otherUserId: number) =>
			unfriend(userId, otherUserId).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["friends"] });
			queryClient.invalidateQueries({ queryKey: ["friend-suggestions"] });
		},
	});
};

export { getErrorMessage };
