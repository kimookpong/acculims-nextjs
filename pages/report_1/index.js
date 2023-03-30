import Head from 'next/head';
import ScalableDraggable from '../report_1/ScalableDraggable';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Expert Scalable Draggable with Next.js</title>
        <meta
          name="description"
          content="A scalable and draggable component example using react-draggable with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#f0f0f0',
        }}
      >
        <ScalableDraggable>
          <div
            style={{
              width: '300px',
              height: '300px',
              background: 'linear-gradient(135deg, #6b73ff, #000dff)',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: 'bold',
            }}
          >
            Object
          </div>
        </ScalableDraggable>
      </main>
    </div>
  );
}
