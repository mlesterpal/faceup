import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login, { LOGIN_EMAIL_ERROR } from "./Login";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "../ui/provider";

vi.mock("../../assets/login.webp", () => ({ default: "login.webp" }));


const renderLogin = () =>
	render(
		<Provider>
			<MemoryRouter>
				<Login />
			</MemoryRouter>
		</Provider>,
	);

describe("Login", () => {
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
});
