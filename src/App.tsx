import React, { useEffect, useRef } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayButton from './components/PlayButton';
import PlayScreen from './components/PlayScreen';



const App = () => {
  // audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // audio when the app loads, but start it muted
    const audio = new Audio("/audio/surd.mp3");
    audio.loop = true;
    audio.volume = 0.1;
    audio.muted = true;  // if not muted at the start then error
    audio.play().catch(error => {
      console.error("Autoplay error:", error);
    });

    audioRef.current = audio;

    // aftere user click audio goes live
    const unmuteOnInteraction = () => {
      if (audioRef.current) {
        audioRef.current.muted = false;
        window.removeEventListener("click", unmuteOnInteraction);
      }
    };
        window.addEventListener("click", unmuteOnInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      window.removeEventListener("click", unmuteOnInteraction);
    };
  }, []);
  
  
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


  const HomeScreen = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center play-container">
      <h1 className="text-3xl text-white mb-8 text-center cosmic-glow">
        Space Tetris
      </h1>
      <div className="flex justify-between space-x-4">
      <PlayButton />
      </div>
    </div>
  );
};


