export type User = {
	id: number;
	firstName: string;
	lastName?: string;
	profilePicture?: string | null;
	gender?: string | null;
	birthDate?: string | null;
	bio?: string | null;
	address?: string | null;
	work?: string | null;
	highSchool?: string | null;
	college?: string | null;
	hobbies?: string | null;
	phone?: string | null;
};
