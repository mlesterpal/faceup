import type { CreatePostForm } from "../../entities/post/CreatePost";
import type { UserPosts } from "../../entities/response/UserPosts";

export const EMPTY_POST_ERROR = "Add text or a photo to post";

export const toHomeFeedPosts = (posts: UserPosts[] | undefined) => {
	return posts ?? [];
};

export const toCreatePostPayload = (
	data: CreatePostForm,
	selectedImage: File | null,
) => {
	const trimmedMessage = data.message?.trim();
	const hasText = Boolean(trimmedMessage);
	const hasImage = selectedImage != null;

	return {
		hasContent: hasText || hasImage,
		payload: {
			message: trimmedMessage,
			image: selectedImage,
		},
	};
};
