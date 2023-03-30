import Head from 'next/head';
import DndProvider from '../report_4/DndProvider';
import KanbanBoard from '../report_4/KanbanBoard';
import useKanban from '../report_4/useKanban';

const initialColumns = [
    {
      id: 'column-1',
      title: 'Header Layout',
      cards: [
        { id: 'card-1', content: 'Lab Image' },
        { id: 'card-2', content: 'Lab Detail' },
      ],
    },
    {
      id: 'column-2',
      title: 'Body Layout',
      cards: [
        { id: 'card-3', content: 'Patient Detail' },
        { id: 'card-4', content: 'Lab Result' },
        { id: 'card-5', content: 'Lab Remark' },
        { id: 'card-6', content: 'Lab Comment' },
      ],
    },
    {
      id: 'column-3',
      title: 'Footer Layout',
      cards: [
        { id: 'card-7', content: 'Lab Approve' },
        { id: 'card-8', content: 'Lab Comment' },
      ],
    },
    {
        id: 'column-4',
        title: 'Bin',
        cards: [
          { id: 'card-9', content: 'Package Detail' },
          { id: 'card-10', content: 'Cost Total' },
        ],
      },
  ];
  

export default function Home() {
  const { columns, moveCard, moveColumn} = useKanban(initialColumns);

  return (
  <div>
  <Head>
  <title>Expert Kanban with Next.js</title>
  <meta
         name="description"
         content="An expert Kanban board example using react-dnd with Next.js"
       />
  <link rel="icon" href="/favicon.ico" />
  </Head>
  <main
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    <DndProvider>
      <KanbanBoard
        columns={columns}
        moveCard={moveCard}
        moveColumn={moveColumn}
      />
    </DndProvider>
  </main>
    </div>
);
}