import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Input, Heading, Text, VStack, useToast, IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const toast = useToast();

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
    return passwordRegex.test(password);
  };

  async function submit(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "All fields are required.",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be 8-16 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.");
      return;
    } else {
      setPasswordError('');
    }

    try {
      const response = await axios.post("http://localhost:8000/signup", { name, email, password });
      const res = response.data;

      if (res.status === "exist") {
        toast({
          title: "User already exists.",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      } else if (res.status === "notexist") {
        console.log("Saving token:", res.token);
        localStorage.setItem('name', res.name);
        localStorage.setItem('token', res.token);
        toast({
          title: "Signup successful.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
        navigate("/login", { state: { name: res.name, token: res.token } });
      }
    } catch (e) {
      toast({
        title: "Error.",
        description: "Wrong details provided.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      console.log(e);
    }
  }

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    try {
      const userObject = jwtDecode(credentialResponse.credential);
      console.log(userObject); // You can see the Google profile details here

      const res = await axios.post("http://localhost:8000/google-signup", { tokenId: credentialResponse.credential });
      if (res.data.status === "exist") {
        toast({
          title: "User already exists.",
          status: "warning",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      } else if (res.data.status === "notexist") {
        console.log("Saving token:", res.data.token);
        localStorage.setItem('name', res.data.name);
        localStorage.setItem('token', res.data.token);
        toast({
          title: "Signup successful.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
        navigate("/login", { state: { name: res.data.name, token: res.data.token } });
      }
    } catch (e) {
      toast({
        title: "Error.",
        description: "Error occurred during Google Signup.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      console.log(e);
    }
  };

  const handleGoogleLoginFailure = (response) => {
    console.log('Google login failed', response);
  };

  return (
    <Box>
      <IconButton
        aria-label="Back to landing page"
        icon={<ArrowBackIcon />}
        onClick={() => navigate("/")} // Use navigate instead of history
        position="absolute"
        top={4}
        left={4}
        variant="outline"
        backgroundColor={"white"}
        zIndex="1" // Ensure the button is above other content
      />
      
      <Box 
        maxW="sm" 
        mx="auto" 
        mt={10} 
        p={5} 
        borderWidth={1} 
        borderRadius="lg" 
        background={"white"} 
        overflow="hidden" 
        boxShadow="lg"
        position="relative" // Ensure the container is positioned relative
      >
        <Heading as="h1" size="lg" textAlign="center" mb={5}>Signup</Heading>
        <form onSubmit={submit}>
          <VStack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              {passwordError && <Text color="red.500" fontSize="sm">{passwordError}</Text>}
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="full">Signup</Button>
          </VStack>
        </form>
        <Text textAlign="center" my={4}>OR</Text>
        <Box display="flex" justifyContent="center" mt={4}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            buttonText="Signup with Google"
          />
        </Box>
        <hr></hr>
        <Text textAlign="center" my={4}>Already have an account?</Text>
        <Text textAlign="center">
          <Link to="/login" style={{ color: 'teal' }}>Login Page</Link>
        </Text>
      </Box>
    </Box>
  );
}

export default Signup;
