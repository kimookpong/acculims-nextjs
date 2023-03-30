import React, { useState } from "react";
import Draggable from "react-draggable";

const DraggableCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDragStop = (event, data) => {
    const newIndex = activeIndex + (data.x > 0 ? -1 : 1);
    setActiveIndex(Math.max(0, Math.min(newIndex, images.length - 1)));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {!!images ? (
        images.map((image, index) => (
          <Draggable
            key={index}
            axis="x"
            onStop={handleDragStop}
            position={
              activeIndex === index ? { x: 0, y: 0 } : { x: 9999, y: 9999 }
            }
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
                backgroundSize: "cover",
                backgroundImage: `url(${image})`,
                cursor: "grab",
              }}
            />
          </Draggable>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default DraggableCarousel;
