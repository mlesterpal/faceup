import { Icon, Menu, Portal, Flex, Text } from "@chakra-ui/react"
import { HiDotsHorizontal } from "react-icons/hi"
import { FaTrash } from "react-icons/fa";


export type PostCardElipsisProps = {
  userId?: number
}

const PostCardElipsis = ({ userId }: PostCardElipsisProps) => {
  return (
    <Menu.Root>
    <Menu.Trigger asChild>
        <Icon boxSize="25px" id="post-card-elipsis" color="#6F7175" as={HiDotsHorizontal} />
    </Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="delete">
          {
            userId === 1 && (
            <Flex align="center" columnGap={2}>
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