import { useState } from 'react';

const useKanban = (initialColumns) => {
  const [columns, setColumns] = useState(initialColumns);

  const moveCard = (cardIndex, cardId, targetColumnIndex) => {
    setColumns((prevColumns) => {
      const sourceColumnIndex = prevColumns.findIndex((column) =>
        column.cards.some((card) => card.id === cardId)
      );
      const sourceColumn = prevColumns[sourceColumnIndex];
      const targetColumn = prevColumns[targetColumnIndex];

      const newSourceColumnCards = sourceColumn.cards.filter(
        (card) => card.id !== cardId
      );
      const newTargetColumnCards = [...targetColumn.cards];
      newTargetColumnCards.splice(cardIndex, 0, sourceColumn.cards.find(card => card.id === cardId));

      const newColumns = [...prevColumns];
      newColumns[sourceColumnIndex] = {
        ...sourceColumn,
        cards: newSourceColumnCards,
      };
      newColumns[targetColumnIndex] = {
        ...targetColumn,
        cards: newTargetColumnCards,
      };

      return newColumns;
    });
  };

  const moveColumn = (sourceColumnIndex, targetColumnIndex) => {
    setColumns((prevColumns) => {
      const newColumns = [...prevColumns];
      const [removedColumn] = newColumns.splice(sourceColumnIndex, 1);
      newColumns.splice(targetColumnIndex, 0, removedColumn);
      return newColumns;
    });
  };

  return { columns, moveCard, moveColumn };
};

export default useKanban;
