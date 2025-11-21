import { Box, Text, IconButton, Flex, Textarea, useOutsideClick } from '@chakra-ui/react';
import { Draggable } from '@hello-pangea/dnd';
import { EditIcon, DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useState, useRef } from 'react';

const Card = ({ card, index, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(card.text);
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (isEditing) setIsEditing(false);
    },
  });

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(editedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(card.text);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={card.id} index={index} isDragDisabled={isEditing}>
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
            role="group"
            position="relative"
            {...draggingStyles}
          >
            {isEditing ? (
              <Box ref={ref}>
                <Textarea
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                  size="sm"
                  resize="none"
                  mb={2}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSave();
                    }
                  }}
                />
                <Flex justify="flex-end" gap={2}>
                  <IconButton
                    icon={<CloseIcon />}
                    size="xs"
                    colorScheme="red"
                    onClick={handleCancel}
                    aria-label="Cancel"
                  />
                  <IconButton
                    icon={<CheckIcon />}
                    size="xs"
                    colorScheme="green"
                    onClick={handleSave}
                    aria-label="Save"
                  />
                </Flex>
              </Box>
            ) : (
              <Flex justify="space-between" align="flex-start" gap={2}>
                <Text color="gray.800" wordBreak="break-word" w="full">
                  {card.text}
                </Text>
                <Flex 
                  direction="column" 
                  gap={1} 
                  opacity={0} 
                  _groupHover={{ opacity: 1 }} 
                  transition="opacity 0.2s"
                >
                  <IconButton
                    icon={<EditIcon />}
                    size="xs"
                    variant="ghost"
                    colorScheme="blue"
                    onClick={() => setIsEditing(true)}
                    aria-label="Edit"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    size="xs"
                    variant="ghost"
                    colorScheme="red"
                    onClick={onDelete}
                    aria-label="Delete"
                  />
                </Flex>
              </Flex>
            )}
          </Box>
        );
      }}
    </Draggable>
  );
};

export default Card;