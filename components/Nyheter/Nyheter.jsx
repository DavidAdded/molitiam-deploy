'use client'
import React, { useEffect, useState } from 'react';
import './Nyheter.css';

const Nyheter = () => {
  const [gridItems, setGridItems] = useState([]);
  const gridWidth = 20; // Number of squares per row
  const gridHeight = 8; // Number of squares per column
  const squareSize = 90; // Size of squares in pixels
  const opacityVariance = 0.1; // Maximum variance in opacity between adjacent squares

  useEffect(() => {
    const items = [];
    let lastOpacity = Math.random(); // Initial opacity for the first square

    for (let i = 0; i < gridWidth * gridHeight; i++) {
      // Determine new opacity within 10% of the last square
      let minOpacity = Math.max(lastOpacity - opacityVariance, 0);
      let maxOpacity = Math.min(lastOpacity + opacityVariance, 1);
      let newOpacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;

      // Add new square with new opacity
      items.push(
        <div key={i} className="grid-item" style={{ opacity: newOpacity }}></div>
      );

      // Update lastOpacity for the next iteration
      lastOpacity = newOpacity;
    }

    setGridItems(items);
  }, [gridWidth, gridHeight, opacityVariance]);

  return (
    <div className='nyheter-section-wrapper'>
      <div className="grid-background" style={{ gridTemplateColumns: `repeat(${gridWidth}, ${squareSize}px)` }}>
        {gridItems}
      </div>
      {/* Other content */}
    </div>
  );
}

export default Nyheter;
