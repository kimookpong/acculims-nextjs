import React from 'react';
import { useDrag } from 'react-dnd';

const ControlLabPatient = () => {
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
      Patient Detail
    </div>
  );
};

export default ControlLabPatient;
