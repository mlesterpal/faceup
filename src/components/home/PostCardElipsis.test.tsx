import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { Provider } from "../ui/provider"
import PostCardElipsis, { type PostCardElipsisProps } from "./PostCardElipsis"

//UserId 1 is the one who logged in

const renderPostCardElipsis = (props: PostCardElipsisProps) => {
    render(
        <Provider>
            <PostCardElipsis {...props} />
        </Provider>
    )
}

describe("PostCardElipsis", () => {
    it("renders the move trash menu item when Post belongs to the user", async () => {
        const user = userEvent.setup();
        renderPostCardElipsis({ userId: 1 });
        await user.click(document.getElementById("post-card-elipsis") as HTMLElement);
        expect(await screen.findByText("Move to trash")).toBeInTheDocument();
    });

    it("does not render the move trash menu item when Post does not belong to the user", async () => {
        const user = userEvent.setup();
        renderPostCardElipsis({ userId: 2 });
        await user.click(document.getElementById("post-card-elipsis") as HTMLElement);
        expect(screen.queryByText("Move to trash")).not.toBeInTheDocument();
    });
});