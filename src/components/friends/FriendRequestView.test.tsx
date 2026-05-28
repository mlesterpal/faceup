import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";
import FriendRequestsView from "./FriendRequestsView";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import { type IUseIncomingFriendRequestsResult, useIncomingFriendRequests } from "../../hooks/useFriends";

const renderFriendRequestView = () =>
	render(
		<Provider>
			<MemoryRouter>
				<FriendRequestsView />
			</MemoryRouter>
		</Provider>,
	);

vi.mock("../../hooks/useFriends", () => ({   
    useIncomingFriendRequests: vi.fn(),
}));

vi.mock("./FriendshipActionButtons");


let _useIncomingFriendRequests: IUseIncomingFriendRequestsResult;

beforeEach(() => {
    _useIncomingFriendRequests = {
        data: [],
        isLoading: false,
        isError: false,
    } as IUseIncomingFriendRequestsResult;

    vi.mocked(useIncomingFriendRequests).mockImplementation(() => _useIncomingFriendRequests);
});

afterEach(() => {
    vi.clearAllMocks();
});


describe("FriendRequestView", () => {

    it("shows empty message when there are no friend requests", () => {
        renderFriendRequestView();
        expect(screen.getByText("No incoming friend requests.")).toBeInTheDocument();
    }); 

});