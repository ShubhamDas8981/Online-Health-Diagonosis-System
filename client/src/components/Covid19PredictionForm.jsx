import React, { useState } from 'react';
import {
  ChakraProvider, Box, Button, FormControl, FormLabel, Stack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure,IconButton,Select
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
// import NavbarNew from './NavbarNew';
import axios from 'axios';

const Covid19Form = () => {
  const history = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [responseMessage, setResponseMessage] = useState('');
  const [formData, setFormData] = useState({
    Fever: '',
    Tiredness: '',
    DryCough: '',
    DifficultyinBreathing: '',
    SoreThroat: '',
    None_Sympton: '',
    Pains: '',
    NasalCongestion: '',
    RunnyNose: '',
    Diarrhea: '',
    None_Experiencing: '',
    gender: '',
    age: '',
    contact: '',
  });

  // const handleChange = (name, value) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8013/covid_19', formData);
      setResponseMessage(response.data);
      onOpen();
    } catch (error) {
      console.error('Error submitting form:', error);
      setResponseMessage('Error submitting form');
      onOpen();
    }
  };

  return (
    <ChakraProvider>
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
        <h1>COVID-19 Assessment Form</h1>
        <hr />
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
          <FormControl id="Fever">
                <FormLabel>Fever</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Fever}
                  onChange={(e) => setFormData({ ...formData, Fever: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Tiredness">
                <FormLabel>Tiredness</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Tiredness}
                  onChange={(e) => setFormData({ ...formData, Tiredness: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="DryCough">
                <FormLabel>Dry Cough</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.DryCough}
                  onChange={(e) => setFormData({ ...formData, DryCough: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="DifficultyinBreathing">
                <FormLabel>Difficulty in Breathing</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.DifficultyinBreathing}
                  onChange={(e) => setFormData({ ...formData, DifficultyinBreathing: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="SoreThroat">
                <FormLabel>Sore Throat</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.SoreThroat}
                  onChange={(e) => setFormData({ ...formData, SoreThroat: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="None_Sympton">
                <FormLabel>None Sympton</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.None_Sympton}
                  onChange={(e) => setFormData({ ...formData, None_Sympton: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Pains">
                <FormLabel>Pains</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Pains}
                  onChange={(e) => setFormData({ ...formData, Pains: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="NasalCongestion">
                <FormLabel>Nasal Congestion</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.NasalCongestion}
                  onChange={(e) => setFormData({ ...formData, NasalCongestion: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="RunnyNose">
                <FormLabel>Runny Nose</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.RunnyNose}
                  onChange={(e) => setFormData({ ...formData, RunnyNose: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Diarrhea">
                <FormLabel>Diarrhea</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Diarrhea}
                  onChange={(e) => setFormData({ ...formData, Diarrhea: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="None_Experiencing">
                <FormLabel>None Experiencing</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.None_Experiencing}
                  onChange={(e) => setFormData({ ...formData, None_Experiencing: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="gender">
                <FormLabel>Gender</FormLabel>
                <Select
                  placeholder="Select Gender"
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                >
                  <option value="0">Female</option>
                  <option value="1">Male</option>
                  <option value="2">Transgender</option>
                </Select>
              </FormControl>
              <FormControl id="age">
                <FormLabel>Age</FormLabel>
                <Select
                  placeholder="Select you age category"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                >
                  <option value="0">Age 0-9 years</option>
                  <option value="1">Age 10-19 years</option>
                  <option value="2">Age 20-24 years</option>
                  <option value="3">Age 60+</option>
                </Select>
              </FormControl>
              <FormControl id="contact">
                <FormLabel>Are you came in Contact with anyone having COVID ?</FormLabel>
                <Select
                  placeholder="Select you category"
                  value={formData.contact}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                >
                  <option value="0">Don't know</option>
                  <option value="1">No</option>
                  <option value="2">Yes</option>
                </Select>
              </FormControl>
            <Button type="submit" colorScheme="teal">Submit</Button>
          </Stack>
        </form>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Response</ModalHeader>
          <ModalBody>
            {responseMessage}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      </Box>
    </ChakraProvider>
  );
};

export default Covid19Form;
