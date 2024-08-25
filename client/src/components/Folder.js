import React, { useState } from 'react';
import { Box, Button, Collapse, Icon, Text } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronDownIcon } from '@chakra-ui/icons';

const Folder = ({ name, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Box>
      <Button onClick={toggle} variant="link" size="sm" leftIcon={<Icon as={isOpen ? ChevronDownIcon : ChevronRightIcon} />}>
        {name}
      </Button>
      <Collapse in={isOpen} animateOpacity>
        <Box pl={4}>
          {children}
        </Box>
      </Collapse>
    </Box>
  );
};

const File = ({ name }) => {
  return <Text pl={6}>{name}</Text>;
};

export { Folder, File };
