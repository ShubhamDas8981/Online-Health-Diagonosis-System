import React, { useState, useEffect } from 'react';
import {
  Box, Input, Button, Select, SimpleGrid, Heading, Text, Avatar,
  Card, CardBody, CardFooter, Flex, useToast, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import axios from 'axios';
import NavbarNew from './NavbarNew'; 

function AppointmentBooking() {
  const [location, setLocation] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    const fetchPatient = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const response = await axios.get("http://localhost:8000/user-details", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPatientName(response.data.name);
      } catch (error) {
        console.error("Error fetching user", error.response ? error.response.data : error.message);
      }
    };
    fetchPatient();
  }, []);

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:8000/doctors", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          location,
          name: doctorName,
          specialization
        }
      });

      if (response.data.doctors.length === 0) {
        toast({
          title: "No Doctors Found",
          description: "No doctors match your search criteria.",
          status: "info",
          duration: 3000,
          isClosable: true,
          position:"top"
        });
      }
      setDoctors(response.data.doctors);
    } catch (error) {
      console.error("Error fetching doctors", error.response ? error.response.data : error.message);
    }
  };

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    onOpen();
  };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setAppointmentDate(selectedDate);

    if (selectedDoctor && selectedDate) {
      try {
        const response = await axios.get("http://localhost:8000/available-time-slots", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          params: {
            doctorId: selectedDoctor._id,
            date: selectedDate
          }
        });
        setAvailableTimes(response.data.availableSlots);
      } catch (error) {
        console.error("Error fetching available time slots", error.response ? error.response.data : error.message);
      }
    }
  };

  const handleProceed = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const token = localStorage.getItem('token');
    if (!token) {
      toast({
        title: "Authentication Required",
        description: "Please log in to book an appointment.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/appointments",
        {
          patientName,
          doctorId: selectedDoctor._id,
          specialization: selectedDoctor.specialization,
          location: selectedDoctor.location,
          time: appointmentTime,
          date: appointmentDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast({
        title: "Appointment Booked",
        description: "Your appointment has been successfully booked.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
      onClose();
      window.location.reload(); // Reload the page
    } catch (error) {
      console.error("Error booking appointment", error.response ? error.response.data : error.message);
      toast({
        title: "Booking Failed",
        description: error.response?.data?.message || "There was an error booking your appointment.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    
    <Box >
    <NavbarNew /> 
      <Card mt={4} mb={6}>
        <CardBody>
          <Heading mb={6} textAlign="center">Book an Appointment</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Input
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e) => setDoctorName(e.target.value)}
            />
            <Select
              placeholder="--Specialization--"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
            >
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="General Physician">General Physician</option>
              <option value="Pediatrician">Pediatrician</option>
              <option value="Dentist">Dentist</option>
            </Select>
          </SimpleGrid>
        </CardBody>
        <CardFooter alignItems="center">
          <Button onClick={handleSearch} colorScheme="teal">Search</Button>
        </CardFooter>
      </Card>
      <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4} mt={6}>
        {doctors.map((doctor) => (
          <Box key={doctor._id} p={4} shadow="md" background="white" borderWidth="1px">
            <Avatar src={`http://localhost:8000/${doctor.profileImage}`} size="lg" mb={4} />
            <Heading fontSize="xl">{doctor.name}</Heading>
            <Text mt={2}>{doctor.specialization}</Text>
            <Text mt={2}>{doctor.location}</Text>
            <Text mt={2}>{doctor.contact}</Text>
            <Flex justify="flex-end" mt={4}>
              <Button colorScheme="teal" onClick={() => handleBookAppointment(doctor)}>Book Appointment</Button>
            </Flex>
          </Box>
        ))}
      </SimpleGrid>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) hue-rotate(90deg)' />
        <ModalContent>
          <ModalHeader>Book Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}><b>Doctor:</b> {selectedDoctor?.name}</Text>
            <Text mb={4}><b>Specialization:</b> {selectedDoctor?.specialization}</Text>
            <Input
              placeholder="Enter the Patient Name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              mb={4}
            />
            <Select
              placeholder="--Select Date--"
              value={appointmentDate}
              onChange={handleDateChange}
              mb={4}
            >
              {selectedDoctor?.date.map((date, index) => (
                <option key={index} value={date}>{date}</option>
              ))}
            </Select>
            <Select
              placeholder="--Select Time--"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              mb={4}
            >
              {availableTimes.map((time, index) => (
                <option key={index} value={time}>{time}</option>
              ))}
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleProceed}>Proceed</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AppointmentBooking;






