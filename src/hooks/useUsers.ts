import { useQuery } from "@tanstack/react-query";
import APIClient, { type FetchResponse } from "@/services/apiClient";
import type { User } from "@/entities/User";

const userClient = new APIClient<User>("/user");

export const useGetUsers = () => {
	return useQuery<FetchResponse<User>>({
		queryKey: ["users"],
		queryFn: () => userClient.getAll(),
	});
};
