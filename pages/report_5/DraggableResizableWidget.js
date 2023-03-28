import React from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';

const DraggableResizableWidget = ({ children, defaultWidth, defaultHeight }) => {
  const [dimensions, setDimensions] = React.useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  const handleResize = (event, { element, size }) => {
    setDimensions({ width: size.width, height: size.height });
  };

  return (
    <Draggable>
      <Resizable
        width={dimensions.width}
        height={dimensions.height}
        onResize={handleResize}
      >
        <div
          style={{
            width: dimensions.width,
            height: dimensions.height,
            cursor: 'grab',
            background: '#ffffff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default DraggableResizableWidget;
