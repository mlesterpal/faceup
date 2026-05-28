import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "../ui/provider";
import ProfileHeader from "./ProfileHeader";
import type { ProfileHeaderProps } from "./profile.types";

const renderProfileHeader = (props: ProfileHeaderProps) =>
	render(
		<Provider>
			<ProfileHeader {...props} />
		</Provider>,
	);
	const props: ProfileHeaderProps = {
		name: "mark lester",
		readOnlyAvatar: true,
	};

describe("ProfileHeader", () => {
	it(`shows "User name can't be found" when name is empty`, () => {
		props.name = "";
		renderProfileHeader(props);
		expect(screen.getByText("User name can't be found")).toBeInTheDocument();
	});

});

