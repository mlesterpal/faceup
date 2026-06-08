import { useEffect, useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Provider } from "../ui/provider";
import PostCard from "./PostCard";
import type { UserPosts } from "../../entities/response/UserPosts";
import { useTogglePostLike, useTogglePostShare } from "../../hooks/PostRepository";

vi.mock("../../hooks/PostRepository", () => ({
	useTogglePostLike: vi.fn(),
	useTogglePostShare: vi.fn(),
}));

vi.mock("../../utils/formatTimeAgo", () => ({
	formatTimeAgo: vi.fn(() => "1 min ago"),
}));

vi.mock("../../utils/resolveImageUrl", () => ({
	resolveImageUrl: vi.fn((url?: string | null) => url ?? ""),
}));

const createMockPost = (overrides: Partial<UserPosts> = {}): UserPosts => ({
	postId: 1,
	userId: 2,
	message: "Test post",
	firstName: "Mark",
	imageUrl: null,
	profilePicture: null,
	createdAt: "2026-06-08T00:00:00.000Z",
	likeCount: 0,
	isLiked: false,
	shareCount: 0,
	isShared: false,
	...overrides,
});

const renderPostCard = (posts: UserPosts[]) =>
	render(
		<Provider>
			<MemoryRouter>
				<PostCard userPosts={posts} />
			</MemoryRouter>
		</Provider>,
	);

type PostCardLikeHarnessProps = {
	initialPosts: UserPosts[];
};

let applyLike: ((postId: number) => void) | undefined;
let likeMutateSpy: ReturnType<typeof vi.fn>;

const PostCardLikeHarness = ({ initialPosts }: PostCardLikeHarnessProps) => {
	const [posts, setPosts] = useState(initialPosts);

	useEffect(() => {
		applyLike = (postId: number) => {
			setPosts((currentPosts) =>
				currentPosts.map((post) =>
					post.postId === postId
						? { ...post, isLiked: true, likeCount: post.likeCount + 1 }
						: post,
				),
			);
		};

		return () => {
			applyLike = undefined;
		};
	}, []);

	return <PostCard userPosts={posts} />;
};

type PostCardShareHarnessProps = {
	initialPosts: UserPosts[];
};
let applyShare: ((postId: number) => void) | undefined;
let shareMutateSpy: ReturnType<typeof vi.fn>;

const PostCardShareHarness = ({ initialPosts }: PostCardShareHarnessProps) => {
	const [posts, setPosts] = useState(initialPosts);

	useEffect(() => {
		applyShare = (postId: number) => {
			setPosts((currentPosts) =>
				currentPosts.map((post) =>
					post.postId === postId
					? { ...post, isShared: true, shareCount: post.shareCount + 1 }
					: post,
				),
			);
		};

		return () => {
			applyShare = undefined;
		};
	}, []);

	return <PostCard userPosts={posts} />;
};

describe("PostCard", () => {
	beforeEach(() => {
		likeMutateSpy = vi.fn((postId: number) => {
			applyLike?.(postId);
		});

		shareMutateSpy = vi.fn((postId: number) => {
			applyShare?.(postId);
		});

		vi.mocked(useTogglePostLike).mockReturnValue({
			mutate: likeMutateSpy,
			isPending: false,
		} as unknown as ReturnType<typeof useTogglePostLike>);

		vi.mocked(useTogglePostShare).mockReturnValue({
			mutate: shareMutateSpy,
			isPending: false,
		} as unknown as ReturnType<typeof useTogglePostShare>);
	});

	afterEach(() => {
		vi.clearAllMocks();
		applyLike = undefined;
		applyShare = undefined;
	});

	it("shows Shared when user clicks Share", async () => {
		const user = userEvent.setup();
		render(
			<Provider>
				<MemoryRouter>
					<PostCardShareHarness initialPosts={[createMockPost()]} />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByRole("button", { name: "Share" })).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Share" }));

		expect(shareMutateSpy).toHaveBeenCalledWith(1);
		expect(screen.getByRole("button", { name: "Shared" })).toBeInTheDocument();
	});
	it("shows Liked when user clicks Like", async () => {
		const user = userEvent.setup();

		render(
			<Provider>
				<MemoryRouter>
					<PostCardLikeHarness initialPosts={[createMockPost()]} />
				</MemoryRouter>
			</Provider>,
		);

		expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();

		await user.click(screen.getByRole("button", { name: "Like" }));

		expect(likeMutateSpy).toHaveBeenCalledWith(1);
		expect(screen.getByRole("button", { name: "Liked" })).toBeInTheDocument();
	});

	it("shows Like by default when post is not liked", () => {
		renderPostCard([createMockPost({ isLiked: false })]);

		expect(screen.getByRole("button", { name: "Like" })).toBeInTheDocument();
	});
});
