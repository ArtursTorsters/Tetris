import React from 'react';
import { useNavigate } from 'react-router-dom';

const ScoresBtn = () => {
  const navigate = useNavigate();

  const handleScores = () => {
    navigate('/Scores')  // to play screen
  };

  return (
    <button 
      onClick={handleScores} 
      className="bg-green-500 text-white font-bold py-2 px-4 rounded w-20 text-center"
    >
      Scores
    </button>
  );
};

export default ScoresBtn;
