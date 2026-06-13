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
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidHeartCircle } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { PiThumbsUpFill } from "react-icons/pi";
import { useGetPostLikes } from "../../hooks/PostRepository";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { formatTimeAgo } from "../../utils/formatTimeAgo";

type PostLikesProps = {
    postId: number;
    likeCount: number;
};

const formatFullName = (firstName?: string, lastName?: string) =>
    `${firstName ?? ""} ${lastName ?? ""}`.trim() || "Unknown User";

const PostLikes = ({ postId, likeCount }: PostLikesProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const {
        data: likedUsers = [],
        isLoading,
        isError,
    } = useGetPostLikes(postId, isOpen);

    return (
        <Box>
            <Dialog.Root
                placement="center"
                open={isOpen}
                onOpenChange={(details) => setIsOpen(details.open)}
            >
                <Dialog.Trigger asChild>
                    <Button
                        size="sm"
                        variant="plain"
                        _hover={{ outline: "none" }}
                    >
                        <Flex>
                            <Icon
                                as={BiSolidHeartCircle}
                                color="#FD4A50"
                                boxSize="22px"
                            />
                            <Icon
                                as={PiThumbsUpFill}
                                color="#1E7BFE"
                                boxSize="22px"
                            />
                        </Flex>
                    </Button>
                </Dialog.Trigger>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                            maxW="440px"
                            w="full"
                            mx={4}
                            rounded="xl"
                            p={0}
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
                                    Reactions . {likeCount}
                                </Dialog.Title>
                                <Dialog.CloseTrigger asChild>
                                    <IconButton
                                        variant="ghost"
                                        rounded="full"
                                        aria-label="Close reactions"
                                        size="sm"
                                    >
                                        <IoClose />
                                    </IconButton>
                                </Dialog.CloseTrigger>
                            </Dialog.Header>

                            <Dialog.Body p={0} maxH="400px" overflowY="auto">
                                {isLoading && (
                                    <Text px={4} py={5} color="#6F7175" fontSize="14px">
                                        Loading reactions...
                                    </Text>
                                )}

                                {isError && (
                                    <Text px={4} py={5} color="#6F7175" fontSize="14px">
                                        Unable to load reactions right now.
                                    </Text>
                                )}

                                {!isLoading && !isError && likedUsers.length === 0 && (
                                    <Text px={4} py={5} color="#6F7175" fontSize="14px">
                                        No reactions yet.
                                    </Text>
                                )}

                                {!isLoading &&
                                    !isError &&
                                    likedUsers.map((user) => {
                                        const avatarUrl = resolveImageUrl(user.profilePicture);
                                        const fullName = formatFullName(
                                            user.firstName,
                                            user.lastName,
                                        );

                                        return (
                                            <Flex
                                                key={user.userId}
                                                align="center"
                                                px={4}
                                                py={3}
                                                gap={3}
                                                _hover={{ bg: "gray.50" }}
                                            >
                                                <Circle
                                                    size="10"
                                                    bg="gray.100"
                                                    overflow="hidden"
                                                    flexShrink={0}
                                                >
                                                    {avatarUrl ? (
                                                        <Image
                                                            src={avatarUrl}
                                                            alt={fullName}
                                                            w="100%"
                                                            h="100%"
                                                            objectFit="cover"
                                                        />
                                                    ) : (
                                                        <Icon
                                                            as={FaUserCircle}
                                                            boxSize="10"
                                                            color="gray.400"
                                                        />
                                                    )}
                                                </Circle>

                                                <VStack align="start" gap={0} flex="1" minW={0}>
                                                    <Text
                                                        color="#080809"
                                                        fontWeight="600"
                                                        truncate
                                                    >
                                                        {fullName}
                                                    </Text>
                                                    <Text
                                                        color="#6F7175"
                                                        fontSize="12px"
                                                        fontWeight="500"
                                                    >
                                                        Liked {formatTimeAgo(user.likedAt)}
                                                    </Text>
                                                </VStack>
                                            </Flex>
                                        );
                                    })}
                            </Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </Box>
    );
};

export default PostLikes;
