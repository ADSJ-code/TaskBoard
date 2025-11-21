import { Box, Heading, HStack, Container } from '@chakra-ui/react';
import { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import { initialData } from '../data/mockData';
import List from './List';
import backgroundImage from '../assets/background.jpg';

const Board = () => {
  const getLocalizedData = () => {
    const isPt = navigator.language.toLowerCase().startsWith('pt');
    
    const texts = {
      pt: { title: 'Meu TaskBoard', todo: 'A Fazer', doing: 'Em Andamento', done: 'Concluído' },
      en: { title: 'My TaskBoard', todo: 'To Do', doing: 'In Progress', done: 'Done' }
    };

    const t = isPt ? texts.pt : texts.en;
    const data = JSON.parse(JSON.stringify(initialData.board));

    data.title = t.title;
    
    if (data.lists.length > 0) data.lists[0].title = t.todo;
    if (data.lists.length > 1) data.lists[1].title = t.doing;
    if (data.lists.length > 2) data.lists[2].title = t.done;

    return data;
  };

  const [boardData, setBoardData] = useState(getLocalizedData);

  const handleAddCard = (listId, text) => {
    const newCard = {
      id: `card-${new Date().getTime()}`,
      text,
    };
    const newState = { ...boardData };
    const list = newState.lists.find(list => list.id === listId);
    list.cards.push(newCard);
    setBoardData(newState);
  };

  const handleDeleteCard = (listId, cardId) => {
    const newState = { ...boardData };
    const list = newState.lists.find(l => l.id === listId);
    list.cards = list.cards.filter(c => c.id !== cardId);
    setBoardData(newState);
  };

  const handleEditCard = (listId, cardId, newText) => {
    const newState = { ...boardData };
    const list = newState.lists.find(l => l.id === listId);
    const card = list.cards.find(c => c.id === cardId);
    if (card) {
      card.text = newText;
    }
    setBoardData(newState);
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    
    const startList = boardData.lists.find(list => list.id === source.droppableId);
    const finishList = boardData.lists.find(list => list.id === destination.droppableId);

    if (startList === finishList) {
      const newCards = Array.from(startList.cards);
      const [reorderedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, reorderedCard);

      const newList = {
        ...startList,
        cards: newCards,
      };

      const newBoardState = {
        ...boardData,
        lists: boardData.lists.map(list => (list.id === newList.id ? newList : list)),
      };
      setBoardData(newBoardState);
      return;
    }

    const startCards = Array.from(startList.cards);
    const [movedCard] = startCards.splice(source.index, 1);
    const newStartList = {
      ...startList,
      cards: startCards,
    };

    const finishCards = Array.from(finishList.cards);
    finishCards.splice(destination.index, 0, movedCard);
    const newFinishList = {
      ...finishList,
      cards: finishCards,
    };

    const newBoardState = {
      ...boardData,
      lists: boardData.lists.map(list => {
        if (list.id === newStartList.id) {
          return newStartList;
        }
        if (list.id === newFinishList.id) {
          return newFinishList;
        }
        return list;
      }),
    };
    setBoardData(newBoardState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box 
        minH="100vh" 
        color="white"
        bgImage={`url(${backgroundImage})`}
        bgSize="cover"
        bgPosition="center"
      >
        <Container maxW="container.xl" py={4}>
          <Heading size="lg" mb={4} bg="blackAlpha.500" p={2} borderRadius="md" display="inline-block">{boardData.title}</Heading>
          <HStack spacing={4} align="flex-start" overflowX="auto" pb={4}
            css={{
              '&::-webkit-scrollbar': { height: '8px' },
              '&::-webkit-scrollbar-track': { background: 'rgba(0,0,0,0.1)', borderRadius: '10px' },
              '&::-webkit-scrollbar-thumb': { background: 'rgba(255,255,255,0.4)', borderRadius: '10px' },
            }}
          >
            {boardData.lists.map(list => (
              <List 
                key={list.id} 
                list={list} 
                onAddCard={handleAddCard}
                onDeleteCard={handleDeleteCard}
                onEditCard={handleEditCard}
              />
            ))}
          </HStack>
        </Container>
      </Box>
    </DragDropContext>
  );
};

export default Board;