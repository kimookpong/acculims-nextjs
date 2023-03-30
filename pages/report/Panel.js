import React from 'react';

const Panel = ({ children, style }) => {
  return (
    <div
      style={{
        background: '#f3f3f3',
        borderRadius: '4px',
        padding: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
