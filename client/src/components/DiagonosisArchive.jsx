import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Image,
  useToast,
  Textarea,
  SimpleGrid,
  Text,
  Heading,
} from '@chakra-ui/react';
import axios from 'axios';

const DiagnosisArchive = () => {
  const [diagnosisDetails, setDiagnosisDetails] = useState('');
  const [diagnosisType, setDiagnosisType] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [diagnoses, setDiagnoses] = useState([]);
  const toast = useToast();

  // Retrieve token from localStorage or another storage solution
  const token = localStorage.getItem('token');

  // Fetch diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/diagnoses', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        // Log the response to verify its structure
        console.log('Fetched diagnoses:', response.data);

        // Handle response based on its structure
        if (response.data && Array.isArray(response.data.diagnoses)) {
          setDiagnoses(response.data.diagnoses);
        } else {
          console.error('Expected an array but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching diagnoses:', error);
      }
    };

    fetchDiagnoses();
  }, [token]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('diagnosisDetails', diagnosisDetails);
    formData.append('diagnosisType', diagnosisType);
    formData.append('image', image);
  
    try {
      await axios.post('http://localhost:8000/add-diagnosis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      toast({
        title: 'Diagnosis added.',
        description: 'Your diagnosis has been successfully added.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
  
      // Clear form
      setDiagnosisDetails('');
      setDiagnosisType('');
      setImage(null);
      setImagePreview(null);
  
      // Fetch updated diagnoses
      const updatedDiagnoses = await axios.get('http://localhost:8000/diagnoses', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      // Check if the response has the expected structure
      if (updatedDiagnoses.data && Array.isArray(updatedDiagnoses.data.diagnoses)) {
        setDiagnoses(updatedDiagnoses.data.diagnoses);
      } else {
        console.error('Expected an array but received:', updatedDiagnoses.data);
      }
    } catch (error) {
      console.error('Error occurred while submitting form:', error.response || error.message || error);
      toast({
        title: 'An error occurred.',
        description: `Unable to add diagnosis. ${error.response?.data?.message || 'Please try again.'}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };
  
  return (
    <Box maxW="7xl" mx="auto" mt={5}>
      <Box maxW="md" mx="auto" mb={10} bg="white" p={5} borderRadius="md" shadow="md">
        <Heading mb={5}>Add Diagnosis</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl id="diagnosisDetails" isRequired>
            <FormLabel>Diagnosis Details</FormLabel>
            <Textarea
              value={diagnosisDetails}
              onChange={(e) => setDiagnosisDetails(e.target.value)}
            />
          </FormControl>
          <FormControl id="diagnosisType" isRequired>
            <FormLabel>Diagnosis Type</FormLabel>
            <Input
              value={diagnosisType}
              onChange={(e) => setDiagnosisType(e.target.value)}
            />
          </FormControl>
          <FormControl id="image" mt={4}>
            <FormLabel>Upload Image</FormLabel>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </FormControl>
          {imagePreview && (
            <Box mt={4}>
              <Image src={imagePreview} alt="Image Preview" />
            </Box>
          )}
          <Button type="submit" colorScheme="teal" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
      <Box mt={10} bg="white" p={5} borderRadius="md" shadow="md">
        <Heading mb={5}>All Diagnoses</Heading>
        <SimpleGrid columns={[1, 2, 3]} spacing={5}>
          {Array.isArray(diagnoses) ? (
            diagnoses.map((diagnosis) => (
              <Box key={diagnosis.id} borderWidth="1px" borderRadius="lg" overflow="hidden" bg="white" shadow="md">
                {diagnosis.imageUrl && (
                  <Image 
                    src={`http://localhost:8000/${diagnosis.imageUrl}`} 
                    alt={diagnosis.diagnosisDetails} 
                    objectFit="cover"
                  />
                )}
                <Box p={5}>
                  <Text fontWeight="bold">{diagnosis.diagnosisType}</Text>
                  <Text>{diagnosis.diagnosisDetails}</Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text>No diagnoses available</Text>
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default DiagnosisArchive;
