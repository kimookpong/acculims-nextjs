import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ index, id, columnId, columnIndex, content, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { index, id, columnId, columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        padding: '1rem',
        background: '#fff',
        borderRadius: '5px',
        marginBottom: '1rem',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        cursor: 'move',
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {content}
    </div>
  );
};

export default Card;