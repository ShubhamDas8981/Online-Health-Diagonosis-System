import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Heading } from '@chakra-ui/react';
import { Folder, File } from './Folder'; // Ensure the path is correct
import NavbarNew from './NavbarNew';
import HealthDetails from './HealthDetails';
import DiagnosisArchive from './DiagonosisArchive';
import AppointmentArchive from './AppointmentArchive';
function MainPage() {
  // 1. Create the component
  function DataTabs({ data }) {
    return (
      <Tabs>
        <TabList>
          {data.map((tab, index) => (
            <Tab key={index}>{tab.label}</Tab>
          ))}
        </TabList>
        <TabPanels>
          {data.map((tab, index) => (
            <TabPanel p={4} key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    );
  }

  // 2. Create an array of data
  const tabData = [
    {
      label: 'Health Record',
      content: (
          <Box>
          <div className='container'>
          <HealthDetails />
          </div>
          </Box>
      ),
    },
    {
      label: 'Diagnosis Archive',
      content: (
        <Box>
        <div className='container'>
          <DiagnosisArchive />
          </div>
        </Box>
      ),
    },
    {
      label: 'Appointment Archive',
      content: (
        <Box>
          <div className='container'>
              <AppointmentArchive />
          </div>
        </Box>
      ),
    }
  ];

  return (
    <Box>
    <NavbarNew/>
    <div className='healthRecord'>
      
      <Heading as="h1" size="xl" mb={4}>Your Health Record</Heading>
      <DataTabs data={tabData} />
    </div>
    </Box>
  );
}

export default MainPage;
