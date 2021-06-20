import React from 'react';

function Ball({ value, isSelected, onBallSelected, type }) {

    const className = isSelected ? "ball-selected" : "ball";

    const handleBallSelected = () => {
      onBallSelected(value);
    };

    return (
        <button 
          id={value + "-" + type}
          className={isSelected ? "ball-selected" : className} 
          onClick={handleBallSelected}
        >
        {value}
        </button>
    );
}

export default Ball;