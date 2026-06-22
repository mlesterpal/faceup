import { axiosInstance } from "./apiClient";
import type { User } from "../entities/response/User";

export const getUser = (userId: number): Promise<User> =>
	axiosInstance.get<User>(`/user/${userId}`).then((res) => res.data);

export const uploadProfilePicture = (userId: number, file: File) => {
		const formData = new FormData();
	formData.append("image", file);

	return axiosInstance
		.post<{ profilePictureUrl: string }>(
			`/user/${userId}/profile-picture`,
			formData,
			{
				headers: { "Content-Type": "multipart/form-data" },
			},
		)
		.then((res) => res.data);
};
