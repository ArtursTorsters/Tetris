import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import TetrisGame from './TetrisCore/TetrisGame'; // Import your Tetris game component
import QuitButton from './QuitButton';

const PlayScreen: React.FC = () => {
  const [playerName, setPlayerName] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const navigate = useNavigate();

// audio
// const handlePlay = () => {
//   // play music
//   const audio = new Audio("/audio/surd.mp3");
//   audio.loop = true
//   audio.volume = 0.3
//   audio.play()
// // if(navigate(-1)) {
// //   return "bac"
// //   audio.pause()
// // }

//   navigate('/PlayScreen');
// };



  // saving name to localstorage
  const savePlayerData = () => {
    if (playerName) {
        alert("saved")
      localStorage.setItem('playerName', playerName);
      localStorage.setItem('score', score.toString());
    }
  };




  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-900 play-container">
      <div className="text-lg text-white space-x-4 bg-transparent">
        <h3 className="text-2xl text-center font-semibold mb-2">
          {playerName ? `Welcome, ${playerName}` : 'Enter your name'}
          <br />
          Score: {score}
        </h3>
        <input
          className="outline-none text-2xl py-1 px-2 font-semibold mb-2 text-white bg-transparent  focus:outline-none focus:border-green-300"
          placeholder='Enter Name'
          type="text"
          value={playerName}
          onChange={handleNameChange}
        />
        <button
          className="bg-green-500 text-white font-bold py-1 mt-0 px-1 rounded w-20 mb-8 text-center"
          onClick={savePlayerData}
        >
          Enter
        </button>
      </div>

      <div
        className="container bg-black mb-8 h-3/5 w-80 text-sky-200 border-2 rounded-lg special-border"
      >
        {/* Render the Tetris game here */}
        <TetrisGame setScore={setScore} />
      </div>

      <QuitButton  />
    </div>
  );
};

export default PlayScreen;
