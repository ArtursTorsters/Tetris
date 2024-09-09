import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import PlayButton from './components/PlayButton';
import './App.css';
import PlayScreen from './components/PlayScreen';

const HomeScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl text-black mb-8 text-center">
        Tetris
      </h1>
      <PlayButton />
    </div>
  );
};



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/PlayScreen" element={<PlayScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
