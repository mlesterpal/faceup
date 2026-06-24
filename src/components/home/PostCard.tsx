import { Box, Circle, Flex, Icon, Image, Text, VStack } from "@chakra-ui/react";
import { IoClose } from "react-icons/io5";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { PiShareFat, PiShare } from "react-icons/pi";
import { FaRegComment, FaUserCircle } from "react-icons/fa";
import type { UserPosts } from "../../entities/response/UserPosts";
import { formatTimeAgo } from "../../utils/formatTimeAgo";
import { resolveImageUrl } from "../../utils/resolveImageUrl";
import { Link } from "react-router-dom";
import {
    useTogglePostLike,
    useTogglePostShare,
    useDeleteUserPost,
} from "../../hooks/PostRepository";
import PostCardElipsis from "./PostCardElipsis";
import PostCardDeleteModal from "./PostCardDeleteModal";
import { useState } from "react";
import PostLikes from "./PostLikes";
import PostCommentModal from "./PostCommentModal";

export type PostCardProps = {
    userPosts: UserPosts[];
};

const PostCardItem = ({ post }: { post: UserPosts }) => {
    const imageSrc = resolveImageUrl(post.imageUrl);
    const profilePicture = resolveImageUrl(post.profilePicture);
    const { mutate: togglePostLike, isPending } = useTogglePostLike();
    const { mutate: togglePostShare, isPending: isSharingPending } =
        useTogglePostShare();
    const deletePostMutation = useDeleteUserPost();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

    const hasMessage = Boolean(post.message?.trim());
    const hasLikes = post.likeCount > 0;
    const likeColor = post.isLiked ? "#1E7BFE" : "#6F7175";
    const likeLabel = post.isLiked ? "Liked" : "Like";

    const hasShares = post.shareCount > 0;
    const shareColor = post.isShared ? "#1E7BFE" : "#6F7175";
    const shareLabel = post.isShared ? "Shared" : "Share";

    const canLinkToProfile =
        typeof post.userId === "number" && Number.isFinite(post.userId);

    const authorHeader = (
        <Flex columnGap="10px" align="center">
            <Circle size="10" bg="gray.200" overflow="hidden">
                {profilePicture ? (
                    <Image
                        src={profilePicture}
                        alt="Profile"
                        w="100%"
                        h="100%"
                    />
                ) : (
                    <Icon as={FaUserCircle} boxSize="10" color="gray.400" />
                )}
            </Circle>

            <VStack align="start" gap={0}>
                <Text color="#080809" fontWeight="500" data-author-name>
                    {post.firstName}
                </Text>

                <Text
                    fontSize="14px"
                    color="#6F7175"
                    fontWeight="500"
                    mt="-0.5"
                >
                    {formatTimeAgo(post.createdAt)}
                </Text>
            </VStack>
        </Flex>
    );

    const handleDeletePost = () => {
        deletePostMutation.mutate(post.postId, {
            onSuccess: () => {
                setIsDeleteModalOpen(false);
            },
        });
    };

    return (
        <Box bg="white" rounded="2xl" mt="12px" className="post-card">
            <Box padding="12px">
                <Flex justify="space-between" align="center">
                    {canLinkToProfile ? (
                        <Link
                            to={`/profile/${post.userId}`}
                            style={{ textDecoration: "none", color: "inherit" }}
                        >
                            <Box
                                _hover={{
                                    "& [data-author-name]": {
                                        textDecoration: "underline",
                                    },
                                }}
                            >
                                {authorHeader}
                            </Box>
                        </Link>
                    ) : (
                        authorHeader
                    )}

                    <Flex align="center" columnGap="8px">
                        <PostCardElipsis
                            postUserId={post.userId}
                            onDeleteClick={() => setIsDeleteModalOpen(true)}
                        />

                        <Icon boxSize="25px" color="#6F7175" as={IoClose} />
                    </Flex>
                </Flex>

                {hasMessage && (
                    <Text fontSize="15px" mt="7px">
                        {post.message}
                    </Text>
                )}

                {imageSrc && (
                    <Box mt={hasMessage ? 2 : "7px"} mx={-3} mb={-1}>
                        <Image
                            src={imageSrc}
                            alt="Post"
                            w="full"
                            maxH="500px"
                            objectFit="cover"
                            rounded="lg"
                        />
                    </Box>
                )}

                <Flex justify="space-between" px={4} mt={2}>
                    <Flex align="center" minH="22px">
                        {hasLikes && (
                            <>
                                <PostLikes
                                    postId={post.postId}
                                    likeCount={post.likeCount}
                                />
                                <Text
                                    color="#6F7175"
                                    fontSize="14px"
                                    fontWeight="400"
                                    ml={1}
                                >
                                    {post.likeCount}
                                </Text>
                            </>
                        )}
                    </Flex>

                    <Flex fontSize="14px" columnGap={5}>
                        {post.commentCount > 0 && (
                            <Text color="#6F7175">
                                {post.commentCount} comments
                            </Text>
                        )}

                        {hasShares && (
                            <>
                                <Icon
                                    as={PiShareFat}
                                    color="#1E7BFE"
                                    boxSize="22px"
                                    mr={-4}
                                />
                                <Text
                                    color="#6F7175"
                                    fontSize="14px"
                                    fontWeight="400"
                                    ml={1}
                                >
                                    {post.shareCount}
                                </Text>
                            </>
                        )}
                    </Flex>
                </Flex>

                <Flex
                    align="center"
                    justify="space-between"
                    px={12}
                    mt={3}
                    color="#6F7175"
                    fontWeight={500}
                >
                    <Flex
                        align="center"
                        fontSize="16px"
                        columnGap={1.5}
                        cursor={isPending ? "not-allowed" : "pointer"}
                        onClick={() => {
                            if (!isPending) {
                                togglePostLike(post.postId);
                            }
                        }}
                        role="button"
                        aria-pressed={post.isLiked}
                        opacity={isPending ? 0.7 : 1}
                        color={likeColor}
                    >
                        <Icon
                            as={post.isLiked ? BiSolidLike : BiLike}
                            boxSize="22px"
                        />

                        <Text>{likeLabel}</Text>
                    </Flex>

                    <Flex
                        align="center"
                        fontSize="16px"
                        columnGap={1.5}
                        cursor="pointer"
                        onClick={() => setIsCommentModalOpen(true)}
                        role="button"
                    >
                        <Icon as={FaRegComment} boxSize="22px" />
                        <Text>Comment</Text>
                    </Flex>

                    <Flex
                        align="center"
                        fontSize="16px"
                        columnGap={1.5}
                        cursor={isSharingPending ? "not-allowed" : "pointer"}
                        onClick={() => {
                            if (!isSharingPending) {
                                togglePostShare(post.postId);
                            }
                        }}
                        role="button"
                        aria-pressed={post.isShared}
                        opacity={isSharingPending ? 0.7 : 1}
                        color={shareColor}
                    >
                        <Icon
                            as={post.isShared ? PiShareFat : PiShare}
                            color={shareColor}
                            boxSize="22px"
                        />

                        <Text>{shareLabel}</Text>
                    </Flex>
                </Flex>
            </Box>

            <PostCardDeleteModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDeletePost}
                isDeleting={deletePostMutation.isPending}
            />

            {isCommentModalOpen && (
                <PostCommentModal
                    open={isCommentModalOpen}
                    onOpenChange={setIsCommentModalOpen}
                    postId={post.postId}
                    profilePicture={profilePicture}
                    firstName={post.firstName}
                    createdAt={post.createdAt}
                    message={post.message}
                    imageSrc={imageSrc}
                />
            )}
        </Box>
    );
};

const PostCard = ({ userPosts }: PostCardProps) => {
    return (
        <>
            {userPosts.map((post) => (
                <PostCardItem key={post.postId} post={post} />
            ))}
        </>
    );
};

export default PostCard;
