import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Provider } from "../ui/provider";
import { MemoryRouter } from "react-router-dom";
import Signup, {
	BIRTHDAY_FUTURE_ERROR,
	EMAIL_ALREADY_REGISTERED_ERROR,
} from "./Signup";
import { useCreateUser } from "../../hooks/useCreateUser";

vi.mock("../../hooks/useCreateUser", () => ({
	useCreateUser: vi.fn(),
}));

const renderSignup = () =>
	render(
		<Provider>
			<MemoryRouter>
				<Signup />
			</MemoryRouter>
		</Provider>,
	);

const fillValidSignupForm = async (user: ReturnType<typeof userEvent.setup>) => {
	await user.type(screen.getByPlaceholderText("First name"), "Mark");
	await user.type(screen.getByPlaceholderText("Last name"), "Test");

	const [monthSelect, daySelect, yearSelect, genderSelect] =
		screen.getAllByRole("combobox");

	await user.selectOptions(monthSelect, "1");
	await user.selectOptions(daySelect, "1");
	await user.selectOptions(yearSelect, "2024");
	await user.selectOptions(genderSelect, "male");
	await user.type(
		screen.getByPlaceholderText("Enter your email"),
		"taken@example.com",
	);
	await user.type(
		screen.getByPlaceholderText("Enter your password"),
		"password123",
	);
};

describe("Signup", () => {
	beforeEach(() => {
		vi.mocked(useCreateUser).mockReturnValue({
			isError: false,
			isPending: false,
			mutateAsync: vi.fn(),
		} as unknown as ReturnType<typeof useCreateUser>);
	});

	it("show validation message when birthday is in the future", async () => {
		const user = userEvent.setup();
		renderSignup();

		const birthYear = String(new Date().getFullYear());
		const birthMonth = "12";
		const birthDay = "5";

		const [monthSelect, daySelect, yearSelect] =
			screen.getAllByRole("combobox");

		await user.selectOptions(monthSelect, birthMonth);
		await user.selectOptions(daySelect, birthDay);
		await user.selectOptions(yearSelect, birthYear);
		await user.click(screen.getByRole("button", { name: "Submit" }));

		expect(screen.getByText(BIRTHDAY_FUTURE_ERROR)).toBeInTheDocument();
	});

	it("show validation message when email is already registered", async () => {
		const user = userEvent.setup();
		const emailAlreadyRegisteredError = new axios.AxiosError("Conflict");
		emailAlreadyRegisteredError.response = {
			status: 409,
			data: {},
			statusText: "Conflict",
			headers: {},
			config: {} as never,
		};

		vi.mocked(useCreateUser).mockReturnValue({
			isError: true,
			isPending: false,
			mutateAsync: vi.fn().mockRejectedValue(emailAlreadyRegisteredError),
		} as unknown as ReturnType<typeof useCreateUser>);

		renderSignup();
		await fillValidSignupForm(user);
		await user.click(screen.getByRole("button", { name: "Submit" }));

		expect(
			screen.getByText(EMAIL_ALREADY_REGISTERED_ERROR),
		).toBeInTheDocument();
	});
});