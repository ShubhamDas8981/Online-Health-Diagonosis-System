// import React, { useState } from 'react';
// import {
//   Button,
//   Input,
//   Select,
//   FormControl,
//   FormLabel,
//   Box,
//   Heading,
//   useToast,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
// } from '@chakra-ui/react';
// //import { useNavigate } from 'react-router-dom';
// // import './CSS/Style.css';

// function HealthDetails() {
//   const [formData, setFormData] = useState({
//     bloodGroup: '',
//     bp: '',
//     weight: '',
//     height: '',
//     birthDate: '',
//     gender: '',
//     allergies: '',
//     vaccinationHistory: '',
//     familyMedicalHistory: '',
//     smokingStatus: '',
//     alcoholConsumption: '',
//     exerciseHabits: '',
//     emergencyContactName: '',
//     emergencyContactRelation: '',
//     emergencyContactPhone: '',
//     insuranceDetails: '',
//   });
//   const [error, setError] = useState('');
//   const toast = useToast();
//   //const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const token = localStorage.getItem('token');
  
//     try {
//       const response = await fetch('http://localhost:8000/health-details-record1', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });
  
//       if (response.ok) {
//         toast({
//           title: 'Success',
//           description: 'Health details saved successfully.',
//           status: 'success',
//           duration: 5000,
//           isClosable: true,
//           position: "top",
//         });
//         //navigate('/home');
//         setFormData({
//           bloodGroup: '',
//           bp: '',
//           weight: '',
//           height: '',
//           birthDate: '',
//           gender: '',
//           allergies: '',
//           vaccinationHistory: '',
//           familyMedicalHistory: '',
//           smokingStatus: '',
//           alcoholConsumption: '',
//           exerciseHabits: '',
//           emergencyContactName: '',
//           emergencyContactRelation: '',
//           emergencyContactPhone: '',
//           insuranceDetails: '',
//         });
//       } else {
//         const error = await response.json();
//         setError(`Error: ${error.message}`);
//       }
//     } catch (error) {
//       setError(`Network error: ${error.message}`);
//     }
//   };

//   return (
//     <Box p={5}>
      
//       <Box bg="white" p={5} borderRadius="md" boxShadow="md">
//       <Heading as="h1" mb={5}>Health Details</Heading>
//         <form onSubmit={handleSubmit}>
//           <Accordion allowToggle>
//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Preliminary Details
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
//                   <Input
//                     type="date"
//                     id="birthDate"
//                     name="birthDate"
//                     value={formData.birthDate}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="bloodGroup">Blood Group</FormLabel>
//                   <Input
//                     type="text"
//                     id="bloodGroup"
//                     name="bloodGroup"
//                     value={formData.bloodGroup}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="gender">Gender</FormLabel>
//                   <Select
//                     id="gender"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="male">Male</option>
//                     <option value="female">Female</option>
//                     <option value="other">Other</option>
//                   </Select>
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>

//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Vital Signs
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="height">Height</FormLabel>
//                   <Input
//                     type="text"
//                     id="height"
//                     name="height"
//                     value={formData.height}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="weight">Weight</FormLabel>
//                   <Input
//                     type="text"
//                     id="weight"
//                     name="weight"
//                     value={formData.weight}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="bp">Blood Pressure</FormLabel>
//                   <Input
//                     type="text"
//                     id="bp"
//                     name="bp"
//                     value={formData.bp}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="heartRate">Heart Rate</FormLabel>
//                   <Input
//                     type="text"
//                     id="heartRate"
//                     name="heartRate"
//                     value={formData.heartRate || ''}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>

//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Medical History
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="allergies">Allergies</FormLabel>
//                   <Input
//                     type="text"
//                     id="allergies"
//                     name="allergies"
//                     value={formData.allergies}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="vaccinationHistory">Vaccination History</FormLabel>
//                   <Input
//                     type="text"
//                     id="vaccinationHistory"
//                     name="vaccinationHistory"
//                     value={formData.vaccinationHistory}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="familyMedicalHistory">Family Medical History</FormLabel>
//                   <Input
//                     type="text"
//                     id="familyMedicalHistory"
//                     name="familyMedicalHistory"
//                     value={formData.familyMedicalHistory}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>

//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Lifestyle
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="smokingStatus">Smoking Status</FormLabel>
//                   <Select
//                     id="smokingStatus"
//                     name="smokingStatus"
//                     value={formData.smokingStatus}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="smoker">Smoker</option>
//                     <option value="non-smoker">Non-Smoker</option>
//                   </Select>
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="alcoholConsumption">Alcohol Consumption</FormLabel>
//                   <Select
//                     id="alcoholConsumption"
//                     name="alcoholConsumption"
//                     value={formData.alcoholConsumption}
//                     onChange={handleChange}
//                   >
//                     <option value="">Select Consumption</option>
//                     <option value="regular">Regular</option>
//                     <option value="occasional">Occasional</option>
//                     <option value="never">Never</option>
//                   </Select>
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="exerciseHabits">Exercise Habits</FormLabel>
//                   <Input
//                     type="text"
//                     id="exerciseHabits"
//                     name="exerciseHabits"
//                     value={formData.exerciseHabits}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>

//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Emergency Contact
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="emergencyContactName">Name</FormLabel>
//                   <Input
//                     type="text"
//                     id="emergencyContactName"
//                     name="emergencyContactName"
//                     value={formData.emergencyContactName}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="emergencyContactRelation">Relation</FormLabel>
//                   <Input
//                     type="text"
//                     id="emergencyContactRelation"
//                     name="emergencyContactRelation"
//                     value={formData.emergencyContactRelation}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="emergencyContactPhone">Phone</FormLabel>
//                   <Input
//                     type="text"
//                     id="emergencyContactPhone"
//                     name="emergencyContactPhone"
//                     value={formData.emergencyContactPhone}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>

//             <AccordionItem>
//               <h2>
//                 <AccordionButton>
//                   <Box as='span' flex='1' textAlign='left'>
//                     Insurance Details
//                   </Box>
//                   <AccordionIcon />
//                 </AccordionButton>
//               </h2>
//               <AccordionPanel pb={4}>
//                 <FormControl mb={3}>
//                   <FormLabel htmlFor="insuranceDetails">Insurance Details</FormLabel>
//                   <Input
//                     type="text"
//                     id="insuranceDetails"
//                     name="insuranceDetails"
//                     value={formData.insuranceDetails}
//                     onChange={handleChange}
//                   />
//                 </FormControl>
//               </AccordionPanel>
//             </AccordionItem>
//           </Accordion>

//           <Button mt={4} colorScheme="teal" type="submit">Submit</Button>
//         </form>
//       </Box>
//       {error && <Box color="red.500" mt={4}>{error}</Box>}
//     </Box>
//   );
// }

// export default HealthDetails;


import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Box,
  Heading,
  useToast,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
// import { useNavigate } from 'react-router-dom';
// import './CSS/Style.css';

function HealthDetails() {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    bp: '',
    weight: '',
    height: '',
    birthDate: '',
    gender: '',
    allergies: '',
    vaccinationHistory: '',
    familyMedicalHistory: '',
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseHabits: '',
    emergencyContactName: '',
    emergencyContactRelation: '',
    emergencyContactPhone: '',
    insuranceDetails: '',
  });
  const [error, setError] = useState('');
  const toast = useToast();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchHealthDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/health-details-record1', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          const error = await response.json();
          setError(`Error: ${error.message}`);
        }
      } catch (error) {
        setError(`Network error: ${error.message}`);
      }
    };

    fetchHealthDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/health-details-record1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Health details saved successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        // navigate('/home');
        setFormData({
          bloodGroup: '',
          bp: '',
          weight: '',
          height: '',
          birthDate: '',
          gender: '',
          allergies: '',
          vaccinationHistory: '',
          familyMedicalHistory: '',
          smokingStatus: '',
          alcoholConsumption: '',
          exerciseHabits: '',
          emergencyContactName: '',
          emergencyContactRelation: '',
          emergencyContactPhone: '',
          insuranceDetails: '',
        });
      } else {
        const error = await response.json();
        setError(`Error: ${error.message}`);
      }
    } catch (error) {
      setError(`Network error: ${error.message}`);
    }
  };

  return (
    <Box p={5}>
      <Box bg="white" p={5} borderRadius="md" boxShadow="md">
        <Heading as="h1" mb={5}>Health Details</Heading>
        <form onSubmit={handleSubmit}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Preliminary Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="birthDate">Birth Date</FormLabel>
                  <Input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="bloodGroup">Blood Group</FormLabel>
                  <Input
                    type="text"
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="gender">Gender</FormLabel>
                  <Select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </Select>
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Vital Signs
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="height">Height</FormLabel>
                  <Input
                    type="text"
                    id="height"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="weight">Weight</FormLabel>
                  <Input
                    type="text"
                    id="weight"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="bp">Blood Pressure</FormLabel>
                  <Input
                    type="text"
                    id="bp"
                    name="bp"
                    value={formData.bp}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="heartRate">Heart Rate</FormLabel>
                  <Input
                    type="text"
                    id="heartRate"
                    name="heartRate"
                    value={formData.heartRate || ''}
                    onChange={handleChange}
                  />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Medical History
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="allergies">Allergies</FormLabel>
                  <Input
                    type="text"
                    id="allergies"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="vaccinationHistory">Vaccination History</FormLabel>
                  <Input
                    type="text"
                    id="vaccinationHistory"
                    name="vaccinationHistory"
                    value={formData.vaccinationHistory}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="familyMedicalHistory">Family Medical History</FormLabel>
                  <Input
                    type="text"
                    id="familyMedicalHistory"
                    name="familyMedicalHistory"
                    value={formData.familyMedicalHistory}
                    onChange={handleChange}
                  />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Lifestyle Information
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="smokingStatus">Smoking Status</FormLabel>
                  <Select
                    id="smokingStatus"
                    name="smokingStatus"
                    value={formData.smokingStatus}
                    onChange={handleChange}
                  >
                    <option value="">Select Smoking Status</option>
                    <option value="none">None</option>
                    <option value="occasional">Occasional</option>
                    <option value="frequent">Frequent</option>
                  </Select>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="alcoholConsumption">Alcohol Consumption</FormLabel>
                  <Select
                    id="alcoholConsumption"
                    name="alcoholConsumption"
                    value={formData.alcoholConsumption}
                    onChange={handleChange}
                  >
                    <option value="">Select Alcohol Consumption</option>
                    <option value="none">None</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </Select>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="exerciseHabits">Exercise Habits</FormLabel>
                  <Input
                    type="text"
                    id="exerciseHabits"
                    name="exerciseHabits"
                    value={formData.exerciseHabits}
                    onChange={handleChange}
                  />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Emergency Contacts
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="emergencyContactName">Emergency Contact Name</FormLabel>
                  <Input
                    type="text"
                    id="emergencyContactName"
                    name="emergencyContactName"
                    value={formData.emergencyContactName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="emergencyContactRelation">Emergency Contact Relation</FormLabel>
                  <Input
                    type="text"
                    id="emergencyContactRelation"
                    name="emergencyContactRelation"
                    value={formData.emergencyContactRelation}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel htmlFor="emergencyContactPhone">Emergency Contact Phone</FormLabel>
                  <Input
                    type="text"
                    id="emergencyContactPhone"
                    name="emergencyContactPhone"
                    value={formData.emergencyContactPhone}
                    onChange={handleChange}
                  />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as='span' flex='1' textAlign='left'>
                    Insurance Details
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl mb={3}>
                  <FormLabel htmlFor="insuranceDetails">Insurance Details</FormLabel>
                  <Input
                    type="text"
                    id="insuranceDetails"
                    name="insuranceDetails"
                    value={formData.insuranceDetails}
                    onChange={handleChange}
                  />
                </FormControl>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {error && <Box color="red.500" mb={3}>{error}</Box>}
          <Button type="submit" colorScheme="blue" mt={5}>Submit</Button>
        </form>
      </Box>
    </Box>
  );
}

export default HealthDetails;
