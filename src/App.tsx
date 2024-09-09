import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PlayButton from './components/PlayButton';
import Scores from './components/Scores';

import PlayScreen from './components/PlayScreen';
import ScoresBtn from './components/ScoresBtn';

const HomeScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-black mb-8 text-center">
        Tetris
      </h1>
      <div className="flex justify-between space-x-4">
      <PlayButton />
      <ScoresBtn />
      </div>
  
    </div>
  );
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/PlayScreen" element={<PlayScreen />} />
        <Route path="/Scores" element={<Scores />} />
      </Routes>
    </Router>
  );
}

export default App;
