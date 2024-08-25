import React, { useState } from 'react';
import {
  ChakraProvider,  
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  NumberInput, 
  NumberInputField, 
  Stack, 
  useDisclosure, 
  Modal, 
  ModalOverlay, 
  ModalContent, 
  ModalHeader, 
  ModalCloseButton, 
  ModalBody, 
  ModalFooter,
  IconButton,
  Select 
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import NavbarNew from './NavbarNew';

const HeartDiseaseForm = () => {
  const history = useNavigate();
  
  const [formData, setFormData] = useState({
    Age: '',
    Sex: '',
    ChestPainType: '',
    RestingBP: '',
    Cholesterol: '',
    FastingBS: '',
    RestingECG: '',
    MaxHR: '',
    ExerciseAngina: '',
    Oldpeak: '',
    ST_Slope: '',
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
      const res = await axios.post('http://127.0.0.1:8011/heart_disease', formData);
      setResponse(res.data);
      onOpen();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <ChakraProvider>
    {/* <Box><NavbarNew /></Box> */}
    <Box>
      
      <IconButton
          aria-label="Back to landing page"
          icon={<ArrowBackIcon />}
          onClick={() => history("/health-checkup")}
          position="fixed"
          top={4}
          left={4}
          variant="outline"
          backgroundColor={"white"}
        />
    <Box maxW="md" mx="auto" mt={10} p={5} borderWidth={1} borderRadius="lg" bg="white">
    <h1>Heart Disease Assessment Form</h1>
        <hr />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="Age">
            <FormLabel>Age </FormLabel>
            <NumberInput value={formData.Age} onChange={(valueString) => setFormData({ ...formData, Age: valueString })}>
              <NumberInputField name="Age" placeholder='Enter your Age'/>
            </NumberInput>
          </FormControl>
            <FormControl id="sex">
                <FormLabel>Enter your Gender</FormLabel>
                <Select
                  placeholder="Select gender"
                  value={formData.Sex}
                  onChange={(e) => setFormData({ ...formData, Sex: e.target.value })}
                >
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                </Select>
              </FormControl>
          <FormControl id="ChestPainType">
                <FormLabel>Chest Pain Type</FormLabel>
                <Select
                  placeholder="Select Chest Pain Type"
                  value={formData.ChestPainType}
                  onChange={(e) => setFormData({ ...formData,ChestPainType: e.target.value })}
                >
                  <option value="0"> ASY (Asymptomatic)</option>
                  <option value="1">ATA (Atypical Angina)</option>
                  <option value="2">NAP (Non-Anginal Pain)</option>
                  <option value="3">TA (Typical angina)</option>
                </Select>
              </FormControl>
          <FormControl id="RestingBP">
            <FormLabel>Resting Blood Pressure (mm Hg)</FormLabel>
            <NumberInput value={formData.RestingBP} onChange={(valueString) => setFormData({ ...formData, RestingBP: valueString })}>
              <NumberInputField name="RestingBP"  placeholder='Enter your Resting Blood Pressure in numeric'/>
            </NumberInput>
          </FormControl>
          <FormControl id="Cholesterol">
            <FormLabel>Cholesterol (mg/dL)</FormLabel>
            <NumberInput value={formData.Cholesterol} onChange={(valueString) => setFormData({ ...formData, Cholesterol: valueString })}>
              <NumberInputField name="Cholesterol" placeholder='Enter your Cholestrol in numeric'/>
            </NumberInput>
          </FormControl>
          <FormControl id="FastingBS">
                <FormLabel>Fasting Blood Sugar</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.FastingBS}
                  onChange={(e) => setFormData({ ...formData, FastingBS: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
          <FormControl id="RestingECG">
                <FormLabel>Resting ECG</FormLabel>
                <Select
                  placeholder="Select Type"
                  value={formData.RestingECG}
                  onChange={(e) => setFormData({ ...formData, RestingECG: e.target.value })}
                >
                  <option value="0">LVH</option>
                  <option value="1">Normal</option>
                  <option value="2">ST</option>
                </Select>
              </FormControl>
          <FormControl id="MaxHR">
            <FormLabel>Maximum Heart Rate (BPM)</FormLabel>
            <NumberInput value={formData.MaxHR} onChange={(valueString) => setFormData({ ...formData, MaxHR: valueString })}>
              <NumberInputField name="MaxHR" placeholder='Enter your Heart Rate in numeric'/>
            </NumberInput>
          </FormControl>
          {/* <FormControl id="ExerciseAngina">
            <FormLabel>Exercise Angina (int)</FormLabel>
            <NumberInput value={formData.ExerciseAngina} onChange={(valueString) => setFormData({ ...formData, ExerciseAngina: valueString })}>
              <NumberInputField name="ExerciseAngina" />
            </NumberInput>
          </FormControl> */}
          <FormControl id="ExerciseAngina">
                <FormLabel>Exercise Angina</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.ExerciseAngina}
                  onChange={(e) => setFormData({ ...formData, ExerciseAngina: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
          <FormControl id="Oldpeak">
            <FormLabel>Oldpeak </FormLabel>
            <NumberInput value={formData.Oldpeak} onChange={(valueString) => setFormData({ ...formData, Oldpeak: valueString })}>
              <NumberInputField name="Oldpeak" placeholder='Enter the value in numeric'/>
            </NumberInput>
          </FormControl>
          {/* <FormControl id="ST_Slope">
            <FormLabel>ST Slope (int)</FormLabel>
            <NumberInput value={formData.ST_Slope} onChange={(valueString) => setFormData({ ...formData, ST_Slope: valueString })}>
              <NumberInputField name="ST_Slope" />
            </NumberInput>
          </FormControl> */}
          <FormControl id="ST_Slope">
                <FormLabel>ST Slope</FormLabel>
                <Select
                  placeholder="Select Type"
                  value={formData.ST_Slope}
                  onChange={(e) => setFormData({ ...formData, ST_Slope: e.target.value })}
                >
                  <option value="0">Down</option>
                  <option value="1">Flat</option>
                  <option value="2">Up</option>
                </Select>
              </FormControl>
          <Button type="submit" colorScheme="teal">Submit</Button>
        </Stack>
      </form>

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
    </Box>
    </ChakraProvider>
  );
};

export default HeartDiseaseForm;

