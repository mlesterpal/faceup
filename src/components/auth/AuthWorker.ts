import axios from "axios";

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LOGIN_EMAIL_ERROR = "Please enter a valid email";
export const LOGIN_EMAIL_NOT_FOUND_ERROR = "User not found.";
export const PASSWORD_NOT_MATCH_ERROR = "Passwords do not match";
export const LOGIN_GENERIC_ERROR = "Login failed. Please try again.";

export const BIRTHDAY_FUTURE_ERROR = "Birthday must be today or earlier.";
export const EMAIL_ALREADY_REGISTERED_ERROR = "This email is already registered.";
export const SIGNUP_GENERIC_ERROR = "Sign up failed. Please try again.";

export type LoginFieldError = {
	field: "email" | "password";
	message: string;
};

export const isPasswordNotMatchError = (error: unknown): boolean => {
	return (
		error instanceof Error &&
		error.message.toLowerCase().includes("passwords do not match")
	);
};

export const mapLoginErrorToField = (error: unknown): LoginFieldError => {
	if (axios.isAxiosError(error) && error.response?.status === 401 && error.response?.data.message.toLowerCase().includes("invalid password")) {
		return { field: "password", message: "so dito nga" };
	}
	if (axios.isAxiosError(error) && error.response?.status === 404) {
		return { field: "email", message: LOGIN_EMAIL_NOT_FOUND_ERROR };
	}
	if (isPasswordNotMatchError(error)) {
		return { field: "password", message: "galing monga pala" };
	}
	return { field: "email", message: LOGIN_GENERIC_ERROR };
};

export const isEmailAlreadyRegisteredError = (error: unknown): boolean => {
	if (axios.isAxiosError(error)) {
		return error.response?.status === 409;
	}

	return (
		error instanceof Error &&
		error.message.toLowerCase().includes("already registered")
	);
};

export const isBirthDateInFuture = (
	birthMonth: string,
	birthDay: string,
	birthYear: string,
): boolean => {
	if (!birthMonth || !birthDay || !birthYear) return false;

	const birthDate = new Date(
		Number(birthYear),
		Number(birthMonth) - 1,
		Number(birthDay),
	);
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return birthDate > today;
};

export type SignupFieldError = {
	field: "email" | "password";
	message: string;
};

export const mapSignupErrorToField = (error: unknown): SignupFieldError => {
	if (isEmailAlreadyRegisteredError(error)) {
		return { field: "email", message: EMAIL_ALREADY_REGISTERED_ERROR };
	}
	if (isPasswordNotMatchError(error)) {
		return { field: "password", message: PASSWORD_NOT_MATCH_ERROR };
	}
	return { field: "email", message: SIGNUP_GENERIC_ERROR };
};
