import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GoogleLogin } from '@react-oauth/google'; // Import the Google Login component
function Login() {
  const history = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  async function submit(e) {
    e.preventDefault();

    // Admin login handling
    if (email === 'admin@onlinehealth.com' && password === 'admin@1234') {
      try {
        const res = await axios.post("http://localhost:8000/admin-login", { email, password });
        if (res.data.status === "exist") {
          localStorage.setItem('user', res.data.name);
          localStorage.setItem('token', res.data.token);
          history("/admin-panel", { state: { name: res.data.name } });
        } else {
          toast({
            title: "Incorrect password.",
            description: "The password you entered is incorrect.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
          });
        }
      } catch (e) {
        toast({
          title: "Error.",
          description: "An error occurred while logging in.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
        console.log(e);
      }
      return;
    }


    try {
      await axios.post("http://localhost:8000/", { email, password })
        .then(res => {
          if (res.data.status === "exist") {
            localStorage.setItem('user', res.data.name);
            localStorage.setItem('token', res.data.token);
            history("/home", { state: { name: res.data.name } });
          } else if (res.data.status === "incorrect") {
            toast({
              title: "Incorrect password.",
              description: "The password you entered is incorrect.",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top"
            });
          } else if (res.data.status === "notexist") {
            toast({
              title: "User not found.",
              description: "User has not signed up.",
              status: "error",
              duration: 2000,
              isClosable: true,
              position: "top"
            });
          }
        })
        .catch(e => {
          toast({
            title: "Error.",
            description: "Wrong details provided.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
          });
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;
      const res = await axios.post("http://localhost:8000/google-login", { tokenId });
      
      if (res.data.status === "exist") {
        localStorage.setItem('user', res.data.name);
        localStorage.setItem('token', res.data.token);
        history("/home", { state: { name: res.data.name } });
      } else {
        toast({
          title: "User not found.",
          description: "No account associated with this Google account.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (e) {
      toast({
        title: "Error.",
        description: "Error occurred during Google Login.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      console.log(e);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log('Google login failed', error);
  };

  return (
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" background={"white"} overflow="hidden" boxShadow="lg">
      <IconButton
        aria-label="Back to landing page"
        icon={<ArrowBackIcon />}
        onClick={() => history("/")}
        position="absolute"
        top={4}
        left={4}
        variant="outline"
        backgroundColor={"white"}
      />
      <Heading as="h1" size="lg" textAlign="center" mb={5}>Login</Heading>
      <form onSubmit={submit}>
        <VStack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="md" width="full">Login</Button>
        </VStack>
      </form>
      <Text textAlign="center" my={4}>OR</Text>
      <Box display="flex" justifyContent="center" mt={4}>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onFailure={handleGoogleLoginFailure}
        logo_alignment="left"
        buttonText="Login with Google"
      />
      </Box>
      <hr></hr>
      <Text textAlign="center" my={4}>New User?</Text>
      <Text textAlign="center" mt={4}>
        <Link to="/signup" style={{ color: 'teal' }}>Signup Page</Link>
      </Text>
    </Box>
  );
}

export default Login;
