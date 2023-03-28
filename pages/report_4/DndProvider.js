import React from 'react';
import { DndProvider as BaseDndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const DndProvider = ({ children }) => {
  return (
    <BaseDndProvider backend={HTML5Backend}>
      {children}
    </BaseDndProvider>
  );
};

export default DndProvider;
