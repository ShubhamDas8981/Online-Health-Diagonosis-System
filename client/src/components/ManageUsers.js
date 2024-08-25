import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import {
  Box,
  Heading,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  ModalFooter,
  useDisclosure,
  useToast,
  SimpleGrid
} from "@chakra-ui/react";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({});
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const phoneInputRef = useRef(null);
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null); // For handling image uploads
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get('http://localhost:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const usersWithUpdatedImages = response.data.users.map(user => ({
        ...user,
        profileImage: user.profileImage.startsWith('http') ? user.profileImage : `http://localhost:8000/${user.profileImage}`
      }));
      setUsers(usersWithUpdatedImages);
    } catch (error) {
      setError('Failed to load users.');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      state: user.state,
      address: user.address
    });
    setProfileImage(null); // Reset profile image
    onOpen();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]); // Update profile image file
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token || !selectedUser) return;

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      emailInputRef.current.focus();
      return;
    } else {
      setEmailError('');
    }

    if (formData.phone && !validatePhoneNumber(formData.phone)) {
      setPhoneError('Phone number must be exactly 10 digits long.');
      phoneInputRef.current.focus();
      return;
    } else {
      setPhoneError('');
    }

    const formDataToSend = new FormData();
    formDataToSend.append('userId', selectedUser._id); // Include userId
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('state', formData.state);
    formDataToSend.append('address', formData.address);
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }

    try {
      await axios.post('http://localhost:8000/update-details', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        title: "User updated.",
        description: "User details have been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      onClose();
      fetchUsers(); // Refresh the user list after update
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Token expired, attempt to refresh token
        try {
          const refreshToken = localStorage.getItem('refreshToken');
          const refreshResponse = await axios.post('http://localhost:8000/refresh-token', { refreshToken });
          localStorage.setItem('token', refreshResponse.data.token);
          // Retry the update
          handleUpdateSubmit();
        } catch (refreshError) {
          // Handle refresh token failure
          toast({
            title: "Update failed.",
            description: "Failed to refresh token. Please log in again.",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top"
          });
        }
      } else {
        toast({
          title: "Update failed.",
          description: "Failed to update user details.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,16}$/;
    return passwordRegex.test(password);
  };
  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };
  const handleAddUserSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
  
    const { newUserName, newUserEmail, newUserPassword, newUserPhone, newUserState, newUserAddress } = formData;
  
    if (!validateEmail(newUserEmail)) {
      setEmailError('Please enter a valid email address.');
      if (emailInputRef.current) {
        emailInputRef.current.focus();
      }
      return;
    } else {
      setEmailError('');
    }
  
    if (!validatePassword(newUserPassword)) {
      setPasswordError('Password must be 8-16 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.');
      return;
    } else {
      setPasswordError('');
    }
  
    if (newUserPhone && !validatePhoneNumber(newUserPhone)) {
      setPhoneError('Phone number must be exactly 10 digits long.');
      if (phoneInputRef.current) {
        phoneInputRef.current.focus();
      }
      return;
    } else {
      setPhoneError('');
    }
  
    if (!newUserName || !newUserEmail || !newUserPassword) {
      toast({
        title: 'Validation Error',
        description: 'Name, Email, and Password are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top'
      });
      return;
    }
  
    const formDataToSend = new FormData();
    formDataToSend.append('name', newUserName);
    formDataToSend.append('email', newUserEmail);
    formDataToSend.append('password', newUserPassword);
    formDataToSend.append('phone', newUserPhone || '');
    formDataToSend.append('state', newUserState || '');
    formDataToSend.append('address', newUserAddress || '');
    if (profileImage) {
      formDataToSend.append('profileImage', profileImage);
    }
  
    try {
      await axios.post('http://localhost:8000/add-user', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast({
        title: "User added.",
        description: "New user has been added successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      fetchUsers(); // Refresh the user list
      setFormData({});
      setProfileImage(null);
    } catch (error) {
      toast({
        title: "Add failed.",
        description: "Failed to add new user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };
  
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token || !userToDelete) return;

    try {
      await axios.delete('http://localhost:8000/delete-user', {
        data: { userId: userToDelete._id },
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      toast({
        title: "User deleted.",
        description: "User has been removed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      setIsDeleteModalOpen(false);
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      toast({
        title: "Delete failed.",
        description: "Failed to delete user.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <Box>
      <NavbarAdmin />
      <Box p={10} maxW="7xl" mx="auto">
        <Heading as="h1" mb={10} textAlign="center">Manage Users</Heading>
        <Tabs variant="enclosed" colorScheme="teal">
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>View Users</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Update Details</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Add Users</Tab>
            <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Delete Users</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <VStack spacing={4} align="start">
                <Text fontSize="lg">
                  View the list of all users. You can see detailed information about each user here.
                </Text>
                {error && <Text color="red.500">{error}</Text>}
                <Box width="full" overflowX="auto">
                  <Table
                    variant="striped"
                    colorScheme="teal"
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="md"
                    size="sm"
                  >
                    <Thead bg="gray.100" color="white">
                      <Tr>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Name</Th>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Email</Th>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Phone</Th>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Address</Th>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">State</Th>
                        <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Profile Image</Th>
                      </Tr>
                    </Thead>
                    <Tbody bg="gray.50">
                      {users.length > 0 ? (
                        users.map((user) => (
                          <Tr key={user._id}>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">{user.name}</Td>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">{user.email}</Td>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">{user.phone}</Td>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">{user.address}</Td>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">{user.state}</Td>
                            <Td p={4} borderWidth="1px" borderColor="gray.300">
                              {user.profileImage ? (
                                <Image
                                  src={user.profileImage}
                                  alt={user.name}
                                  boxSize="50px"
                                  objectFit="cover"
                                  borderRadius="full"
                                />
                              ) : (
                                'N/A'
                              )}
                            </Td>
                          </Tr>
                        ))
                      ) : (
                        <Tr>
                          <Td colSpan="6" textAlign="center">No users found.</Td>
                        </Tr>
                      )}
                    </Tbody>
                  </Table>
                </Box>
              </VStack>
            </TabPanel>

            <TabPanel>
              <VStack spacing={4} align="start">
                <Text fontSize="lg">
                  Update user details here. Select a user and modify their information.
                </Text>
                <SimpleGrid columns={2} spacing={4} width="full">
                  {users.map((user) => (
                    <Box key={user._id} p={4} background="white" borderWidth="1px" borderRadius="md" width="full">
                      <Text fontWeight="bold">{user.name}</Text>
                      <Text>Email: {user.email}</Text>
                      <Text>Phone: {user.phone}</Text>
                      <Text>State: {user.state}</Text>
                      <Text>Address: {user.address}</Text>
                      <Button
                        mt={2}
                        colorScheme="teal"
                        size="sm"
                        onClick={() => handleUpdateClick(user)}
                      >
                        Update
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>


            <TabPanel>
              <Text fontSize="lg">Add a new user by filling in the details below.</Text>
              <Box bg="white" p={6} borderRadius="md" shadow="md">
                <VStack spacing={4} align="start" bg="white">
                  <FormControl mb={4}>
                    <FormLabel> Name <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                    <Input
                      type="text"
                      name="newUserName"
                      value={formData.newUserName || ''}
                      onChange={handleFormChange}
                      required
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>
                      Email <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup>
                    </FormLabel>
                    <Input
                      type="email"
                      name="newUserEmail"
                      value={formData.newUserEmail || ''}
                      onChange={handleFormChange}
                      ref={emailInputRef}
                      required
                    />
                    {emailError && <Text color="red.500" fontSize="sm">{emailError}</Text>}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>
                      Password <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup>
                    </FormLabel>
                    <Input
                      type="password"
                      name="newUserPassword"
                      value={formData.newUserPassword || ''}
                      onChange={handleFormChange}
                      required
                    />
                    {passwordError && <Text color="red.500" fontSize="sm">{passwordError}</Text>}
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Phone</FormLabel>
                    <Input
                      type="text"
                      name="newUserPhone"
                      value={formData.newUserPhone || ''}
                      onChange={handleFormChange}
                      ref={phoneInputRef}
                    />
                    {phoneError && <Text color="red.500" fontSize="sm">{phoneError}</Text>}
                  </FormControl>
                  <FormControl >
                    <FormLabel>State</FormLabel>
                    <Select
                      placeholder="Select state"
                      name="newUserState"
                      value={formData.newUserState || ''}
                      onChange={handleFormChange}
                    >
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                      <option value="Assam">Assam</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Goa">Goa</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Himachal Pradesh">Himachal Pradesh</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Manipur">Manipur</option>
                      <option value="Meghalaya">Meghalaya</option>
                      <option value="Mizoram">Mizoram</option>
                      <option value="Nagaland">Nagaland</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Sikkim">Sikkim</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Tripura">Tripura</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                      <option value="West Bengal">West Bengal</option>
                    </Select>
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Address</FormLabel>
                    <Input
                      type="text"
                      name="newUserAddress"
                      value={formData.newUserAddress || ''}
                      onChange={handleFormChange}
                    />
                  </FormControl>
                  <FormControl mb={4}>
                    <FormLabel>Profile Image</FormLabel>
                    <Input type="file" onChange={handleFileChange} />
                  </FormControl>
                  <Button onClick={handleAddUserSubmit} colorScheme="teal">Add User</Button>
                </VStack>
              </Box>
            </TabPanel>
            <TabPanel>
              <VStack spacing={4} align="start">
                <Text fontSize="lg">
                  Delete an user.Select a user to delete them from the system.
                </Text>
                <SimpleGrid columns={2} spacing={4} width="full">
                  {users.map((user) => (
                    <Box key={user._id} p={4} background="white" borderWidth="1px" borderRadius="md" width="full">
                      <Text fontWeight="bold">{user.name}</Text>
                      <Text>Email: {user.email}</Text>
                      <Text>Phone: {user.phone}</Text>
                      <Text>State: {user.state}</Text>
                      <Text>Address: {user.address}</Text>
                      <Button
                        mt={2}
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleDeleteClick(user)}
                      >
                        Delete
                      </Button>
                    </Box>
                  ))}
                </SimpleGrid>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>

        {/* Modal for updating user details*/}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  ref={emailInputRef}
                />
                {emailError && <Text color="red.500">{emailError}</Text>}
              </FormControl>
              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  ref={phoneInputRef}
                />
                {phoneError && <Text color="red.500">{phoneError}</Text>}
              </FormControl>

                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Select
                    name="state"
                    placeholder="--Select State--"
                    value={formData.state}
                    onChange={handleFormChange}
                  >
                    {[
                      "Andhra Pradesh",
                      "Arunachal Pradesh",
                      "Assam",
                      "Bihar",
                      "Chhattisgarh",
                      "Goa",
                      "Gujarat",
                      "Haryana",
                      "Himachal Pradesh",
                      "Jharkhand",
                      "Karnataka",
                      "Kerala",
                      "Madhya Pradesh",
                      "Maharashtra",
                      "Manipur",
                      "Meghalaya",
                      "Mizoram",
                      "Nagaland",
                      "Odisha",
                      "Punjab",
                      "Rajasthan",
                      "Sikkim",
                      "Tamil Nadu",
                      "Telangana",
                      "Tripura",
                      "Uttar Pradesh",
                      "Uttarakhand",
                      "West Bengal",
                      "Andaman and Nicobar Islands",
                      "Chandigarh",
                      "Dadra and Nagar Haveli and Daman and Diu",
                      "Delhi",
                      "Lakshadweep",
                      "Puducherry"
                    ].map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel>Address</FormLabel>
                  <Input
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Profile Image</FormLabel>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleUpdateSubmit}>
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>


        {/* Modal for confirming user deletion */}
        <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete User</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this user?</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>No</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
}

export default ManageUsers;
