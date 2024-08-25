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
    ModalFooter,
    useDisclosure,
    useToast,
    Select,
    SimpleGrid
} from "@chakra-ui/react";

function ManageDoctor() {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({});
    const [profileImage, setProfileImage] = useState(null); // For handling image uploads
    const [contactError, setContactError] = useState('');
    const contactInputRef = useRef(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [doctorToDelete, setDoctorToDelete] = useState(null);

    const fetchDoctors = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const response = await axios.get('http://localhost:8000/doctors', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const doctorsWithUpdatedImages = response.data.doctors.map(doctor => ({
                ...doctor,
                profileImage: doctor.profileImage.startsWith('http') ? doctor.profileImage : `http://localhost:8000/${doctor.profileImage}`
            }));
            setDoctors(doctorsWithUpdatedImages);
        } catch (error) {
            setError('Failed to load doctors.');
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleUpdateClick = (doctor) => {
        setSelectedDoctor(doctor);
        setFormData({
            name: doctor.name,
            location: doctor.location,
            specialization: doctor.specialization,
            contact: doctor.contact,
            timeSlots: doctor.timeSlots.join(', '),
            date: doctor.date.join(', ')
        });
        setProfileImage(null); // Reset profile image
        onOpen(); // Open modal
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

    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };


    const handleUpdateSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token || !selectedDoctor) return;

        if (!validatePhoneNumber(formData.contact)) {
            setContactError('Phone number must be exactly 10 digits long.');
            contactInputRef.current.focus();
            return;
        } else {
            setContactError('');
        }

        const formDataToSend = new FormData();
        formDataToSend.append('doctorId', selectedDoctor._id);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('location', formData.location);
        formDataToSend.append('specialization', formData.specialization);
        formDataToSend.append('contact', formData.contact);
        formDataToSend.append('timeSlots', formData.timeSlots.split(','));
        formDataToSend.append('date', formData.date.split(','));
        if (profileImage) {
            formDataToSend.append('profileImage', profileImage);
        }

        try {
            await axios.post('http://localhost:8000/update-doctors', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast({
                title: "Doctor updated.",
                description: "Doctor details have been updated successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            onClose();
            fetchDoctors(); // Refresh doctors list here if needed
        } catch (error) {
            toast({
                title: "Update failed.",
                description: "Failed to update doctor details.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const handleAddDoctorSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;

        // Validate required fields
        if (!formData.newDoctorName || !formData.newDoctorLocation || !formData.newDoctorSpecialization ||
            !formData.newDoctorContact || !formData.newDoctorTimeSlots || !formData.newDoctorDate) {
            toast({
                title: "Validation Error",
                description: "Please fill out all required fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            return;
        }

        // Validate phone number
        if (!validatePhoneNumber(formData.newDoctorContact)) {
            setContactError('Phone number must be exactly 10 digits long.');
            if (contactInputRef.current) {

                contactInputRef.current.focus();
            }
            return;
        } else {
            setContactError('');
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.newDoctorName);
        formDataToSend.append('location', formData.newDoctorLocation);
        formDataToSend.append('specialization', formData.newDoctorSpecialization);
        formDataToSend.append('contact', formData.newDoctorContact);
        formDataToSend.append('timeSlots', formData.newDoctorTimeSlots.split(', ')); // Convert string to array
        formDataToSend.append('date', formData.newDoctorDate.split(', ')); // Convert string to array
        if (profileImage) {
            formDataToSend.append('profileImage', profileImage);
        }

        try {
            await axios.post('http://localhost:8000/add-doctor', formDataToSend, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            toast({
                title: "Doctor added.",
                description: "New doctor has been added successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            fetchDoctors();
            setFormData({});
            setProfileImage(null);
        } catch (error) {
            toast({
                title: "Add failed.",
                description: "Failed to add new doctor.",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const handleDeleteClick = (doctor) => {
        setDoctorToDelete(doctor);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        const token = localStorage.getItem('token');
        if (!token || !doctorToDelete) return;

        try {
            await axios.delete('http://localhost:8000/delete-doctor', {
                data: { doctorId: doctorToDelete._id },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            toast({
                title: "Doctor deleted.",
                description: "Doctor has been removed successfully.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top"
            });
            setIsDeleteModalOpen(false);
            fetchDoctors(); // Refresh the doctor list after deletion
        } catch (error) {
            console.error("Delete failed:", error);
            toast({
                title: "Delete failed.",
                description: "Failed to delete doctor.",
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
                <Heading as="h1" mb={10} textAlign="center">Manage Doctors</Heading>
                <Tabs variant="enclosed" colorScheme="teal">
                    <TabList>
                        <Tab _selected={{ color: 'white', bg: 'teal.500' }}>View Doctors</Tab>
                        <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Update Details</Tab>
                        <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Add Doctors</Tab>
                        <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Delete Doctors</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <VStack spacing={4} align="start">
                                <Text fontSize="lg">
                                    View the list of all doctors. You can see detailed information about each doctor here.
                                </Text>
                                {error && <Text color="red.500">{error}</Text>}
                                <Box width="full" overflowX="auto">
                                    <Table
                                        variant="striped"
                                        colorScheme="teal"
                                        borderWidth="1px"
                                        borderRadius="md"
                                        boxShadow="md"
                                        size="sm" // Adjust size for better responsiveness
                                    >
                                        <Thead bg="gray.100" color="white">
                                            <Tr>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Name</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Location</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Specialization</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Contact</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Profile Image</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Time Slots</Th>
                                                <Th p={4} borderRadius="15px" borderWidth="1px" borderColor="gray.300">Date</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody bg="gray.50">
                                            {doctors.map((doctor) => (
                                                <Tr key={doctor._id}>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.name}</Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.location}</Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.specialization}</Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.contact}</Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">
                                                        {doctor.profileImage ? (
                                                            <Image src={doctor.profileImage} boxSize="50px" objectFit="cover" />
                                                        ) : (
                                                            "No image"
                                                        )}
                                                    </Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.timeSlots.join(', ')}</Td>
                                                    <Td p={4} borderWidth="1px" borderColor="gray.300">{doctor.date.join(', ')}</Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </Table>
                                </Box>
                            </VStack>
                        </TabPanel>
                        <TabPanel>
                            <Box p={10}>
                                <VStack spacing={4} align="start">
                                    <Text fontSize="lg">Update doctor details here. Select a doctor and modify their information.</Text>
                                    <SimpleGrid columns={2} spacing={4} width="full">
                                        {doctors.map((doctor) => (
                                            <Box key={doctor._id} p={4} background="white" borderWidth="1px" borderRadius="md" width="full">
                                                <Text fontWeight="bold">{doctor.name}</Text>
                                                <Text>Location: {doctor.location}</Text>
                                                <Text>Specialization: {doctor.specialization}</Text>
                                                <Text>Contact: {doctor.contact}</Text>
                                                <Text>Time Slots: {doctor.timeSlots.join(', ')}</Text>
                                                <Text>Date: {doctor.date.join(', ')}</Text>
                                                <Button
                                                    mt={2}
                                                    colorScheme="teal"
                                                    size="sm"
                                                    onClick={() => handleUpdateClick(doctor)}
                                                >
                                                    Update
                                                </Button>
                                            </Box>
                                        ))}
                                    </SimpleGrid>
                                </VStack>

                                {/* Modal for Update Doctor */}
                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent>
                                        <ModalHeader>Update Doctor</ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <FormControl id="name" isRequired>
                                                <FormLabel>Name</FormLabel>
                                                <Input name="name" value={formData.name || ''} onChange={handleFormChange} />
                                            </FormControl>
                                            <FormControl id="location" isRequired>
                                                <FormLabel>Location</FormLabel>
                                                <Input name="location" value={formData.location || ''} onChange={handleFormChange} />
                                            </FormControl>
                                            <FormControl id="specialization" isRequired>
                                                <FormLabel>Specialization</FormLabel>
                                                <Input name="specialization" value={formData.specialization || ''} onChange={handleFormChange} />
                                            </FormControl>
                                            <FormControl id="contact" isRequired>
                                                <FormLabel>Contact</FormLabel>
                                                <Input
                                                    name="contact"
                                                    value={formData.contact || ''}
                                                    onChange={handleFormChange}
                                                    ref={contactInputRef}
                                                />
                                                {contactError && <Text color="red.500">{contactError}</Text>}
                                            </FormControl>
                                            <FormControl id="timeSlots" isRequired>
                                                <FormLabel>Time Slots</FormLabel>
                                                <Input name="timeSlots" value={formData.timeSlots || ''} onChange={handleFormChange} />
                                            </FormControl>
                                            <FormControl id="date" isRequired>
                                                <FormLabel>Date</FormLabel>
                                                <Input name="date" value={formData.date || ''} onChange={handleFormChange} />
                                            </FormControl>
                                            <FormControl id="profileImage">
                                                <FormLabel>Profile Image</FormLabel>
                                                <Input type="file" onChange={handleFileChange} />
                                            </FormControl>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button colorScheme="teal" mr={3} onClick={handleUpdateSubmit}>
                                                Update
                                            </Button>
                                            <Button variant="ghost" onClick={onClose}>Cancel</Button>
                                        </ModalFooter>
                                    </ModalContent>
                                </Modal>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <Text fontSize="lg">
                                Add a new doctor. Fill in the details and upload a profile image if needed.
                            </Text>
                            <Box bg="white" p={6} borderRadius="md" shadow="md">
                                <VStack spacing={4} align="start">
                                    <FormControl mb={4}>
                                        <FormLabel>Name <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Input
                                            name="newDoctorName"
                                            value={formData.newDoctorName || ''}
                                            onChange={handleFormChange}
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Location <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Input
                                            name="newDoctorLocation"
                                            value={formData.newDoctorLocation || ''}
                                            onChange={handleFormChange}
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Specialization <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Select
                                            name="newDoctorSpecialization"
                                            value={formData.newDoctorSpecialization || ''}
                                            onChange={handleFormChange}
                                        >
                                            <option value="">Select Specialization</option>
                                            <option value="Cardiologist">Cardiologist</option>
                                            <option value="Dermatologist">Dermatologist</option>
                                            <option value="General Physician">General Physician</option>
                                            <option value="Pediatrician">Pediatrician</option>
                                            <option value="Dentist">Dentist</option>
                                        </Select>
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Contact <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Input
                                            name="newDoctorContact"
                                            value={formData.newDoctorContact || ''}
                                            onChange={handleFormChange}
                                            ref={contactInputRef}
                                        />
                                        {contactError && <Text color="red.500">{contactError}</Text>}
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Time Slots <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Input
                                            name="newDoctorTimeSlots"
                                            value={formData.newDoctorTimeSlots || ''}
                                            onChange={handleFormChange}
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Date <sup style={{ color: 'red', fontSize: 'sm' }}>*</sup></FormLabel>
                                        <Input
                                            name="newDoctorDate"
                                            value={formData.newDoctorDate || ''}
                                            onChange={handleFormChange}
                                        />
                                    </FormControl>
                                    <FormControl mb={4}>
                                        <FormLabel>Profile Image</FormLabel>
                                        <Input type="file" onChange={handleFileChange} />
                                    </FormControl>
                                    <Button colorScheme="teal" onClick={handleAddDoctorSubmit}>
                                        Add Doctor
                                    </Button>
                                </VStack>
                            </Box>
                        </TabPanel>
                        <TabPanel>
                            <VStack spacing={4} align="start">
                                <Text fontSize="lg">
                                    Delete a doctor from the list. Select a doctor to remove them.
                                </Text>
                                <SimpleGrid columns={2} spacing={4} width="full">
                                    {doctors.map((doctor) => (
                                        <Box key={doctor._id} p={4} background="white" borderWidth="1px" borderRadius="md" mb={4}>
                                            <Text><strong>Name:</strong> {doctor.name}</Text>
                                            <Text><strong>Location:</strong> {doctor.location}</Text>
                                            <Text><strong>Specialization:</strong> {doctor.specialization}</Text>
                                            <Text><strong>Contact:</strong> {doctor.contact}</Text>
                                            <Text><strong>Time Slots:</strong> {doctor.timeSlots.join(', ')}</Text>
                                            <Text><strong>Date:</strong> {doctor.date.join(', ')}</Text>
                                            {/* <Text>
                                            <strong>Profile Image:</strong>
                                            {doctor.profileImage ? (
                                                <Image src={doctor.profileImage} boxSize="50px" objectFit="cover" />
                                            ) : (
                                                "No image"
                                            )}
                                        </Text> */}
                                            <Button colorScheme="red" onClick={() => handleDeleteClick(doctor)}>
                                                Delete
                                            </Button>
                                        </Box>
                                    ))}
                                </SimpleGrid>
                            </VStack>
                            <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Confirm Delete</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        Are you sure you want to delete this doctor?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>
                                            Delete
                                        </Button>
                                        <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
}

export default ManageDoctor;
