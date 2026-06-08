export type TogglePostLikeResponse = {
	postId: number;
	userId: number;
	liked: boolean;
	likeCount: number;
	message: string;
};
