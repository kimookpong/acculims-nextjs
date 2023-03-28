import Head from 'next/head';
import { useState } from 'react';
import DraggableResizableWidget from '../report_5/DraggableResizableWidget';

export default function Home() {
  const [widgets, setWidgets] = useState([
    {
        id: 1,
        title: 'Laboratory Name',
        defaultWidth: 300,
        defaultHeight: 150,
    },
    {
        id: 2,
        title: 'Laboratory Detail',
        defaultWidth: 500,
        defaultHeight: 150,
    },
    {
        id: 3,
        title: 'Patient Name',
        defaultWidth: 300,
        defaultHeight: 200,
    },
    {
        id: 4,
        title: 'Laboratory Result',
        defaultWidth: 500,
        defaultHeight: 200,
    },
  ]);

  const addWidget = () => {
    const newWidget = {
      id: widgets.length + 1,
      title: `Widget ${widgets.length + 1}`,
      defaultWidth: 300,
      defaultHeight: 200,
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter((widget) => widget.id !== id));
  };

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
        overflow: 'hidden',
        padding: '1rem',
      }}
    >
      <button
        onClick={addWidget}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          padding: '0.5rem 1rem',
          background: '#3f51b5',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Add Widget
      </button>
      {widgets.map((widget) => (
        <DraggableResizableWidget
          key={widget.id}
          defaultWidth={widget.defaultWidth}
          defaultHeight={widget.defaultHeight}
        >
          <h2 style={{ margin: '1rem' }}>{widget.title}</h2>
          <p style={{ margin: '1rem' }}>This is a new widget.</p>
          <button
            onClick={() => removeWidget(widget.id)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
            }}
          >
            &times;
          </button>
        </DraggableResizableWidget>
      ))}
    </main>
  );
}
