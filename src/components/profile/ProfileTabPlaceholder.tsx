import { Text } from "@chakra-ui/react";

type ProfileTabPlaceholderProps = {
	label: string;
};

const ProfileTabPlaceholder = ({ label }: ProfileTabPlaceholderProps) => (
	<Text py={8} color="gray.500" textAlign="center">
		{label} coming soon.
	</Text>
);

export default ProfileTabPlaceholder;
