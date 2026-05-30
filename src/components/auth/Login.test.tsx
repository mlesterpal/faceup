import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import Login, {
	LOGIN_EMAIL_ERROR,
	LOGIN_EMAIL_NOT_FOUND_ERROR,
	PASSWORD_NOT_MATCH_ERROR,
} from "./Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "../ui/provider";
import { useLogin } from "@/hooks/useAuth";

vi.mock("../../assets/login.webp", () => ({ default: "login.webp" }));
vi.mock("@/hooks/useAuth", () => ({
	useLogin: vi.fn(),
}));


const renderLogin = () =>
	render(
		<Provider>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>,
	);

describe("Login", () => {
	beforeEach(() => {
		vi.mocked(useLogin).mockReturnValue({
			isPending: false,
			mutateAsync: vi.fn(),
		} as unknown as ReturnType<typeof useLogin>);
	});

	it("renders login form", () => {
		renderLogin();

		expect(screen.getByText("Login into FaceUp")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: "Create new Account" }),
		).toBeInTheDocument();
	});

	it(`shows "${LOGIN_EMAIL_ERROR}" when Login is clicked with invalid email`, async () => {
		const user = userEvent.setup();
		renderLogin();

		await user.click(screen.getByRole("button", { name: "Login" }));

		expect(screen.getByText(LOGIN_EMAIL_ERROR)).toBeInTheDocument();
	});

	it("submits email and password with valid form values", async () => {
		const user = userEvent.setup();
		const mutateAsync = vi.fn().mockResolvedValue(undefined);
		vi.mocked(useLogin).mockReturnValue({
			isPending: false,
			mutateAsync,
		} as unknown as ReturnType<typeof useLogin>);
		renderLogin();

		await user.type(screen.getByPlaceholderText("Email"), "mark@example.com");
		await user.type(screen.getByPlaceholderText("Password"), "password123");
		await user.click(screen.getByRole("button", { name: "Login" }));

		expect(mutateAsync).toHaveBeenCalledWith({
			email: "mark@example.com",
			password: "password123",
		});
	});

it(`shows "${PASSWORD_NOT_MATCH_ERROR}" when API returns 401`, async () => {
		const user = userEvent.setup();
		const unauthorizedError = new axios.AxiosError("Unauthorized");
		unauthorizedError.response = {
			status: 401,
			data: {},
			statusText: "Unauthorized",
			headers: {},
			config: {} as never,
		};
		vi.mocked(useLogin).mockReturnValue({
			isPending: false,
			mutateAsync: vi.fn().mockRejectedValue(unauthorizedError),
		} as unknown as ReturnType<typeof useLogin>);
		renderLogin();

		await user.type(screen.getByPlaceholderText("Email"), "mark@example.com");
		await user.type(screen.getByPlaceholderText("Password"), "wrong-password");
		await user.click(screen.getByRole("button", { name: "Login" }));

		expect(
		screen.getByText(PASSWORD_NOT_MATCH_ERROR),
		).toBeInTheDocument();
	});

	it(`shows "${LOGIN_EMAIL_NOT_FOUND_ERROR}" when API returns 404`, async () => {
		const user = userEvent.setup();
		const notFoundError = new axios.AxiosError("Not Found");
		notFoundError.response = {
			status: 404,
			data: {},
			statusText: "Not Found",
			headers: {},
			config: {} as never,
		};
		vi.mocked(useLogin).mockReturnValue({
			isPending: false,
			mutateAsync: vi.fn().mockRejectedValue(notFoundError),
		} as unknown as ReturnType<typeof useLogin>);
		renderLogin();

		await user.type(screen.getByPlaceholderText("Email"), "missing@example.com");
		await user.type(screen.getByPlaceholderText("Password"), "password123");
		await user.click(screen.getByRole("button", { name: "Login" }));

		expect(
			screen.getByText(LOGIN_EMAIL_NOT_FOUND_ERROR),
		).toBeInTheDocument();
	});
});
