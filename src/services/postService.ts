import { axiosInstance } from "./apiClient";
import type { UserPosts } from "../entities/response/UserPosts";
import type { TogglePostLikeResponse } from "../entities/response/TogglePostLikeResponse";

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
