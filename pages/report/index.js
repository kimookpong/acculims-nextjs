import Head from 'next/head';
import Dashboard from '../report/Dashboard';
import Panel from '../report/Panel';

export default function Home() {
  return (
    <div>
        <Head>
            <title>Advanced React Draggable with Next.js</title>
            <meta name="description" content="A dashboard example using react-draggable and react-grid-layout with Next.js" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <main style={{ minHeight: '100vh' }}>
            <Dashboard>
                <Panel key="0">
                    <h2>Laboratory Detail</h2>
                </Panel>
                <Panel key="1">
                    <h2>Patient Detail</h2>
                </Panel>
                <Panel key="2">
                    <h2>Laboratory Result</h2>
                </Panel>
                <Panel key="3">
                    <h2>Laboratory Approve</h2>
                </Panel>
            </Dashboard>
        </main>
    </div>
);
}