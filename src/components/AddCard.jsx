import { useState } from 'react';
import { Box, Textarea, Button, HStack, Text, Flex } from '@chakra-ui/react';

const AddCard = ({ onAddCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const isPt = navigator.language.toLowerCase().startsWith('pt');
  const t = {
    add: isPt ? '+ Adicionar um cartão' : '+ Add a card',
    placeholder: isPt ? 'Digite o texto para este cartão...' : 'Enter a title for this card...',
    submit: isPt ? 'Adicionar Cartão' : 'Add Card',
    cancel: isPt ? 'Cancelar' : 'Cancel'
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
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
        <Text color="gray.600">{t.add}</Text>
      </Flex>
    );
  }

  return (
    <Box as="form" onSubmit={handleSubmit} w="100%">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={t.placeholder}
        size="sm"
        bg="white"
        color="gray.800"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <HStack mt={2}>
        <Button type="submit" colorScheme="blue" size="sm">
          {t.submit}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
          {t.cancel}
        </Button>
      </HStack>
    </Box>
  );
};

export default AddCard;