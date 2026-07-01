import { axiosInstance } from "./apiClient";
import type { UpdateUserProfilePayload } from "../entities/response/UpdateUserProfilePayload";
import type { User } from "../entities/response/User";

export type UpdateProfileFieldVisibilityRequest = {
    fieldName: string;
    visibility: "Public" | "Private";
};

export type UpdateProfileFieldVisibilityResponse = {
    userId: number;
    fieldName: string;
    visibility: "Public" | "Private";
    message: string;
};

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

export const updateUserProfile = (
    userId: number,
    payload: UpdateUserProfilePayload,
): Promise<User> => {
    return axiosInstance
        .put<User>(`/user/${userId}/profile`, payload)
        .then((res) => res.data);
};

export const updateProfileFieldVisibility = (
    userId: number,
    payload: UpdateProfileFieldVisibilityRequest,
): Promise<UpdateProfileFieldVisibilityResponse> => {
    return axiosInstance
        .patch<UpdateProfileFieldVisibilityResponse>(
            `/user/${userId}/profile/visibility`,
            payload,
        )
        .then((res) => res.data);
};
