import React, { useEffect } from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

const Logout = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/login';
    }, 5000);
  }, []);

  return (
    <VStack
      spacing={4}
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
      }}
    >
      <Box
        p={8}
        maxW="md"
        borderWidth={1}
        borderRadius="lg"
        bg="white"
        boxShadow="lg"
      >
        <Text fontSize="2xl" mb={4} textAlign="center">
          Su sesión se ha
        </Text>
        <Text fontSize="2xl" mb={4} color="red.500" textAlign="center">
          cerrado correctamente
        </Text>
        <Text textAlign="center">
          Será redirigido a la página de inicio de sesión en 5 segundos.
        </Text>
      </Box>
    </VStack>
  );
};

export default Logout;
