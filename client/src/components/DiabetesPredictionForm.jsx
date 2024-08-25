import React, { useState } from 'react';
import {ChakraProvider, Box, Button, FormControl, FormLabel, NumberInput, NumberInputField, Stack, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, IconButton,Select } from '@chakra-ui/react';
import axios from 'axios';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';


const DiabetesPredictionForm = () => {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    smoking_history: '',
    bmi: '',
    HbA1c_level: '',
    blood_glucose_level: '',
  });
  const [response, setResponse] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8010/diabetes_prediction', formData);
      setResponse(res.data);
      onOpen();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <ChakraProvider>
   
    <Box>
    <IconButton
          aria-label="Back to landing page"
          icon={<ArrowBackIcon />}
          onClick={() => history("/health-checkup")}
          position="absolute"
          top={4}
          left={4}
          variant="outline"
          backgroundColor={"white"}
        />
      <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" bg="white">
        <h1>Diabetes Assessment Form</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
                  <FormControl id="gender">
              <FormLabel>Enter your Gender</FormLabel>
              <Select
                placeholder="Select gender"
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              >
                <option value="0">Female</option>
                <option value="1">Male</option>
                <option value="2">Others</option>
              </Select>
            </FormControl>
            <FormControl id="age">
              <FormLabel>Age (Maximum 80 Years)</FormLabel>
              <NumberInput value={formData.age} onChange={(valueString) => setFormData({ ...formData, age: valueString })}>
                <NumberInputField name="age"  placeholder='Enter your age in numeric '/>
              </NumberInput>
            </FormControl>
            <FormControl id="hypertension">
              <FormLabel>Are you suffering from Hypertension ?</FormLabel>
              <Select
                placeholder="Choose"
                value={formData.hypertension}
                onChange={(e) => setFormData({ ...formData, hypertension: e.target.value })}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Select>
            </FormControl>
            <FormControl id="heart_disease">
              <FormLabel>Are you suffering from Heart Disease ?</FormLabel>
              <Select
                placeholder="Choose"
                value={formData.heart_disease}
                onChange={(e) => setFormData({ ...formData, heart_disease: e.target.value })}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </Select>
            </FormControl>
            <FormControl id="smoking_history">
              <FormLabel>Smoking History ?</FormLabel>
              <Select
                placeholder="Choose"
                value={formData.smoking_history}
                onChange={(e) => setFormData({ ...formData, smoking_history: e.target.value })}
              >
                <option value="0">No Information</option>
                <option value="1">Currently</option>
                <option value="2">Not Current</option>
                <option value="3">Former</option>
                <option value="4">Never</option>
                <option value="4">Ever</option>
              </Select>
            </FormControl>
            <FormControl id="bmi">
              <FormLabel>BMI (Body Mass Index)</FormLabel>
              <NumberInput value={formData.bmi} onChange={(valueString) => setFormData({ ...formData, bmi: valueString })}>
                <NumberInputField name="bmi" placeholder='Enter you BMI in numeric'/>
              </NumberInput>
            </FormControl>
            <FormControl id="HbA1c_level">
              <FormLabel>HbA1c Level (mmol/mol)</FormLabel>
              <NumberInput value={formData.HbA1c_level} onChange={(valueString) => setFormData({ ...formData, HbA1c_level: valueString })}>
                <NumberInputField name="HbA1c_level" placeholder='Enter your HbA1c Level in numeric'/>
              </NumberInput>
            </FormControl>
            <FormControl id="blood_glucose_level">
              <FormLabel>Blood Glucose Level (mg/dL)</FormLabel>
              <NumberInput value={formData.blood_glucose_level} onChange={(valueString) => setFormData({ ...formData, blood_glucose_level: valueString })}>
                <NumberInputField name="blood_glucose_level" placeholder='Enter your Blood Glucose Level in numeric'/>
              </NumberInput>
            </FormControl>
            <Button type="submit" colorScheme="teal">Submit</Button>
          </Stack>
        </form>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Prediction Result</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {response && (
              <pre>{JSON.stringify(response, null, 2)}</pre>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </ChakraProvider>
  );
};

export default DiabetesPredictionForm;

