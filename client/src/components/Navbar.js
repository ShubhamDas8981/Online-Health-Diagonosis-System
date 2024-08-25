import React from "react";
import { Link } from "react-router-dom";
import { Heading, Flex, Button, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex as="nav" p={4} bg="gray.100" color="black" align="center">
      <Link to="/">
        <Flex align="center">
          <Image
            src="images/Doctors symbol.gif"
            alt="Doctor Symbol"
            boxSize="50px" // Adjust the size as needed
            mr={3} // Spacing between the GIF and heading
          />
          <Heading as="h1" size="lg">
            Online Health Diagnosis System
          </Heading>
        </Flex>
      </Link>
      <Flex ml="auto">
        <Link to="/Login">
          <Button colorScheme="blue" mx={2} borderRadius="10px">
            Login
          </Button>
        </Link>
        <Link to="/Signup">
          <Button colorScheme="teal" mx={2} mr={-2} borderRadius="10px">
            Signup
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default Navbar;
