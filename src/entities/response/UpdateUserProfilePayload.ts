import type { User } from "./User";

export type UpdateUserProfilePayload = Partial<
	Pick<
		User,
		| "gender"
		| "birthDate"
		| "bio"
		| "address"
		| "work"
		| "highSchool"
		| "college"
		| "hobbies"
		| "phone"
	>
>;
