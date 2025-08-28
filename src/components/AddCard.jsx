import { useState } from 'react';
import { Box, Textarea, Button, HStack, Text, Flex } from '@chakra-ui/react';

const AddCard = ({ onAddCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddCard(text);
      setText('');
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Flex
        onClick={() => setIsEditing(true)}
        p={2}
        borderRadius="md"
        _hover={{ bg: 'gray.300' }}
        cursor="pointer"
      >
        <Text color="gray.600">+ Adicionar um cartão</Text>
      </Flex>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Digite o texto para este cartão..."
        size="sm"
        bg="white"
        color="gray.800"
        autoFocus
      />
      <HStack mt={2}>
        <Button type="submit" colorScheme="blue" size="sm">
          Adicionar Cartão
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
          Cancelar
        </Button>
      </HStack>
    </Box>
  );
};

export default AddCard;