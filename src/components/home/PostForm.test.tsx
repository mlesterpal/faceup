import { fireEvent, render } from "@testing-library/react";
import { Provider } from "../ui/provider";
import { MemoryRouter } from "react-router-dom";
import PostForm from "./PostForm";
import { useCreatePost } from "@/hooks/PostRepository";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

vi.mock("../../hooks/PostRepository", () => ({
	useCreatePost: vi.fn(),
}));

const renderPostForm = () =>
	render(
		<Provider>
			<MemoryRouter>
				<PostForm />
			</MemoryRouter>
		</Provider>,
	);

describe("PostForm", () => {
    let _useCreatePost: IUseCreatePostResult;
    beforeEach(() => {
        _useCreatePost = {
            data: null,
            isLoading: false,
            isError: false,
        } as IUseCreatePostResult;
        vi.mocked(useCreatePost).mockImplementation(() => _useCreatePost);
    });
    afterEach(() => {
        vi.clearAllMocks();
    });
    it("show validation message when no payload is provided", () => {
        renderPostForm();
        const postForm = screen.getByRole("form");
        fireEvent.click(postForm);
        expect(screen.getByText("Please enter a message or select an image")).toBeInTheDocument();
    });
});