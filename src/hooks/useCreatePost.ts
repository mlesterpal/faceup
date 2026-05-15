import APIClient from "@/services/apiClient";
import type { CreatePost } from "@/entities/CreatePost";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { UserPosts } from "@/entities/response/UserPosts";

const createPost = new APIClient<CreatePost>("/post");
const getMyPost = new APIClient<UserPosts>("/post");

export const useCreatePost = () => {
	return useMutation<void, Error, CreatePost>({
		mutationFn: (data: CreatePost) =>
			createPost.post(data).then(() => undefined),
	});
};

export const useGetPosts = (userId: number) => {
	return useQuery<UserPosts[]>({	
		queryKey: ["posts", userId],
		queryFn: () =>
			getMyPost.getAll({
				params: { userId },
			}).then((res) => res.results),
	});
};