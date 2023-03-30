import React from 'react';

const FurnitureItem = ({ title }) => {
  return (
    <div
      style={{
        backgroundColor: '#f0f0f0',
        borderRadius: '5px',
        padding: '0.5rem',
        cursor: 'move',
      }}
    >
      {title}
    </div>
  );
};

export default FurnitureItem;
