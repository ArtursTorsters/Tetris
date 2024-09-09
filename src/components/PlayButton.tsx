import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayButton: React.FC = () => {
  const navigate = useNavigate();

  const handlePlay = () => {
    // play music
    const audio = new Audio("/audio/surd.mp3");
    audio.loop = true
    audio.volume = 0.3
    audio.play()
    navigate('/PlayScreen');
  };

  return (
    <button
      onClick={handlePlay}
      className="bg-green-500 text-white font-bold py-2 px-4 rounded w-20 text-center"
    >
      Play
    </button>
  );
};

export default PlayButton;
