import {
    Box,
    Button,
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
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import { IoClose, IoSend } from "react-icons/io5";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { useCreatePostComment } from "../../hooks/PostRepository";

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

type MockPostComment = {
    id: number;
    name: string;
    comment: string;
    avatarUrl?: string;
    createdAt: string;
};

const MOCK_COMMENTS: MockPostComment[] = [
    {
        id: 1,
        name: "Ella Cruz",
        comment: "This looks amazing! Love the vibe in this post.",
        createdAt: "2026-06-14T11:00:00Z",
    },
    {
        id: 2,
        name: "Ryan Lee",
        comment: "Great shot. Where was this taken?",
        avatarUrl:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&w=80&h=80&q=80",
        createdAt: "2026-06-14T11:06:00Z",
    },
    {
        id: 3,
        name: "Sophie Lim",
        comment: "Super clean composition. Keep posting more!",
        avatarUrl:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&w=80&h=80&q=80",
        createdAt: "2026-06-14T11:12:00Z",
    },
    {
        id: 4,
        name: "Marcus Tan",
        comment: "The lighting is really good here.",
        createdAt: "2026-06-14T11:17:00Z",
    },
];

type PostCommentModalProps = {
    postId: number;
    profilePicture: string;
    firstName: string;
    createdAt: string;
    message: string;
    imageSrc: string;
};

const PostCommentModal = ({
    postId,
    profilePicture,
    firstName,
    createdAt,
    message,
    imageSrc,
}: PostCommentModalProps) => {
    const [draftComment, setDraftComment] = useState("");
    const [comments, setComments] = useState<MockPostComment[]>(MOCK_COMMENTS);
    const createCommentMutation = useCreatePostComment();

    const hasMessage = Boolean(message?.trim());
    const resolvedPostImage = resolveImageUrl(imageSrc);

    const handleSubmitComment = () => {
        const trimmed = draftComment.trim();
        if (!trimmed || createCommentMutation.isPending) return;

        createCommentMutation.mutate(
            { postId, comment: trimmed },
            {
                onSuccess: () => {
                    setComments((prev) => [
                        ...prev,
                        {
                            id: Date.now(),
                            name: "You",
                            comment: trimmed,
                            createdAt: new Date().toISOString(),
                        },
                    ]);
                    setDraftComment("");
                },
            },
        );
    };

    return (
        <Box>
            <Dialog.Root placement="center">
                <Dialog.Trigger asChild>
                    <Button
                        size="sm"
                        variant="plain"
                        _hover={{ outline: "none" }}
                    >
                        <Icon as={FaRegComment} boxSize="22px" />
                        <Text>Comment</Text>
                    </Button>
                </Dialog.Trigger>
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
                                    {comments.map((comment) => (
                                        <Flex key={comment.id} align="flex-start" gap={3} py={2}>
                                            <Circle
                                                size="9"
                                                bg="gray.100"
                                                overflow="hidden"
                                                flexShrink={0}
                                            >
                                                {comment.avatarUrl ? (
                                                    <Image
                                                        src={comment.avatarUrl}
                                                        alt={comment.name}
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
                                                        {comment.name}
                                                    </Text>
                                                    <Text
                                                        color="#080809"
                                                        fontSize="14px"
                                                        whiteSpace="pre-wrap"
                                                    >
                                                        {comment.comment}
                                                    </Text>
                                                </Box>
                                                <Text
                                                    color="#6F7175"
                                                    fontSize="12px"
                                                    mt={1}
                                                    ml={2}
                                                >
                                                    {formatTimeAgo(comment.createdAt)}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    ))}
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
