import { Button, Dialog, Portal, Text } from "@chakra-ui/react";

export type PostCardDeleteModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
	isDeleting?: boolean;
};

const PostCardDeleteModal = ({
	open,
	onOpenChange,
	onConfirm,
	isDeleting = false,
}: PostCardDeleteModalProps) => (
	<Dialog.Root
		open={open}
		onOpenChange={(details) => onOpenChange(details.open)}
		placement="center"
	>
		<Portal>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Delete post?</Dialog.Title>
					</Dialog.Header>

					<Dialog.Body>
						<Text>This action cannot be undone.</Text>
					</Dialog.Body>

					<Dialog.Footer>
						<Button
							variant="outline"
							onClick={() => onOpenChange(false)}
							disabled={isDeleting}
						>
							Cancel
						</Button>
						<Button
							colorPalette="red"
							onClick={onConfirm}
							loading={isDeleting}
							disabled={isDeleting}
						>
							Delete post
						</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Positioner>
		</Portal>
	</Dialog.Root>
);

export default PostCardDeleteModal;
