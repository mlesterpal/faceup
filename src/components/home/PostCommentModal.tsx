import {
    Box,
    Circle,
    Dialog,
    Flex,
    Icon,
    IconButton,
    Image,
    Portal,
    Text,
    VStack,
    Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoClose, IoSend } from "react-icons/io5";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useCreatePostComment, useGetPostComments } from "../../hooks/PostRepository";

const authorHeader = (
    profilePicture: string,
    firstName: string,
    createdAt: string,
) => (
    <Flex columnGap="10px" align="center">
        <Circle size="10" bg="gray.200" overflow="hidden">
            {profilePicture ? (
                <Image src={profilePicture} alt="Profile" w="100%" h="100%" />
            ) : (
                <Icon as={FaUserCircle} boxSize="10" color="gray.400" />
            )}
        </Circle>

        <VStack align="start" gap={0}>
            <Text color="#080809" fontWeight="500" data-author-name>
                {firstName}
            </Text>

            <Text fontSize="14px" color="#6F7175" fontWeight="500" mt="-0.5">
                {formatTimeAgo(createdAt)}
            </Text>
        </VStack>
    </Flex>
);

type PostCommentModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    postId: number;
    profilePicture: string;
    firstName: string;
    createdAt: string;
    message: string;
    imageSrc: string;
};

const PostCommentModal = ({
    open,
    onOpenChange,
    postId,
    profilePicture,
    firstName,
    createdAt,
    message,
    imageSrc,
}: PostCommentModalProps) => {
    const [draftComment, setDraftComment] = useState("");
    const createCommentMutation = useCreatePostComment();
    const {
        data: comments = [],
        isLoading: isCommentsLoading,
        isError: isCommentsError,
    } = useGetPostComments(postId, open);

    const hasMessage = Boolean(message?.trim());
    const resolvedPostImage = resolveImageUrl(imageSrc);

    const handleSubmitComment = () => {
        const trimmed = draftComment.trim();
        if (!trimmed || createCommentMutation.isPending) return;

        createCommentMutation.mutate(
            { postId, comment: trimmed },
            {
                onSuccess: () => {
                    setDraftComment("");
                },
            },
        );
    };

    return (
        <Box>
            <Dialog.Root
                placement="center"
                open={open}
                onOpenChange={(details) => onOpenChange(details.open)}
            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                            maxW="640px"
                            w="full"
                            mx={4}
                            rounded="xl"
                            p={0}
                            maxH="85vh"
                            display="flex"
                            flexDirection="column"
                        >
                            <Dialog.Header
                                px={4}
                                py={3}
                                borderBottomWidth="1px"
                                borderColor="gray.200"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                            >
                                <Dialog.Title fontSize="lg" fontWeight="bold">
                                    Comments
                                </Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <IconButton
                                        variant="ghost"
                                        rounded="full"
                                        aria-label="Close comments"
                                        size="sm"
                                    >
                                        <IoClose />
                                    </IconButton>
                                </Dialog.CloseTrigger>
                            </Dialog.Header>

                            <Dialog.Body p={0} flex="1" overflowY="auto">
                                <Box px={4} py={3} borderBottomWidth="1px" borderColor="gray.200">
                                    {authorHeader(profilePicture, firstName, createdAt)}

                                    {hasMessage && (
                                        <Text fontSize="15px" mt={2} color="#080809">
                                            {message}
                                        </Text>
                                    )}

                                    {resolvedPostImage && (
                                        <Box mt={hasMessage ? 2 : "7px"}>
                                            <Image
                                                src={resolvedPostImage}
                                                alt="Post"
                                                w="full"
                                                maxH="360px"
                                                objectFit="cover"
                                                rounded="lg"
                                            />
                                        </Box>
                                    )}
                                </Box>

                                <VStack align="stretch" gap={0} p={4}>
                                    {isCommentsLoading && (
                                        <Text color="#6F7175" fontSize="14px" py={2}>
                                            Loading comments...
                                        </Text>
                                    )}

                                    {isCommentsError && (
                                        <Text color="#6F7175" fontSize="14px" py={2}>
                                            Unable to load comments right now.
                                        </Text>
                                    )}

                                    {!isCommentsLoading &&
                                        !isCommentsError &&
                                        comments.length === 0 && (
                                            <Text color="#6F7175" fontSize="14px" py={2}>
                                                No comments yet.
                                            </Text>
                                        )}

                                    {!isCommentsLoading &&
                                        !isCommentsError &&
                                        comments.map((comment) => {
                                            const commentName =
                                                `${comment.firstName ?? ""} ${comment.lastName ?? ""}`.trim() ||
                                                "Unknown User";
                                            const commentAvatar = resolveImageUrl(comment.profilePicture);

                                            return (
                                                <Flex
                                                    key={`${comment.userId}-${comment.commentedAt}-${comment.content}`}
                                                    align="flex-start"
                                                    gap={3}
                                                    py={2}
                                                >
                                                    <Circle
                                                        size="9"
                                                        bg="gray.100"
                                                        overflow="hidden"
                                                        flexShrink={0}
                                                    >
                                                        {commentAvatar ? (
                                                            <Image
                                                                src={commentAvatar}
                                                                alt={commentName}
                                                                w="100%"
                                                                h="100%"
                                                                objectFit="cover"
                                                            />
                                                        ) : (
                                                            <Icon
                                                                as={FaUserCircle}
                                                                boxSize="9"
                                                                color="gray.400"
                                                            />
                                                        )}
                                                    </Circle>

                                                    <Box flex="1" minW={0}>
                                                        <Box
                                                            bg="gray.100"
                                                            rounded="2xl"
                                                            px={3}
                                                            py={2}
                                                            w="fit-content"
                                                            maxW="100%"
                                                        >
                                                            <Text
                                                                fontWeight="600"
                                                                color="#080809"
                                                                fontSize="14px"
                                                            >
                                                                {commentName}
                                                            </Text>
                                                            <Text
                                                                color="#080809"
                                                                fontSize="14px"
                                                                whiteSpace="pre-wrap"
                                                            >
                                                                {comment.content}
                                                            </Text>
                                                        </Box>
                                                        <Text
                                                            color="#6F7175"
                                                            fontSize="12px"
                                                            mt={1}
                                                            ml={2}
                                                        >
                                                            {formatTimeAgo(comment.commentedAt)}
                                                        </Text>
                                                    </Box>
                                                </Flex>
                                            );
                                        })}
                                </VStack>
                            </Dialog.Body>

                            <Box
                                px={4}
                                py={3}
                                borderTopWidth="1px"
                                borderColor="gray.200"
                                bg="white"
                                position="sticky"
                                bottom={0}
                            >
                                <Flex align="center" gap={2}>
                                    <Circle size="9" bg="gray.100" overflow="hidden" flexShrink={0}>
                                        {profilePicture ? (
                                            <Image
                                                src={profilePicture}
                                                alt="Current user"
                                                w="100%"
                                                h="100%"
                                                objectFit="cover"
                                            />
                                        ) : (
                                            <Icon
                                                as={FaUserCircle}
                                                boxSize="9"
                                                color="gray.400"
                                            />
                                        )}
                                    </Circle>

                                    <Input
                                        placeholder="Write a comment..."
                                        rounded="full"
                                        value={draftComment}
                                        onChange={(e) => setDraftComment(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                handleSubmitComment();
                                            }
                                        }}
                                    />

                                    <IconButton
                                        aria-label="Submit comment"
                                        rounded="full"
                                        colorPalette="blue"
                                        onClick={handleSubmitComment}
                                        loading={createCommentMutation.isPending}
                                        disabled={
                                            !draftComment.trim() ||
                                            createCommentMutation.isPending
                                        }
                                    >
                                        <IoSend />
                                    </IconButton>
                                </Flex>
                            </Box>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    );
};

export default PostCommentModal;
