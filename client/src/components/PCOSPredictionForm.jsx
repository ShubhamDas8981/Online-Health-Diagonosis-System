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
  ModalBody, 
  ModalFooter,
  IconButton,
  Select 
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import NavbarNew from './NavbarNew';

const PCOSPredictionForm = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  // const [responseMessage, setResponseMessage] = useState('');
  const history = useNavigate();
  const [formData, setFormData] = useState({
    Age: '',
    Weight: '',
    Height: '',
    Blood_Group: '',
    Periods_Month: '',
    Weight_gained_recently: '',
    Excessive_hair_growth: '',
    Skin_darkening: '',
    Hair_loss: '',
    Pimples: '',
    Fast_food_regular: '',
    Exercise_regular: '',
    Mood_swings: '',
    Periods_regular: '',
    Period_days: '',
  });
  const [responseMessage, setResponseMessage] = useState('');
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
      const response = await axios.post('http://127.0.0.1:8012/PCOS', formData);
      console.log('Response from server:', response.data); // Log the response from the server
      setResponseMessage(response.data);
      onOpen();
    } catch (error) {
      console.error('Error submitting form:', error); // Log any error that occurs
      setResponseMessage('Error submitting form');
      onOpen();
    }
  };

  return (
    <>
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
            <h1>PCOS Assessment Form</h1><hr />
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                      <FormControl id="Age">
                    <FormLabel>Age (in Years) </FormLabel>
                    <NumberInput value={formData.Age} onChange={(valueString) => setFormData({ ...formData, Age: valueString })}>
                      <NumberInputField name="Age" placeholder='Enter your Age'/>
                    </NumberInput>
                  </FormControl>
                  <FormControl id="Weight">
                    <FormLabel>Weight (in Kg)</FormLabel>
                    <NumberInput value={formData.Weight} onChange={(valueString) => setFormData({ ...formData, Weight: valueString })}>
                      <NumberInputField name="Weight" placeholder='Enter your Weight'/>
                    </NumberInput>
                  </FormControl>
                  <FormControl id="Height">
                    <FormLabel>Height (in Cm / Feet)</FormLabel>
                    <NumberInput value={formData.Height} onChange={(valueString) => setFormData({ ...formData, Height: valueString })}>
                      <NumberInputField name="Height" placeholder='Enter your Height'/>
                    </NumberInput>
                  </FormControl>
                  <FormControl id="Blood_Group">
                <FormLabel>Can you tell us your blood group ?</FormLabel>
                <Select
                  placeholder="Select Blood Group"
                  value={formData.Blood_Group}
                  onChange={(e) => setFormData({ ...formData,Blood_Group: e.target.value })}
                >
                  <option value="11">A+</option>
                  <option value="12">A-</option>
                  <option value="13">B+</option>
                  <option value="14">B-</option>
                  <option value="15">O+</option>
                  <option value="16">O-</option>
                  <option value="17">AB+</option>
                  <option value="18">AB-</option>
                </Select>
              </FormControl>
              <FormControl id="Periods_Month">
                <FormLabel>After how many months do you get your periods?
                (select 1- if every month/regular)</FormLabel>
                <Select
                  placeholder="Select type"
                  value={formData.Periods_Month}
                  onChange={(e) => setFormData({ ...formData, Periods_Month: e.target.value })}
                >
                  <option value="1">Every Month/Regular</option>
                  <option value="2">2 Months</option>
                  <option value="3">3 Months</option>
                </Select>
              </FormControl>
              <FormControl id="Weight_gained_recently">
                <FormLabel>Have you gained weight recently?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Weight_gained_recently}
                  onChange={(e) => setFormData({ ...formData, Weight_gained_recently: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Excessive_hair_growth">
                <FormLabel>Do you have excessive body/facial hair growth ? </FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Excessive_hair_growth}
                  onChange={(e) => setFormData({ ...formData, Excessive_hair_growth: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Skin_darkening">
                <FormLabel>Are you noticing skin darkening recently?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Skin_darkening}
                  onChange={(e) => setFormData({ ...formData, Skin_darkening: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Hair_loss">
                <FormLabel>Do have hair loss/hair thinning/baldness ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Hair_loss}
                  onChange={(e) => setFormData({ ...formData, Hair_loss: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Pimples">
                <FormLabel>Do you have pimples/acne on your face/jawline ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Pimples}
                  onChange={(e) => setFormData({ ...formData, Pimples: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Fast_food_regular">
                <FormLabel>Do you eat fast food regularly ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Fast_food_regular}
                  onChange={(e) => setFormData({ ...formData, Fast_food_regular: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Exercise_regular">
                <FormLabel>Do you exercise on a regular basis ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Exercise_regular}
                  onChange={(e) => setFormData({ ...formData, Exercise_regular: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Mood_swings">
                <FormLabel>Do you experience mood swings ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Mood_swings}
                  onChange={(e) => setFormData({ ...formData, Mood_swings: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Periods_Regular">
                <FormLabel>Are your periods regular ?</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Periods_regular}
                  onChange={(e) => setFormData({ ...formData, Periods_regular: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Select>
              </FormControl>
              <FormControl id="Period_days">
                <FormLabel>How long does your period last ? (in Days)
                example- 1,2,3,4.....</FormLabel>
                <Select
                  placeholder="Select Yes/No"
                  value={formData.Period_days}
                  onChange={(e) => setFormData({ ...formData, Period_days: e.target.value })}
                >
                  <option value="0">No</option>
                  <option value="1">1 day</option>
                  <option value="2">2 days</option>
                  <option value="3">3 days</option>
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                  <option value="8">8 days</option>
                  <option value="9">9 days</option>
                  <option value="10">10 days</option>
                  <option value="14">14 days</option>
                  <option value="15">15 days</option>
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
    </>
  );
};

export default PCOSPredictionForm;

