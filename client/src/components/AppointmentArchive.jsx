import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import axios from 'axios';
import moment from 'moment-timezone';

// Helper function to format date (assuming date is in 'YYYY-MMM-DD' format)
const formatDate = (dateString) => {
    const [year, monthName, day] = dateString.split('-');
    const monthMap = {
        Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June',
        Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December'
    };
    const month = monthMap[monthName];
    return `${month} ${day} ${year}`;
};

// Helper function to format time from 12-hour to 24-hour format
// const formatTime = (timeString) => {
//     const [time, period] = timeString.split(' ');
//     const [hours, minutes] = time.split(':');
//     const hours24 = period === 'PM' ? (parseInt(hours) % 12) + 12 : parseInt(hours) % 12;
//     return `${hours24.toString().padStart(2, '0')}:${minutes.padStart(2, '0')}:00`;
// };

// const formatDateToMMMDDYYYY = (date) => {
//     const options = { year: 'numeric', month: 'short', day: '2-digit' };
//     const dateString = date.toLocaleDateString('en-US', options);
//     // Remove the comma and return the formatted date
//     return dateString.replace(',', '');
// };

const AppointmentArchive = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to get the token from localStorage or any other storage mechanism
    const getToken = () => {
        return localStorage.getItem('token'); // Adjust as per your token storage method
    };

    useEffect(() => {
        const fetchAppointments = async () => {
            const token = getToken();
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8000/appointment-archive', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setAppointments(response.data.appointments);
                setLoading(false);
            } catch (error) {
                //setError(error.message);
                setError("No Appointment Found !")
                //console.log("No appointment found")
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <VStack spacing={4} align="stretch">
            {appointments.map((appointment) => {
                // Convert appointment date and time
                const formattedDate = formatDate(appointment.date);
                //const formattedTime = formatTime(appointment.time); 
                //console.log(appointment.date)
                console.log(formattedDate)
                const finaldate=moment(formattedDate)
                console.log(finaldate)
                //const formattedDatefinal = moment().format(formattedDate,"MMMM DD YYYY");
                // Combine date and time for comparison, assuming UTC timezone
               //const appointmentDateTimeString = `${formattedDate}T${formattedTime}Z`;
                //console.log(`Time : ${appointmentDateTimeString}`)
                // Current time
                const now = moment().format("MMMM DD YYYY");
                console.log(now)
                const nowfinal = moment(now)
                console.log(nowfinal)
                //console.log(`Current Date: ${now}`);
                //console.log(`Formatted Current Date: ${formatDateToMMMDDYYYY(now)}`);
                //const currenttime = now.format("MMM Do YY");
                //const finalTime = moment().format(currenttime,"MMM Do YY");
                // Determine if the appointment is upcoming
                //const isUpcoming = formattedDate > now;
                // Determine if the appointment is upcoming
                const isUpcoming = finaldate.isAfter(nowfinal) ? true : false
                return (
                    <Box
                        key={appointment._id}
                        p={5}
                        shadow="md"
                        bg="white"
                        borderWidth="5px"
                        borderRadius="md"
                        borderColor={isUpcoming ? 'teal.500' : 'red.500'}
                        filter={isUpcoming ? 'none' : 'blur(1px)'}
                    >
                        <Heading fontSize="xl">{appointment.doctorId.name}</Heading>
                        <Text mt={4}>Patient Name: {appointment.patientName}</Text>
                        <Text>Specialization: {appointment.specialization}</Text>
                        <Text>Location: {appointment.location}</Text>
                        <Text>Date: {appointment.date}</Text>
                        <Text>Time: {appointment.time}</Text>
                        <Text mt={4} fontWeight="bold">
                            {isUpcoming ? 'Upcoming Appointment' : 'Previous Appointment'}
                        </Text>
                    </Box>
                );
            })}
        </VStack>
    );
};

export default AppointmentArchive;





