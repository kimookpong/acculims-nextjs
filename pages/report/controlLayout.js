/*
import React from 'react';
import { useDrop } from 'react-dnd';

const ReportLayout = () => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'item',
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const style = {
    width: 620,
    height: 877,
    backgroundColor: isOver ? '#c0c0c0' : '#f0f0f0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div ref={drop} style={style}>
      Page Report
    </div>
  );
};

export default ReportLayout;
*/

import { useDrop } from "react-dnd";

const ReportLayout = ({ onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item, monitor) => {
      const dropTarget = monitor.getTargetIds();
      onDrop(item.id, dropTarget[0]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gridTemplateRows: "repeat(8, 1fr)",
    gridGap: "1px",
    minHeight: "400px",
    width: "100%",
    backgroundColor: isOver && canDrop ? "lightgreen" : "white",
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "10px",
  };

  return (
    <div ref={drop} style={gridStyle}>
      {[...Array(64)].map((_, i) => (
        <div key={`cell-${i}`} style={cellStyle} />
      ))}
    </div>
  );
};

export default ReportLayout;
