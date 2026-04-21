import { Box, Image, Flex, Text, Grid, Span, Input, Stack, Button } from "@chakra-ui/react"
import logo from "../../assets/login.webp"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const handleSignup = () => {
    navigate("/signup")
  }
  return (
    <Grid
      gridTemplateColumns={{ base: "1fr", lg: "65% 35%" }}
      minH="100vh"
    >
      <Flex mt={{ base: -40, lg: 0 }}
        px={{ base: 6, md: 10 }}
        py={{ base: 10, md: 12 }}
        borderRight={{ base: "none", lg: "1px solid #E0E0E0" }}
        gap={{ base: 8, md: 10 }}
        align="center"
        justify="center"
        direction={{ base: "column", md: "row" }}
      >
        <Flex
          flexDirection="column"
          w="full"
          maxW={{ base: "520px", md: "420px" }}
        >
          <Text color="blue.500" fontSize={{ base: "5xl", md: "6xl" }} fontWeight="bold"  display={{ base: "none", lg: "flex" }}>
            FaceUp
          </Text>
          <Text
           display={{ base: "none", lg: "flex" }}
            mt={{ base: 6, md: "auto" }}
            whiteSpace="pre-line"
            lineHeight={{ base: "1.1", md: "1.2" }}
            fontSize={{ base: "4xl", md: "5xl" }}
            fontWeight={500}
          >
            Explore{"\n"}
            the{"\n"}
            things{"\n"}
            <Span color="blue.500">you love.</Span>
          </Text>
        </Flex>

        <Image
          src={logo}
          alt="logo"
          w={{ base: "min(320px, 65vw)", md: "420px", xl: "520px" }}
          h="auto"
          objectFit="contain"
        />
      </Flex>

      <Flex px={{ base: 6, md: 10 }} py={{ base: 10, md: 12 }} align="center" justify="center" mt={{ base: -96, lg: 0 }}>
        <Box w="full" maxW="420px">
          <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="medium" mb={6}>
            Login into FaceUp
          </Text>
          <Stack gap={4}>
            <Input placeholder="Email" rounded="xl" h="52px" px="16px" />
            <Input placeholder="Password" rounded="xl" h="52px" px="16px" type="password" />
            <Button bg="blue.600" color="white" rounded="3xl" fontSize="md" h="52px">
              Login
            </Button>
            <Text textAlign="center" mt="1" mb="2">
              Forgot Password?
            </Text>
            <Button
              border="1px solid"
              bg="none"
              color="blue.500"
              fontSize="md"
              h="52px"
              borderColor="blue.600"
              rounded="3xl"
              onClick={handleSignup}
            >
              Create new Account
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Grid>
  )
}

export default Login    