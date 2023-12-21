import React from 'react';
import './Nyheter.css';

const generateGridBackground = (size, squares) => {
  let grid = '';
  for (let i = 0; i < squares; i++) {
    for (let j = 0; j < squares; j++) {
      const opacity = Math.random().toFixed(2); // Random opacity between 0 and 1
      grid += `<rect x="${i * size}" y="${j * size}" width="${size}" height="${size}" fill="rgba(0, 0, 0, ${opacity})" />`;
    }
  }
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="${size * squares}" height="${size * squares}">${grid}</svg>`;
};

const Nyheter = () => {
  // Assuming the wrapper size is 900x900 for 10x10 grid. Adjust as needed.
  const background = generateGridBackground(90, 10);

  return (
    <div className='nyheter-section-wrapper' style={{ backgroundImage: `url("${background}")` }}>
        <div className="padding-global">
            <div className="container-large">
                <div className="nyheter-content-wrapper">
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Nyheter;
