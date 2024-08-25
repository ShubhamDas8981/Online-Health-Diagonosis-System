import React, { useEffect, useState } from 'react';
import { Box, Heading, SimpleGrid, Text, Spinner, useToast, useBreakpointValue, Tabs, TabList, TabPanels, TabPanel, Tab } from "@chakra-ui/react";
import axios from 'axios';
import NavbarAdmin from './NavbarAdmin';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

function ViewAnalytics() {
  const [userCount, setUserCount] = useState(null);
  const [doctorCount, setDoctorCount] = useState(null);
  const [locationData, setLocationData] = useState([]);
  const [userStateData, setUserStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const [userRes, doctorRes, locationRes, userStateRes] = await Promise.all([
          axios.get('http://localhost:8000/analytics/users', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/analytics/doctors', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/analytics/locations', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('http://localhost:8000/analytics/user-states', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setUserCount(userRes.data.userCount);
        setDoctorCount(doctorRes.data.doctorCount);
        setLocationData(locationRes.data);

        // Process user state data
        const processedUserStateData = userStateRes.data
          .filter(entry => entry._id && entry._id.trim() !== "") // Filter out entries with empty or undefined _id (state)
          .map(entry => ({
            _id: entry._id,
            count: entry.count
          }));

        setUserStateData(processedUserStateData);
      } catch (error) {
        console.error("Error fetching analytics data:", error); // Log the error
        toast({
          title: "Error fetching analytics data.",
          description: "There was an error fetching the analytics data. Please try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [toast]);

  // Responsive width for BarChart
  const chartWidth = useBreakpointValue({ base: 300, md: 600, lg: 800 });

  if (loading) {
    return (
      <Box textAlign="center" p={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading analytics data...</Text>
      </Box>
    );
  }

  return (
    <Box>
      <NavbarAdmin />
      <Box p={5} maxW="5xl" mx="auto">
        <Heading as="h1" mb={10} textAlign="center">Analytics</Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 2 }} spacing={10} justifyItems="center">
          <AnalyticsCard title="Registered Users" count={userCount} />
          <AnalyticsCard title="Registered Doctors" count={doctorCount} />
        </SimpleGrid>
        <Box mt={10}>
          <Tabs variant="enclosed">
            <TabList>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}>User Counts by State</Tab>
              <Tab _selected={{ color: 'white', bg: 'teal.500' }}>Doctor Counts by Location</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Heading as="h2" mb={6} textAlign="center">User Counts by State</Heading>
                <Box width="100%" height={{ base: 400, md: 500 }} bg="white" p={16} borderRadius="md">
                  <BarChart width={chartWidth} height={400} data={userStateData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" interval={0} angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </BarChart>
                </Box>
              </TabPanel>
              <TabPanel>
                <Heading as="h2" mb={6} textAlign="center">Doctor Counts by Location</Heading>
                <Box width="100%" height={{ base: 400, md: 500 }} bg="white" p={16} borderRadius="md">
                  <BarChart width={chartWidth} height={400} data={locationData} margin={{ bottom: 60 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" interval={0} angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}

function AnalyticsCard({ title, count }) {
  return (
    <Box
      boxShadow="rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
      borderRadius="50px"
      overflow="hidden"
      bg="gray.100"
      height="200px"
      width="100%"
      mx="auto"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      _hover={{
        transform: "translateY(-10px)",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset",
      }}
    >
      <Heading fontSize={{ base: "xl", md: "xxl" }} mb={2}>{title}</Heading>
      <Text fontSize={{ base: "lg", md: "xl" }}>{count}</Text>
    </Box>
  );
}

export default ViewAnalytics;
