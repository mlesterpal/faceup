import APIClient from "../services/apiClient";
import type { CreatePostPayload } from "../entities/post/CreatePost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserPosts } from "../entities/response/UserPosts";
import { CURRENT_USER_ID } from "../constants/currentUser";
import {
	getPostLikes,
	getPosts,
	togglePostLike,
	togglePostShare,
} from "../services/postService";
import type { TogglePostLikeResponse } from "../entities/response/TogglePostLikeResponse";
import type { TogglePostShareResponse } from "@/entities/response/TogglePostShareResponse";
import { deleteUserPost } from "../services/postService";
import type { DeleteUserPostResponse } from "../entities/response/DeleteUserPostResponse";
import type { PostLikeUser } from "../entities/response/PostLikeUser";

const createPost = new APIClient<UserPosts>("/post");

const buildPostFormData = ({ message, image }: CreatePostPayload): FormData => {
	const formData = new FormData();
	formData.append("message", message?.trim() ?? "");
	if (image) {
		formData.append("image", image);
	}
	return formData;
};

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, CreatePostPayload>({
		mutationFn: (data) =>
			createPost.postFormData(buildPostFormData(data)).then(() => undefined),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};

export const useGetPosts = (userId: number | null) => {
	return useQuery<UserPosts[]>({
		queryKey: ["posts", userId ?? "all"],
		queryFn: () => getPosts(userId, CURRENT_USER_ID),
	});
};

export const useGetPostLikes = (
	postId: number | null,
	enabled: boolean = true,
) => {
	return useQuery<PostLikeUser[]>({
		queryKey: ["post-likes", postId],
		queryFn: () => getPostLikes(postId!),
		enabled: enabled && postId != null,
	});
};

export const useTogglePostLike = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<TogglePostLikeResponse, Error, number>({
		mutationFn: (postId) => togglePostLike(postId, userId),
		onSuccess: (data) => {
			queryClient.setQueriesData<UserPosts[]>({ queryKey: ["posts"] }, (posts) =>
				posts?.map((post) =>
					post.postId === data.postId
						? { ...post, likeCount: data.likeCount, isLiked: data.liked }
						: post,
				),
			);
		},
	});
};

export const useTogglePostShare = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<TogglePostShareResponse, Error, number>({
		mutationFn: (postId) => togglePostShare(postId, userId),
		onSuccess: (data) => {
			queryClient.setQueriesData<UserPosts[]>({ queryKey: ["posts"] }, (posts) =>
				posts?.map((post) =>
					post.postId === data.postId
						? { ...post, shareCount: data.shareCount, isShared: data.isShared }
						: post,
				),
			);	
		},
	});
};

export const useDeleteUserPost = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<DeleteUserPostResponse, Error, number>({
		mutationFn: (postId: number) => deleteUserPost(postId, userId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
	});
};