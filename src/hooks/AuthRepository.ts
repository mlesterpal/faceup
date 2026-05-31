import { useMutation } from "@tanstack/react-query";
import type { LoginData } from "../entities/post/LoginData";
import type { User } from "../entities/response/User";
import APIClient from "../services/apiClient";

const loginClient = new APIClient<User>("/user/login");

export const useLogin = () => {
	return useMutation<User, Error, LoginData>({
		mutationFn: (data: LoginData) => loginClient.post(data),
	});
};
