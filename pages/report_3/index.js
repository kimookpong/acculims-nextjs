import Head from 'next/head';
import FloorPlan from '../report_3/FloorPlan';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Expert React Draggable with Next.js</title>
        <meta
          name="description"
          content="A floor plan designer example using react-draggable and react-resizable with Next.js"
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
        <FloorPlan />
      </main>
    </div>
  );
}
