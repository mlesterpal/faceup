import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { CURRENT_USER_ID } from "@/constants/currentUser";
import type { UpdateProfilePictureResponse } from "@/entities/UpdateProfilePictureResponse";
import { uploadProfilePicture } from "@/services/userService";

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
