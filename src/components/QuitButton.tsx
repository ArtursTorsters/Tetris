import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuitButton = () => {

    const navigate = useNavigate();

    const handleQuit = () => {
      navigate('/')  // to play screen
    };

  return (
    <div className="flex justify-center items-center">
      <button onClick={handleQuit} className="bg-green-500 text-white font-bold py-2 px-4 rounded w-40 text-center">
        Quit
      </button>
    </div>
  );
};

export default QuitButton;
