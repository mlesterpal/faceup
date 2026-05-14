import { useMutation } from "@tanstack/react-query";
import type {
	CreateUser,
	CreateUserPayload,
} from "@/components/entities/CreateUser";
import APIClient from "@/services/apiClient";
import { formatBirthDateIso } from "@/utils/formatBirthDateIso";

const createUser = new APIClient<CreateUserPayload>("/user");

function toCreateUserPayload(data: CreateUser): CreateUserPayload {
	const { birthMonth, birthDay, birthYear, ...rest } = data;
	return {
		...rest,
		birthDate: formatBirthDateIso(birthYear, birthMonth, birthDay),
	};
}

export const useCreateUser = () => {
	return useMutation<CreateUserPayload, Error, CreateUser>({
		mutationFn: (data: CreateUser) =>
			createUser.post(toCreateUserPayload(data)),
	});
};
