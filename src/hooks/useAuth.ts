import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "@/entities/LoginData";
import type { User } from "@/entities/User";
import APIClient from "@/services/apiClient";

const loginClient = new APIClient<User>("/user/login");

export const useLogin = () => {
	return useMutation<User, Error, LoginData>({
		mutationFn: (data: LoginData) => loginClient.post(data),
	});
};
