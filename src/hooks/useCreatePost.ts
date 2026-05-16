import APIClient from "@/services/apiClient";
import type { CreatePostPayload } from "@/entities/CreatePost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { UserPosts } from "@/entities/response/UserPosts";

const createPost = new APIClient<UserPosts>("/post");
const getMyPost = new APIClient<UserPosts>("/post");

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

export const useGetPosts = (userId: number) => {
	return useQuery<UserPosts[]>({
		queryKey: ["posts", userId],
		queryFn: () =>
			getMyPost
				.getAll({
					params: { userId },
				})
				.then((res) => res.results),
	});
};
