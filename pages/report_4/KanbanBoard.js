import React from 'react';
import Column from '../report_4/Column';

const KanbanBoard = ({ columns, moveCard, moveColumn }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        padding: '1rem',
        overflowX: 'auto',
      }}
    >
      {columns.map((column, index) => (
        <Column
          key={column.id}
          index={index}
          column={column}
          moveCard={moveCard}
          moveColumn={moveColumn}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
