export type TogglePostShareResponse = {
	postId: number;
	userId: number;
	isShared: boolean;
	shareCount: number;
	message: string;
};