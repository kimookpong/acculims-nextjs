import Head from 'next/head';
import DraggableCarousel from '../report_2/DraggableCarousel';

const images = [
  'https://source.unsplash.com/random/800x400?nature&1',
  'https://source.unsplash.com/random/800x400?nature&2',
  'https://source.unsplash.com/random/800x400?nature&3',
];

export default function Home() {
  return (
    <div>
      <Head>
        <title>Advanced React Draggable with Next.js</title>
        <meta
          name="description"
          content="An image carousel example using react-draggable with Next.js"
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
        <DraggableCarousel images={images} />
      </main>
    </div>
  );
}
