import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import PageNav from "./PageNav";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

function LoginComponent() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Check if the user is authenticated
      const user = auth.currentUser;

      // If the user is authenticated, navigate to "/app"
      if (user) {
        navigate("/app");
      }
    } catch (error) {
      // Handle login error (e.g., display an error message)
      console.error("Login error:", error.message);
    }
  };

  return (
    <>
      <PageNav />
      <Card
        maxW="md"
        maxH="md"
        margin="0 auto"
        mt="20"
        mb="10"
        p="6"
        shadow="md"
        variant="outline"
        colorScheme="blue"
        backgroundColor={"blue.50"}
      >
        <CardBody>
          <Stack mt="6" spacing="18">
            <Heading size="xl">Log In </Heading>
            <FormControl mt={"8"}>
              <FormLabel>Email address</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} />
              <FormLabel mt={"8"}>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter alignContent={"center"}>
          <Button variant="solid" colorScheme="blue" onClick={handleLogin}>
            Log In
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}

export default LoginComponent;
