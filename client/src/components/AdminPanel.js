import React from "react";
import { Box, Heading, SimpleGrid, VStack, Text, Image, useBreakpointValue } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";
import Footer from "./Footer";
function AdminPanel() {
  return (
    <>
      <NavbarAdmin />
      <Box p={5} maxW="7xl" mx="auto">
        <Heading as="h1" mb={10} textAlign="center">Admin Panel</Heading>
        <SimpleGrid 
          columns={{ base: 1, sm: 2, md: 3 }} 
          spacing={10}
          p={5}
        >
          <AdminCard
            title="Manage Users"
            description="Add, edit, or remove users."
            imageSrc="/images/user icon.png"
            linkTo="/manage-users"
          />
          <AdminCard
            title="Manage Doctors"
            description="Add, edit, or remove doctors."
            imageSrc="/images/doctor icon.png"
            linkTo="/manage-doctors"
          />
          <AdminCard
            title="View Analytics"
            description="View usage statistics and reports."
            imageSrc="/images/analytics icon.png"
            linkTo="/view-analytics"
          />
        </SimpleGrid>
      </Box>
      <Footer/>
    </>
  );
}

function AdminCard({ title, description, imageSrc, linkTo }) {
  const navigate = useNavigate();
  
  return (
    <Box
      onClick={() => navigate(linkTo)}
      cursor="pointer"
      boxShadow="rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px"
      borderRadius="50px"
      overflow="hidden"
      bg="gray.100"
      height="300px"
      width={{ base: "100%", sm: "90%", md: "300px" }}
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
      <Image src={imageSrc} alt={`${title} Icon`} boxSize="100px" objectFit="contain" mb={4} />
      <Heading fontSize={{ base: "md", md: "lg" }} mb={2}>{title}</Heading>
      <Text fontSize={{ base: "sm", md: "md" }}>{description}</Text>
    </Box>
  );
}

export default AdminPanel;
