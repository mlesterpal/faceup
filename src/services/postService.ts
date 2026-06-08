import { axiosInstance } from "./apiClient";
import type { UserPosts } from "../entities/response/UserPosts";
import type { TogglePostLikeResponse } from "../entities/response/TogglePostLikeResponse";
import type { TogglePostShareResponse } from "@/entities/response/TogglePostShareResponse";

const base = "/post";

type PostResults<T> = { results: T[] };

type TogglePostLikePayload = { userId: number };

export const getPosts = async (
	userId?: number | null,
	viewerUserId?: number | null,
): Promise<UserPosts[]> => {
	const { data } = await axiosInstance.get<PostResults<UserPosts>>(base, {
		params: {
			...(userId != null ? { userId } : {}),
			...(viewerUserId != null ? { viewerUserId } : {}),
		},
	});

	return data.results ?? [];
};

export const togglePostLike = async (
	postId: number,
	userId: number,
): Promise<TogglePostLikeResponse> => {
	const { data } = await axiosInstance.post<TogglePostLikeResponse>(
		`${base}/${postId}/like/toggle`,
		{ userId } satisfies TogglePostLikePayload,
	);

	return data;
};

type TogglePostSharePayload = { userId: number };

export const togglePostShare = async (
	postId: number,
	userId: number,
): Promise<TogglePostShareResponse> => {
	const { data } = await axiosInstance.post<TogglePostShareResponse>(
		`${base}/${postId}/share/toggle`,
		{ userId } satisfies TogglePostSharePayload,
	);

	return data;
};