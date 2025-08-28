export const initialData = {
  board: {
    id: 'board-1',
    title: 'Meu TaskBoard',
    lists: [
      {
        id: 'list-1',
        title: 'A Fazer',
        cards: [
          { id: 'card-1', text: 'Configurar o ambiente do projeto' },
          { id: 'card-2', text: 'Criar os componentes base' },
        ],
      },
      {
        id: 'list-2',
        title: 'Em Andamento',
        cards: [
          { id: 'card-3', text: 'Desenvolver a interface principal' },
        ],
      },
      {
        id: 'list-3',
        title: 'Concluído',
        cards: [
          { id: 'card-4', text: 'Finalizar o projeto DevJobs' },
        ],
      },
    ],
  },
};