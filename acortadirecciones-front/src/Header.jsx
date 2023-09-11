import React, { useEffect, useState } from 'react';
import { Flex, Box, Text, Image, HStack, Button } from '@chakra-ui/react';

const Header = () => {
  const [userData, setUserData] = useState({});

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      document.cookie =
        'userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      setUserData({});

      window.location.href = '/logout';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    const userDataString = getCookie('userData');
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(decodeURIComponent(userDataString));
        setUserData(parsedUserData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <Flex
      bg="red.550"
      color="white"
      p={2}
      h="90px"
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Image boxSize="140px" objectFit="contain" src="logo.png" alt="Logo" />
      </Box>

      <Box>
        {userData.email ? (
          <>
            <HStack spacing={5}>
              <Text fontSize="lg" color="red.600">
                <b>Username:</b> {userData.username}
              </Text>
              <Text fontSize="lg" color="red.600">
                <b>Role:</b> {userData.role.replace(/,+/g, ' ')}
              </Text>
              <Button colorScheme="blue" onClick={logout}>
                Logout
              </Button>
            </HStack>
            <HStack spacing={5}>
              <Text fontSize="lg" color="red.600">
                <b>Email:</b> {userData.email}
              </Text>
              <Text fontSize="lg" color="red.600">
                <b>Last Request:</b> {userData.lastRequest}
              </Text>
            </HStack>
          </>
        ) : (
          <Text fontSize="lg" color="red.600">
            Not Logged In
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
