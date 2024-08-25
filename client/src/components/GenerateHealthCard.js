import React, { useState, useEffect } from 'react';
import { Box, Input, Button, FormControl, FormLabel, FormErrorMessage, Image, Text, Stack, Flex, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Link } from "@chakra-ui/react";
import QRCode from 'qrcode.react';
import axios from 'axios';
import NavbarNew from './NavbarNew';
import html2canvas from 'html2canvas';

// Helper component for required labels
const RequiredFormLabel = ({ children }) => (
  <FormLabel>
    {children} <span style={{ color: 'red' }}>*</span>
  </FormLabel>
);

const GenerateHealthCard = () => {
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [idPhoto, setIdPhoto] = useState(null);
  const [healthInfo, setHealthInfo] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(true);  // For dialog visibility
  
  // Error states
  const [fullNameError, setFullNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [bloodGroupError, setBloodGroupError] = useState('');
  const [idPhotoError, setIdPhotoError] = useState('');

  const validateForm = () => {
    let isValid = true;
    if (!fullName) {
      setFullNameError('Full Name is required');
      isValid = false;
    } else {
      setFullNameError('');
    }

    if (!dob) {
      setDobError('Date of Birth is required');
      isValid = false;
    } else {
      setDobError('');
    }

    if (!bloodGroup) {
      setBloodGroupError('Blood Group is required');
      isValid = false;
    } else {
      setBloodGroupError('');
    }

    if (!idPhoto) {
      setIdPhotoError('ID Photo is required');
      isValid = false;
    } else {
      setIdPhotoError('');
    }

    return isValid;
  };

  const formatHealthInfoForQR = (info) => {
    return `
Name: ${info.fullName || ''}
DOB: ${info.dob || ''}
Blood Group: ${info.bloodGroup || ''}
Blood Pressure: ${info.bloodPressure || ''}
Weight: ${info.weight || ''}
Height: ${info.height || ''}
Birth Date: ${info.birthDate || ''}
Gender: ${info.gender || ''}
Allergies: ${info.allergies || ''}
Vaccination History: ${info.vaccinationHistory || ''}
Family Medical History: ${info.familyMedicalHistory || ''}
Smoking Status: ${info.smokingStatus || ''}
Alcohol Consumption: ${info.alcoholConsumption || ''}
Exercise Habits: ${info.exerciseHabits || ''}
Emergency Contact Name: ${info.emergencyContactName || ''}
Emergency Contact Relation: ${info.emergencyContactRelation || ''}
Emergency Contact Phone: ${info.emergencyContactPhone || ''}
Insurance Details: ${info.insuranceDetails || ''}
    `.trim();
  };


  const handleGenerate = async () => {
    if (!validateForm()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/health-details", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHealthInfo({
        ...response.data,
        fullName,
        dob,
        bloodGroup
      });
      setIsGenerated(true);
    } catch (error) {
      console.error("Error fetching health details", error);
    }
  };

  const handleDownload = () => {
    const element = document.getElementById('healthCard');
    html2canvas(element).then(canvas => {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = `${fullName}_HealthCard.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  // Effect to show dialog on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDialogOpen(true);
    }, 1000);  // Show the dialog after 1 second for better UX
    return () => clearTimeout(timer);
  }, []);

  const onCloseDialog = () => setIsDialogOpen(false);

  return (
    <Box>
      <NavbarNew/>
      <Flex direction="column" minH="100vh" align="center" p={5}>
        {/* Form Section */}
        <Box bg="white" p={5} borderRadius="md" boxShadow="md" maxW="md" mb={10} width="100%">
          <FormControl id="full-name" mb={4} isInvalid={!!fullNameError}>
            <RequiredFormLabel>Full Name</RequiredFormLabel>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <FormErrorMessage>{fullNameError}</FormErrorMessage>
          </FormControl>
          <FormControl id="dob" mb={4} isInvalid={!!dobError}>
            <RequiredFormLabel>Date of Birth</RequiredFormLabel>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
            <FormErrorMessage>{dobError}</FormErrorMessage>
          </FormControl>
          <FormControl id="blood-group" mb={4} isInvalid={!!bloodGroupError}>
            <RequiredFormLabel>Blood Group</RequiredFormLabel>
            <Input value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
            <FormErrorMessage>{bloodGroupError}</FormErrorMessage>
          </FormControl>
          <FormControl id="id-photo" mb={4} isInvalid={!!idPhotoError}>
            <RequiredFormLabel>ID Photo</RequiredFormLabel>
            <Input type="file" accept="image/*" onChange={(e) => setIdPhoto(e.target.files[0])} />
            <FormErrorMessage>{idPhotoError}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" onClick={handleGenerate}>Generate</Button>
        </Box>

        {/* Health Card Section */}
        {isGenerated && (
          <Box bg="white" p={5} borderRadius="md" boxShadow="md" maxW="xl" width="100%" flex="1" minH="400px" id="healthCard">
            {healthInfo && (
              <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" boxShadow="md" bg="gray.50" minH="100%">
                <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">Health Card</Text>
                <Stack spacing={4} align="center" mb={4}>
                  <Image
                    src={idPhoto ? URL.createObjectURL(idPhoto) : '/path/to/default/image'}
                    alt="ID Photo"
                    boxSize="150px"
                    borderRadius="md"
                  />
                  <Stack spacing={1} textAlign="left">
                    <Text fontSize="lg" fontWeight="bold">Name:</Text>
                    <Text fontSize="md">{fullName}</Text>
                    <Text fontSize="lg" fontWeight="bold">Date of Birth:</Text>
                    <Text fontSize="md">{new Date(dob).toLocaleDateString()}</Text>
                    <Text fontSize="lg" fontWeight="bold">Blood Group:</Text>
                    <Text fontSize="md">{bloodGroup}</Text>
                  </Stack>
                </Stack>
                <Box mt={4} textAlign="center">
                  <QRCode
                    id="qrCode"
                    value={formatHealthInfoForQR(healthInfo)}// Update this if you want to include more details
                    size={256}
                    level={"H"}
                    includeMargin={true}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}

        {/* Download Button */}
        {isGenerated && (
          <Box bg="white" p={5} borderRadius="md" boxShadow="md" mt={4}>
            <Button colorScheme="teal" onClick={handleDownload}>Download</Button>
          </Box>
        )}
      </Flex>

      {/* Alert Dialog */}
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={onCloseDialog}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Notice
            </AlertDialogHeader>
            <AlertDialogBody>
              Please ensure that you filled up the <Link color="teal.500" href="/Health-Details" isExternal>health record details</Link> correctly for representing correct details in the generated Health Card.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button colorScheme="teal" onClick={onCloseDialog}>
                OK
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default GenerateHealthCard;
