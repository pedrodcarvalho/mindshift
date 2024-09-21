import React from 'react';

const HUD = ({ score, levelComplete }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none flex flex-col items-center justify-center">
      {/* Score Display */}
      <div className="absolute top-4 left-4 text-white bg-black bg-opacity-50 p-2 rounded">
        <span className="text-sm font-bold">Score: {score}</span>
      </div>

      {/* Level Complete Overlay */}
      {levelComplete && (
        <div className="bg-black bg-opacity-75 text-white p-6 rounded text-center">
          <h1 className="text-md font-bold mb-4">Level Complete!</h1>
          <p className="text-sm">Get ready for the next level...</p>
        </div>
      )}
    </div>
  );
};

export default HUD;
