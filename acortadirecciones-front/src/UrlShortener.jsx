import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import SpinningLoader from './SpinningLoader';
import Cookies from 'js-cookie';
import {
  Tooltip,
  Button,
  Input,
  useToast,
  VStack,
  HStack,
  Flex,
  Center,
  Select,
  FormLabel,
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
  const [idLength, setIdLength] = useState(32);
  const [expirationHours, setExpirationHours] = useState(24);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [availableLengths, setAvailableLengths] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn } = useAuth();
  const jwtToken = isLoggedIn ? Cookies.get('jwt_token') : '';

  const showToast = useCallback(
    (message, color, duration = 2000) => {
      toast({
        title: message,
        status: color === 'red' ? 'error' : 'success',
        duration: duration,
        isClosable: true,
        colorScheme: color,
      });
    },
    [toast],
  );

  useEffect(() => {
    const fetchAvailableLengths = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'http://localhost:8080/option/available-lengths',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwtToken}`,
            },
          },
        );
        if (response.ok) {
          const lengths = await response.json();
          setAvailableLengths(lengths);
        } else {
          const errorMessage = await response.text();
          showToast(`Error: ${errorMessage}`, 'red', 10000);
        }
      } catch (error) {
        showToast(`Error fetching available lengths: ${error}`, 'red', 10000);
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableLengths();
  }, [jwtToken, showToast]);

  useEffect(() => {
    const shouldShowButton = resolvedUrl.length > 50;
    setShowExpandButton(shouldShowButton);
  }, [resolvedUrl]);

  const shortenUrl = async () => {
    try {
      const payload = {
        url,
        expirationHours: expirationHours,
        length: idLength,
      };
      const response = await fetch(SHORTEN_API_ENDPOINT, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setShortUrl(data.shortUrl);
      } else {
        const errorMessage = await response.text();
        showToast(`Error: ${errorMessage}`, 'red', 10000);
      }
    } catch (error) {
      showToast(`Error al acortar la URL: ${error}`, 'red', 10000);
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
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setResolvedUrl(data.longUrl);
      } else {
        const errorMessage = await response.text();
        showToast(`Error: ${errorMessage}`, 'red', 10000);
      }
    } catch (error) {
      showToast(`Error al verificar la URL: ${error}`, 'red', 10000);
    }
  };

  const copyToClipboardShort = () => {
    navigator.clipboard.writeText(shortUrl);
    showToast('URL corta copiada', 'blue');
  };

  const copyToClipboardResolved = () => {
    navigator.clipboard.writeText(resolvedUrl);
    showToast('URL resuelta copiada', 'green');
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
          </HStack>
          <HStack spacing={5}>
            <HStack align="center" minW="220px">
              <FormLabel
                fontSize="sm"
                color="blue.700"
                m={0}
                p={0}
                whiteSpace="nowrap"
              >
                Longitud del identificador
              </FormLabel>
              {loading ? (
                <SpinningLoader />
              ) : (
                <Select
                  w="100px"
                  value={idLength}
                  onChange={(e) => setIdLength(Number(e.target.value))}
                >
                  {availableLengths.map((length) => (
                    <option key={length} value={length}>
                      {length}
                    </option>
                  ))}
                </Select>
              )}
            </HStack>
            <HStack align="center" minW="220px">
              <FormLabel
                fontSize="sm"
                color="blue.700"
                m={0}
                p={0}
                whiteSpace="nowrap"
              >
                Expiración (en horas)
              </FormLabel>
              <Select
                w="100px"
                value={expirationHours}
                onChange={(e) => setExpirationHours(Number(e.target.value))}
              >
                <option value={24}>24</option>
                <option value={48}>48</option>
                <option value={72}>72</option>
              </Select>
            </HStack>
            <Button flex="1" colorScheme="blue" onClick={shortenUrl}>
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
                  onClick={copyToClipboardShort}
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
              {showExpandButton && (
                <Button onClick={() => setIsUrlExpanded(!isUrlExpanded)}>
                  {isUrlExpanded ? '-' : '+'}
                </Button>
              )}
              <Tooltip
                label="Copiar al portapapeles"
                aria-label="Copiar al portapapeles"
              >
                <CopyIcon
                  boxSize={6}
                  cursor="pointer"
                  onClick={copyToClipboardResolved}
                />
              </Tooltip>
            </HStack>
          )}
        </VStack>
      </Flex>
    </Center>
  );
};

export default UrlShortener;
