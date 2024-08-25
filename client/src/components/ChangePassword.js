import React, { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, Heading, VStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavbarNew from './NavbarNew';
function ChangePassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [step, setStep] = useState(1); // Step to manage form visibility
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate function

  const submitEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/send-otp", { email });
      toast({
        title: "OTP sent to your email.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast({
        title: "Invalid Email ID.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/verify-otp", { email, otp });
      if (response.data.status === "success") {
        setOtpVerified(true);
        toast({
          title: "OTP verified. You can now change your password.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
        setStep(3); // Move to change password step
      } else {
        toast({
          title: "Invalid OTP. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: "Error verifying OTP.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }
  };

  const submitNewPassword = async (e) => {
    e.preventDefault();
    try {
      if (otpVerified) {
        await axios.post("http://localhost:8000/change-password", { email, newPassword });
        toast({
          title: "Password changed successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
        navigate('/home'); // Redirect to /home
      } else {
        toast({
          title: "Please verify OTP first.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top"
        });
      }
    } catch (error) {
      toast({
        title: "Error changing password.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box>
    <NavbarNew/>
    <Box maxW="sm" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" background={"white"} overflow="hidden" boxShadow="lg">
      <Heading as="h1" size="lg" textAlign="center" mb={5}>Change Password</Heading>
      {step === 1 && (
        <form onSubmit={submitEmail}>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="full">Send OTP</Button>
          </VStack>
        </form>
      )}
      {step === 2 && !otpVerified && (
        <form onSubmit={verifyOtp}>
          <VStack spacing={4}>
            <FormControl id="otp">
              <FormLabel>OTP</FormLabel>
              <Input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="full">Verify OTP</Button>
          </VStack>
        </form>
      )}
      {step === 3 && otpVerified && (
        <form onSubmit={submitNewPassword}>
          <VStack spacing={4}>
            <FormControl id="new-password">
              <FormLabel>New Password</FormLabel>
              <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="full">Change Password</Button>
          </VStack>
        </form>
      )}
    </Box>
    </Box>
  );
}

export default ChangePassword;




