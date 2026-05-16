import { Center, Spinner, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

type FriendsListStateProps = {
	isLoading: boolean;
	isError: boolean;
	isEmpty: boolean;
	emptyMessage: string;
	children: ReactNode;
};

const FriendsListState = ({
	isLoading,
	isError,
	isEmpty,
	emptyMessage,
	children,
}: FriendsListStateProps) => {
	if (isLoading) {
		return (
			<Center py={12}>
				<Spinner size="lg" color="blue.500" />
			</Center>
		);
	}

	if (isError) {
		return (
			<Center py={12}>
				<Text color="red.500">Could not load data. Is the API running?</Text>
			</Center>
		);
	}

	if (isEmpty) {
		return (
			<Center py={12}>
				<Text color="#6F7175">{emptyMessage}</Text>
			</Center>
		);
	}

	return <>{children}</>;
};

export default FriendsListState;
