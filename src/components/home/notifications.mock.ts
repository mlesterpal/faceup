export type NotificationItem = {
	id: string;
	avatarUrl?: string;
	message: string;
	timestamp: string;
	isUnread: boolean;
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
	{
		id: "n1",
		message: "Jane Doe liked your post.",
		timestamp: "5m",
		isUnread: true,
	},
	{
		id: "n2",
		message: "John Smith commented on your photo.",
		timestamp: "20m",
		isUnread: true,
	},
	{
		id: "n3",
		message: "Alex Cruz sent you a friend request.",
		timestamp: "1h",
		isUnread: false,
	},
	{
		id: "n4",
		message: "Maria Santos mentioned you in a comment.",
		timestamp: "3h",
		isUnread: false,
	},
];
