import React from 'react';
import { useDrag } from 'react-dnd';

const ControlLabImage = () => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const style = {
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <div ref={drag} style={style}>
      Laboratory Image
    </div>
  );
};

export default ControlLabImage;
