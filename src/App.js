import React, { useState } from 'react';
import './App.css';
import Roulette from './components/page/Roulette';
import Home from './components/home/Home';

function App() {
  const [showRoulette, setShowRoulette] = useState(false);

  const startRoulette = () => {
    setShowRoulette(true);
  };

  return (
    <div className="App">
      {showRoulette ? (
        <Roulette />
      ) : (
        <Home startRoulette={startRoulette} />
      )}
    </div>
  );
}

export default App;
