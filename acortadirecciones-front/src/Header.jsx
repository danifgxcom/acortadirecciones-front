import React from 'react';
import { Flex, Box, Text, Image } from '@chakra-ui/react';

const Header = () => {
  const userEmail = localStorage.getItem('userEmail'); // Reemplazar esto según dónde almacenes el email o nombre del usuario

  return (
    <Flex
      bg="blue.500"
      color="white"
      p={4}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Image
          boxSize="40px"
          objectFit="cover"
          src="logo.jpg" // Actualizar con la ruta correcta del logo
          alt="Logo"
        />
      </Box>
      <Box>
        {userEmail ? (
          <Text fontSize="lg">Welcome, {userEmail}</Text>
        ) : (
          <Text fontSize="lg">Not Logged In</Text>
        )}
      </Box>
    </Flex>
  );
};

export default Header;
