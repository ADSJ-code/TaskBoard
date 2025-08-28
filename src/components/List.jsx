import { Flex, Heading, VStack } from '@chakra-ui/react';
import { Droppable } from '@hello-pangea/dnd';
import Card from './Card';
import AddCard from './AddCard';

const List = ({ list, onAddCard }) => {
  const handleAddCard = (text) => {
    onAddCard(list.id, text);
  };

  return (
    <Flex
      direction="column"
      bg="#EDF2F7"
      borderRadius="md"
      p={2}
      w="272px"
      h="fit-content"
    >
      <Heading size="sm" p={2} color="gray.700">{list.title}</Heading>
      <Droppable droppableId={list.id} type="card">
        {(provided) => (
          <VStack
            ref={provided.innerRef}
            {...provided.droppableProps}
            spacing={2}
            align="stretch"
            p={1}
            flexGrow={1}
            minH="100px"
          >
            {list.cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </VStack>
        )}
      </Droppable>
      <AddCard onAddCard={handleAddCard} />
    </Flex>
  );
};

export default List;