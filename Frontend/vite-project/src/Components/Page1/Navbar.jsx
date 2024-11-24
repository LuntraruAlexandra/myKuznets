import { Box, Container, Flex, Button, Spacer, useColorMode } from '@chakra-ui/react';
import { IoMoon } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import React from 'react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const textColor = "#333330"; // Setăm culoarea dorită pentru text și iconițe

  return (
    <Box as="header" w="100%" color="white" py={4} px={8} boxShadow="md" position="fixed" top={0} zIndex="1000">
      <Container maxW="1200px">
        <Flex align="center">
          {/* Butoanele din stânga */}
          <Flex gap={3}>
            <Button variant="solid" color={textColor}>Meniu</Button>
            <Button variant="solid" color={textColor}>Credentials</Button>
            <Button variant="solid" color={textColor}>About Kuznets</Button>
          </Flex>

          <Spacer /> {/* Spațiu între butoane și secțiunea din dreapta */}

          {/* Butoanele din dreapta */}
          <Flex align="center">
            <Button onClick={toggleColorMode} ml={3} color={textColor}>
              {/* Setăm explicit culoarea iconiței */}
              {colorMode === 'light' ? <IoMoon color={textColor} /> : <LuSun color={textColor} />}
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
