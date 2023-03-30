import React from 'react';
import DraggableFurniture from '../report_3/DraggableFurniture';
import FurnitureItem from '../report_3/FurnitureItem';

const FloorPlan = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        background: '#e0e0e0',
        position: 'relative',
      }}
    >
      <DraggableFurniture>
        <FurnitureItem title="Table" />
      </DraggableFurniture>
      <DraggableFurniture>
        <FurnitureItem title="Chair" />
      </DraggableFurniture>
      <DraggableFurniture>
        <FurnitureItem title="Sofa" />
      </DraggableFurniture>
    </div>
  );
};

export default FloorPlan;
