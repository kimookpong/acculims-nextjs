import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const DraggableFurniture = ({ children, onStart, onStop }) => {
  return (
    <Draggable
      onStart={onStart}
      onStop={onStop}
      handle=".drag-handle"
      bounds="parent"
    >
      <Resizable
        width={100}
        height={100}
        minConstraints={[50, 50]}
        maxConstraints={[200, 200]}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            border: '1px solid #ccc',
          }}
        >
          <div className="drag-handle" style={{ position: 'absolute', top: 0, right: 0 }}>
            {children}
          </div>
        </div>
      </Resizable>
    </Draggable>
  );
};

export default DraggableFurniture;
