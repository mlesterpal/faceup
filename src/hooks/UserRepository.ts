import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CURRENT_USER_ID } from "../constants/currentUser";
import type { CreateUser, CreateUserPayload } from "../entities/post/CreateUser";
import type { UpdateProfilePictureResponse } from "../entities/response/UpdateProfilePictureResponse";
import type { User } from "../entities/response/User";
import APIClient, { type FetchResponse } from "../services/apiClient";
import { getUser, uploadProfilePicture } from "../services/userService";
import { formatBirthDateIso } from "../utils/formatBirthDateIso";

const createUserClient = new APIClient<CreateUserPayload>("/user");
const usersClient = new APIClient<User>("/user");

function toCreateUserPayload(data: CreateUser): CreateUserPayload {
	const { birthMonth, birthDay, birthYear, ...rest } = data;
	return {
		...rest,
		birthDate: formatBirthDateIso(birthYear, birthMonth, birthDay),
	};
}

export const useCreateUser = () => {
	return useMutation<CreateUserPayload, Error, CreateUser>({
		mutationFn: (data: CreateUser) => createUserClient.post(toCreateUserPayload(data)),
	});
};

export const useGetUser = (userId: number = CURRENT_USER_ID) =>
	useQuery<User>({
		queryKey: ["user", userId],
		queryFn: () => getUser(userId),
	});
 
export const getProfilePictureErrorMessage = (error: unknown): string => {
	if (axios.isAxiosError(error)) {
		const message = error.response?.data?.message;
		if (typeof message === "string") return message;
	}
	if (error instanceof Error) return error.message;
	return "Failed to upload profile picture.";
};

export const useUpdateProfilePicture = (userId: number = CURRENT_USER_ID) => {
	const queryClient = useQueryClient();

	return useMutation<UpdateProfilePictureResponse, Error, File>({
		mutationFn: (file) => uploadProfilePicture(userId, file),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", userId] });
		},
	});
};

export const useGetUsers = () => {
	return useQuery<FetchResponse<User>>({
		queryKey: ["users"],
		queryFn: () => usersClient.getAll(),
	});
};
