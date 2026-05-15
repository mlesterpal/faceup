import APIClient from "@/services/apiClient";
import type { CreatePost } from "@/components/entities/CreatePost";
import { useMutation } from "@tanstack/react-query";
const createPost = new APIClient<CreatePost>("/post");

export const useCreatePost = () => {
    return useMutation<void, Error, CreatePost>({
        mutationFn: (data: CreatePost) => createPost.post(data).then(() => undefined),
    });
};