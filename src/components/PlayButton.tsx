import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayButton: React.FC = () => {
  const navigate = useNavigate();

  const toPlayScreen = () => {


    navigate('/PlayScreen');
  };

  return (
    <button
      onClick={toPlayScreen}
      className="bg-green-500 text-white font-bold py-2 px-4 rounded w-20 text-center"
    >
      Play
    </button>
    
  );
};

export default PlayButton;
