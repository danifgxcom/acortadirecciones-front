import React, { useState } from 'react';
import {
  Tooltip,
  Button,
  Input,
  useToast,
  VStack,
  HStack,
  Flex,
  Center,
} from '@chakra-ui/react';
import { CopyIcon } from '@chakra-ui/icons';
import LongUrlDisplay from './LongUrlDisplay';

const UrlShortener = () => {
  const SHORTEN_API_ENDPOINT = 'http://localhost:8080/url';
  const VERIFY_API_ENDPOINT = 'http://localhost:8080/resolve';
  const [url, setUrl] = useState('');
  const [verifyUrl, setVerifyUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [resolvedUrl, setResolvedUrl] = useState('');
  const toast = useToast();
  const [isUrlExpanded, setIsUrlExpanded] = useState(false);

  const shortenUrl = async () => {
    try {
      const payload = {
        url,
        expirationHours: 24,
      };
      const response = await fetch(SHORTEN_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
      } else {
        console.error(
          `Error from server: ${response.status} ${response.statusText}`,
        );
      }
    } catch (error) {
      console.error('There was an error shortening the URL:', error);
    }
  };

  const verifyFullUrl = async () => {
    const id = verifyUrl.split('/').pop();
    const endpointWithId = `${VERIFY_API_ENDPOINT}/${id}`;
    try {
      const response = await fetch(endpointWithId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setResolvedUrl(data.longUrl);
    } catch (error) {
      console.error('There was an error verifying the URL:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast({
      title: 'URL copiada',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Center height="100vh" bg="gray.200">
      <Flex
        direction="column"
        bg="white"
        p={8}
        rounded={8}
        shadow="md"
        w="80%"
        maxW="800px"
        minH="600px"
      >
        <VStack spacing={5}>
          <HStack width="100%">
            <Input
              flex="1"
              placeholder="Ingrese su URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              bg="blue.100"
              borderColor="blue.500"
            />
            <Button colorScheme="blue" size="md" onClick={shortenUrl}>
              Acortar
            </Button>
          </HStack>
          {shortUrl && (
            <HStack>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <LongUrlDisplay longUrl={shortUrl} color="blue.500" />
              </div>
              <Tooltip label="Copy to Clipboard" aria-label="Copy to Clipboard">
                <CopyIcon
                  boxSize={6}
                  cursor="pointer"
                  onClick={copyToClipboard}
                />
              </Tooltip>
            </HStack>
          )}
          <HStack width="100%">
            <Input
              flex="1"
              placeholder="Verificar URL"
              value={verifyUrl}
              onChange={(e) => setVerifyUrl(e.target.value)}
              bg="green.100"
              borderColor="green.500"
            />
            <Button colorScheme="green" size="md" onClick={verifyFullUrl}>
              Verificar
            </Button>
          </HStack>
          {resolvedUrl && (
            <HStack width="100%">
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <LongUrlDisplay
                  longUrl={resolvedUrl}
                  color="green.500"
                  isExpanded={isUrlExpanded}
                />
              </div>
              <Button onClick={() => setIsUrlExpanded(!isUrlExpanded)}>
                {isUrlExpanded ? '-' : '+'}
              </Button>
            </HStack>
          )}
        </VStack>
      </Flex>
    </Center>
  );
};

export default UrlShortener;
