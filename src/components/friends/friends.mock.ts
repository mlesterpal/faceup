import type { FriendRequest } from "@/components/friends/friends.types";
import post1 from "@/assets/post1.jpg";
import post2 from "@/assets/post2.jpg";
import post3 from "@/assets/post3.jpg";
import post4 from "@/assets/post4.jpg";

export const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
	{ id: "1", name: "Sarah Johnson", avatarUrl: post1, mutualFriendsCount: 12 },
	{ id: "2", name: "Michael Chen", avatarUrl: null, mutualFriendsCount: 3 },
	{ id: "3", name: "Emily Rodriguez", avatarUrl: post2, mutualFriendsCount: 8 },
	{ id: "4", name: "David Kim", avatarUrl: null, mutualFriendsCount: 1 },
	{ id: "5", name: "Jessica Martinez", avatarUrl: post3, mutualFriendsCount: 15 },
	{ id: "6", name: "James Wilson", avatarUrl: post4, mutualFriendsCount: 6 },
	{ id: "7", name: "Amanda Taylor", avatarUrl: null, mutualFriendsCount: 4 },
	{ id: "8", name: "Christopher Brown", avatarUrl: post1, mutualFriendsCount: 9 },
	{ id: "9", name: "Ashley Davis", avatarUrl: post2, mutualFriendsCount: 2 },
	{ id: "10", name: "Daniel Anderson", avatarUrl: null, mutualFriendsCount: 7 },
	{ id: "11", name: "Nicole Thomas", avatarUrl: post3, mutualFriendsCount: 11 },
	{ id: "12", name: "Matthew Jackson", avatarUrl: post4, mutualFriendsCount: 5 },
	{ id: "13", name: "Stephanie White", avatarUrl: null, mutualFriendsCount: 14 },
	{ id: "14", name: "Andrew Harris", avatarUrl: post1, mutualFriendsCount: 0 },
];
