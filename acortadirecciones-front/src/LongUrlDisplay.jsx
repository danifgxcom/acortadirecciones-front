import React from 'react';
import { Text } from '@chakra-ui/react';

const LongUrlDisplay = ({ longUrl, color, isExpanded }) => {
  const style = {
    overflow: isExpanded ? 'auto' : 'hidden',
    whiteSpace: isExpanded ? 'pre-wrap' : 'nowrap',
    textOverflow: 'ellipsis',
  };
  return (
    <Text style={style} color={color}>
      {longUrl}
    </Text>
  );
};

export default LongUrlDisplay;
