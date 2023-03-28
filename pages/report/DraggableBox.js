import React from 'react';
import Draggable from 'react-draggable';

const DraggableBox = ({ children }) => {
  return (
    <Draggable>
      <div style={{ cursor: 'move', padding: '20px', background: '#f3f3f3', borderRadius: '10px' }}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableBox;
