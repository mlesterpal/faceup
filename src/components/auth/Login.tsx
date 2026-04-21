import { Box, Image, Flex, Text, Grid, Span, Input, Stack, Button} from "@chakra-ui/react"         
import logo from "../../assets/login.webp"
const Login = () => {
  return (
    <Grid gridTemplateColumns="65% 35%" height="100vh">
        <Flex padding="10" borderRight="1px solid #E0E0E0">
            <Flex flexDirection="column" padding="10">
                <Text color="blue.500" fontSize="6xl" fontWeight="bold">FaceUp</Text>
                <Text mt="auto" whiteSpace="pre-line" lineHeight="1.20" fontSize="5xl" fontWeight={500}>
                    Explore{"\n"}
                    the{"\n"}
                    things{"\n"}
                    <Span color="blue.500">you love.</Span>
                </Text>
            </Flex>
            <Image src={logo} alt="logo" width={800} height={800} />
        </Flex>
        <Box padding="10">
            <Box mt={40}>
              <Text fontSize="2xl" fontWeight="medium" mb={6}>Login into FaceUp</Text>
              <Stack>
                    <Input placeholder="Email" rounded="xl"p={6}></Input>
                    <Input placeholder="Password" rounded="xl" p={6}></Input>
                    <Button bg="blue.600" color="white" rounded="3xl" fontSize="md" p={5}>Login</Button>
                    <Text textAlign="center" mt="3" mb="9">Forgot Password?</Text>
                    <Button border="1px solid blue.600" bg="none" color="blue.500" fontSize="md" p={5} borderColor="blue.600" rounded="3xl">Create new Account</Button>
                </Stack>
            </Box>
        </Box>
    </Grid>
  )
}

export default Login    