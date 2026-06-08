export type UserPosts = {
	postId: number;
	userId: number;
	message: string;
	firstName: string;
	imageUrl?: string | null;
	profilePicture?: string | null;
	createdAt: string;
	likeCount: number;
	isLiked: boolean;
	shareCount: number;
	isShared: boolean;
};
