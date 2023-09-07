import React from 'react';
import { Button, Center, VStack } from '@chakra-ui/react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  return (
    <Center h="100vh" bg="gray.100">
      <VStack spacing={4}>
        <Button onClick={handleGoogleLogin} colorScheme="blue" size="lg">
          Login with Google
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
