import { Icon, Menu, Portal, Flex, Text } from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaTrash } from "react-icons/fa";
import { CURRENT_USER_ID } from "../../constants/currentUser";


export type PostCardElipsisProps = {
  postUserId?: number
  onDeleteClick?: () => void;
}

const PostCardElipsis = ({ postUserId, onDeleteClick }: PostCardElipsisProps) => {
  return (
    <Menu.Root>
    <Menu.Trigger asChild>
        <Icon boxSize="25px" className="post-card-elipsis" color="#6F7175" as={HiDotsHorizontal} />
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="delete">
          {
            postUserId === CURRENT_USER_ID && (
            <Flex align="center" columnGap={2} onClick={onDeleteClick}>
                <Icon as={FaTrash} boxSize="16px" />
                <Text>Move to trash</Text>
            </Flex>
            ) 
          }
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
  )
}

export default PostCardElipsis