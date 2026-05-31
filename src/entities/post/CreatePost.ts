export type CreatePostForm = {
	message?: string;
	image?: FileList;
};

export type CreatePostPayload = {
	message?: string;
	image?: File | null;
};
