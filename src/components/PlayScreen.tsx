import React from 'react';
import QuitButton from './QuitButton';

const PlayScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 play-container">
      <div className="mb-4 text-lg text-white">
        <h3 className="text-2xl font-semibold mb-2">Score: 0</h3>
      </div>

      <div
        className="container bg-black border border-gray-300 rounded-xl p-8 mb-8 h-3/5 w-80 "
       
      >
     
        <div className="game-grid">
        </div>
      </div>

      <QuitButton />
    </div>
  );
};

export default PlayScreen;
