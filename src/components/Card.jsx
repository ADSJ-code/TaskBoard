import { Box, Text } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => {
        const draggingStyles = snapshot.isDragging ? {
          transform: 'rotate(3deg)',
          boxShadow: 'xl',
        } : {};

        return (
          <Box
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            p={3}
            bg="white"
            borderRadius="md"
            boxShadow="sm"
            _hover={{ boxShadow: 'md' }}
            {...draggingStyles}
          >
            <Text color="gray.800">{card.text}</Text>
          </Box>
        );
      }}
    </Draggable>
  );
};

export default Card;