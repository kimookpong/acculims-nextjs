import React, { useState } from 'react';
import Draggable from 'react-draggable';

const ScalableDraggable = ({ children }) => {
  const [scale, setScale] = useState(1);

  const handleWheel = (event) => {
    event.preventDefault();
    setScale((prevScale) => prevScale + event.deltaY * -0.01);
  };

  return (
    <Draggable>
      <div
        onWheel={handleWheel}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: '0 0',
          cursor: 'grab',
        }}
      >
        {children}
      </div>
    </Draggable>
  );
};

export default ScalableDraggable;
