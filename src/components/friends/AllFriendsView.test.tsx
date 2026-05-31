import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act, create, type ReactTestRenderer } from "react-test-renderer";
import { vi, beforeEach, afterEach, describe, expect, it } from "vitest";
import { Provider } from "../ui/provider";
import type { FriendUser } from "../../entities/response/FriendUser";
import { useFriends, type IUseFriendsResult } from "../../hooks/FriendRepository";
import AllFriendsView from "./AllFriendsView";
import FriendUserCard from "./FriendUserCard";

vi.mock("../../hooks/FriendRepository", () => ({
	useFriends: vi.fn(),
}));

vi.mock("./FriendshipActionButtons");

const renderAllFriendsView = () =>
	render(
		<Provider>
			<MemoryRouter>
				<AllFriendsView />
			</MemoryRouter>
		</Provider>,
	);

const createAllFriendsViewTree = (): ReactTestRenderer => {
	let testRenderer!: ReactTestRenderer;

	act(() => {
		testRenderer = create(
			<Provider>
				<MemoryRouter>
					<AllFriendsView />
				</MemoryRouter>
			</Provider>,
		);
	});

	return testRenderer;
};

describe("AllFriendsView", () => {
	let _useFriends: IUseFriendsResult;

	beforeEach(() => {
		_useFriends = {
			data: [],
			isLoading: false,
			isError: false,
		} as IUseFriendsResult;

		vi.mocked(useFriends).mockImplementation(() => _useFriends);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	it("shows empty message when there are no friends", () => {
		_useFriends = {
			data: [],
			isLoading: false,
			isError: false,
		} as IUseFriendsResult;

		renderAllFriendsView();

		expect(screen.getByText("You have no friends yet.")).toBeInTheDocument();
	});

	it("shows error message when API fails", () => {
		_useFriends = {
			data: undefined,
			isLoading: false,
			isError: true,
		} as IUseFriendsResult;

		renderAllFriendsView();
		expect(screen.getByText(/Could not load data/i)).toBeInTheDocument();
	});

	it("renders a card per friend", () => {
		const friends: FriendUser[] = [
			{ userId: 1, firstName: "A", lastName: "One" },
			{ userId: 2, firstName: "B", lastName: "Two" },
		];

		_useFriends = {
			data: friends,
			isLoading: false,
			isError: false,
		} as IUseFriendsResult;

		const testRenderer = createAllFriendsViewTree();
		const cards = testRenderer.root.findAllByType(FriendUserCard);

		expect(cards).toHaveLength(2);
	});
});
