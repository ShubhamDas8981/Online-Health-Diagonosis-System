import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Heading, Menu, MenuButton, MenuList, MenuItem, Avatar, Button, Flex, Spacer ,Image} from "@chakra-ui/react";
import axios from 'axios';

const NavbarAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get("http://localhost:8000/admin-details", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

          console.log("Admin details response:", response.data);

          setProfileImage(response.data.profileImage ? `http://localhost:8000/${response.data.profileImage}` : null);
          setAdminName(response.data.name || "Admin");
        } catch (error) {
          console.error("Error fetching admin profile image", error);
        }
      }
    };

    fetchAdminProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    navigate('/');
  };

  return (
    <Flex as="nav" p={4} bg="gray.100" color="white" textColor="black">
      <Link className="navbar-brand" to="/admin-panel">
      <Flex align="center">
          <Image
            src="images/Doctors symbol.gif"
            alt="Doctor Symbol"
            boxSize="50px" // Adjust the size as needed
            mr={3} // Spacing between the GIF and heading
          />
        <Heading as="h1" size="lg">
          Online Health Management System
        </Heading>
        </Flex>
      </Link>
      <Spacer />
      <Menu>
        <MenuButton as={Button} variant="link" p={0}>
          <Avatar name={adminName} src={profileImage} size="sm" />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}

export default NavbarAdmin;
