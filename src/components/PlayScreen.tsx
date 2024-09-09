import React from 'react';
import QuitButton from './QuitButton';

const PlayScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">This is PlayScreen</h1>

      <div className="mb-4 text-lg">
        <h3 className="text-2xl font-semibold mb-2">Score: 0</h3>
        



      </div>

      <div className="container border border-gray-300 rounded-xl bg-white p-8 mb-8 h-96 w-80">
        asdad
        <div className="game-grid">
          asda
        </div>
      </div>

      <QuitButton />
      {/* <BackBtn/> */}
    </div>
  );
};

export default PlayScreen;
