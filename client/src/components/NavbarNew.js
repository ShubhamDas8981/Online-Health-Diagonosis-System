import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {Heading, Menu, MenuButton, MenuList, MenuItem, Avatar, Button, Flex, Spacer,Image } from "@chakra-ui/react";
import axios from 'axios';

const NavbarNew = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [userName, setUserName] = useState(location.state?.name || "User");
  const [isGoogleUser, setIsGoogleUser] = useState(location.state?.isGoogleUser || false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = location.state?.token || localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/user-details", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log("User details response:", response.data);

          if (isGoogleUser) {
            // Directly use the profileImage URL from Google
            setProfileImage(response.data.profileImage);
          } else {
            // Handle local or other image sources
            setProfileImage(response.data.profileImage.startsWith('http') ? response.data.profileImage : `http://localhost:8000/${response.data.profileImage}`);
          }

          setUserName(response.data.name || "User");
        } catch (error) {
          console.error("Error fetching user profile image", error);
        }
      }
    };

    fetchUserProfile();
  }, [location.state, isGoogleUser]);

  const handleAddDetails = () => {
    navigate('/add-details');
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    navigate('/');
  };

  return (
    <Flex as="nav" p={4} bg="gray.100" color="white" textColor="black">
      <Link className="navbar-brand" to="/home">
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
      <Spacer />
      <Menu>
        <MenuButton as={Button} variant="link" p={0}>
          <Avatar name={userName} src={profileImage} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleAddDetails}>Add More Details</MenuItem>
          <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavbarNew;
