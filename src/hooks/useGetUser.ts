import { useQuery } from "@tanstack/react-query";
import { CURRENT_USER_ID } from "@/constants/currentUser";
import { getUser } from "@/services/userService";

export const useGetUser = (userId: number = CURRENT_USER_ID) =>
	useQuery({
		queryKey: ["user", userId],
		queryFn: () => getUser(userId),
	});
