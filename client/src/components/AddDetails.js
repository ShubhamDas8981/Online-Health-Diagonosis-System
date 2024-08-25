import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, Text, Heading, VStack, useToast, Select } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import NavbarNew from "./NavbarNew";

function AddDetails() {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [phoneError, setPhoneError] = useState('');
  const phoneInputRef = useRef(null);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '', address: '', state: '' });
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      console.log("Fetched token:", token); // Debug log
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/user-details", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("User details response:", response.data); // Debug log
          setUserData({ 
            name: response.data.name, 
            email: response.data.email,
            phone: response.data.phone, 
            state: response.data.state,
            address: response.data.address 
          });
          setPhone(response.data.phone || '');
          setState(response.data.state || '');
          setAddress(response.data.address || '');
        } catch (error) {
          console.error("Error fetching user details", error); // Debug log
          toast({
            title: "Error fetching user details.",
            status: "error",
            duration: 2000,
            isClosable: true,
            position: "top"
          });
        }
      }
    };
  
    fetchUserData();
  }, [toast]);
  
  const handleImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const validatePhone = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError('Phone number must be exactly 10 digits.');
      phoneInputRef.current.focus();
      return false;
    }
    setPhoneError('');
    return true;
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    if (!validatePhone()) {
      setPhoneError('Phone number must be exactly 10 digits long.');
      phoneInputRef.current.focus();
      return;
    } else {
      setPhoneError('');
    }
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("state", state);
    formData.append("address", address);
    formData.append("profileImage", profileImage);
  
    try {
      const token = localStorage.getItem('token');
      console.log("Submitting details with token:", token); // Debug log
      await axios.post("http://localhost:8000/add-details", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      toast({
        title: "Details added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
      navigate('/home'); // Redirect to home page after successful submission
    } catch (error) {
      console.error("Error adding details", error); // Debug log
      toast({
        title: "Error adding details.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top"
      });
    }
  };
  
  // List of states
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
  ];

  return (
    <Box>
      <NavbarNew />
      <Box maxW="sm" mx="auto" mt={8} p={5} borderWidth={1} borderRadius="lg" background={"white"} overflow="hidden" boxShadow="lg">
        <Heading as="h1" size="lg" textAlign="center" mb={5}>Add More Details</Heading>
        <form onSubmit={submitDetails}>
          <VStack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input type="text" value={userData.name} readOnly />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input type="email" value={userData.email} readOnly />
            </FormControl>
            <FormControl id="phone" isInvalid={!!phoneError}>
              <FormLabel>Phone Number</FormLabel>
              <Input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="Phone Number" 
                ref={phoneInputRef} 
              />
              {phoneError && <Text color="red.500">{phoneError}</Text>}
            </FormControl>
            <FormControl id="state">
              <FormLabel>Select State</FormLabel>
              <Select placeholder="--Select State--" onChange={(e) => setState(e.target.value)} value={state}>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="address">
              <FormLabel>Address</FormLabel>
              <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
            </FormControl>
            <FormControl id="profileImage">
              <FormLabel>Profile Image</FormLabel>
              <Input type="file" onChange={handleImageUpload} />
            </FormControl>
            <Button type="submit" colorScheme="teal" size="md" width="full">Submit</Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
}

export default AddDetails;
