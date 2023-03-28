import React from 'react';
import Card from '../report_4/Card';
import { useDrop, useDrag } from 'react-dnd';

const Column = ({ index, column, moveCard, moveColumn }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: (item) => moveCard(item.index, item.id, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'column',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        flexGrow: 1,
        padding: '1rem',
        background: isOver ? 'rgba(0, 255, 0, 0.1)' : 'transparent',
        border: '1px solid #ccc',
        borderRadius: '5px',
      }}
    >
      <div
        ref={drag}
        style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        {column.title}
      </div>
      {column.cards.map((card, cardIndex) => (
        <Card
          key={card.id}
          index={cardIndex}
          id={card.id}
          columnId={column.id}
          columnIndex={index}
          content={card.content}
          moveCard={moveCard}
          />
          ))}
          </div>
          );
          };
          
export default Column;
