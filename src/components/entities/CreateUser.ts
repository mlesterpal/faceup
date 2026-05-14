export type CreateUser = {
	firstName: string;
	lastName: string;
	birthMonth: string;
	birthDay: string;
	birthYear: string;
	gender: string;
	email: string;
	password: string;
};

/** Body sent to the API (single `birthDate` instead of split fields). */
export type CreateUserPayload = Omit<
	CreateUser,
	"birthMonth" | "birthDay" | "birthYear" 
> & {
	birthDate: string;
};
