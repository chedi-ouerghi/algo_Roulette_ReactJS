import React, { useState, useEffect } from 'react';
import { Button, message } from 'antd';
import './styles.css';

const RouletteGame = () => {
 const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [betAmount, setBetAmount] = useState(0);
  const [winningNumber, setWinningNumber] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [lastWinningNumbers, setLastWinningNumbers] = useState([]);
  const [totalBetAmount, setTotalBetAmount] = useState(0);

  useEffect(() => {
    if (spinning) {
      const timer = setTimeout(() => {
        const newWinningNumber = Math.floor(Math.random() * 37); // 0 to 36
        setWinningNumber(newWinningNumber);
        setSpinning(false);
          handleResult(newWinningNumber);
                  updateLastWinningNumbers(newWinningNumber);
      }, 3000); // Simulate spinning time (3 seconds)

      return () => clearTimeout(timer);
    }
  }, [spinning]);

//      useEffect(() => {
//     const interval = setInterval(() => {
//       handleBet();
//     }, 10000); // 10 seconds

//     return () => clearInterval(interval);
//   }, []);
    
    const numberCoefficients = {
  0: 35,
  1: 20,
  2: 20,
  3: 20,
  4: 20,
  5: 20,
  6: 20,
  7: 20,
  8: 20,
  9: 20,
  10: 20,
  11: 20,
  12: 20,
  13: 20,
  14: 20,
  15: 20,
  16: 20,
  17: 20,
  18: 20,
  19: 20,
  20: 20,
  21: 20,
  22: 20,
  23: 20,
  24: 20,
  25: 20,
  26: 20,
  27: 20,
  28: 20,
  29: 20,
  30: 20,
  31: 20,
  32: 20,
  33: 20,
  34: 20,
  35: 20,
  36: 20,
};

  
  const handleNumberSelect = (number) => {
    if (!spinning) {
      if (selectedNumbers.includes(number)) {
        setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
        setTotalBetAmount(totalBetAmount - betAmount);
      } else {
        setSelectedNumbers([...selectedNumbers, number]);
        setTotalBetAmount(totalBetAmount + betAmount);
      }
    }
  };

  const handleBet = () => {
    if (!spinning && selectedNumbers.length > 0) {
      setSpinning(true);
    }
  };

  const handleBetAmountChange = (e) => {
    const newBetAmount = parseInt(e.target.value) || 0;
    setBetAmount(newBetAmount);
    setTotalBetAmount(selectedNumbers.length * newBetAmount);
  };

  

const handleResult = (resultNumber) => {
  const payout = selectedNumbers.reduce(
    ( number) =>  numberCoefficients[number]
  );
  const totalPayout = payout * betAmount;

  if (selectedNumbers.includes(resultNumber)) {
    message.success(`Congratulations! You won ${totalPayout} times your bet!`);
  } else {
    message.error(`Sorry, you lost. Winning Number: ${resultNumber}`);
  }
};


    const updateLastWinningNumbers = (newWinningNumber) => {
    setLastWinningNumbers((prevWinningNumbers) => {
      if (prevWinningNumbers.length >= 10) {
        prevWinningNumbers.pop();
      }
      return [newWinningNumber, ...prevWinningNumbers];
    });
  };
    
  const renderRouletteNumbers = () => {
    const rouletteNumbers = [];

    for (let i = 0; i <= 36; i++) {
      const color = i % 2 === 0 ? 'red' : 'black';
      const isSelected = selectedNumbers.includes(i);
      rouletteNumbers.push(
        <div
          key={i}
          className={`roulette-number ${color} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleNumberSelect(i)}
        >
          {i}
        </div>
      );
    }

    return rouletteNumbers;
  };

  return (
    <div>
      <h1 className='textRoulette'>Roulette Game</h1>
      <div className={`roulette-wheel ${spinning ? 'spin' : ''}`}>
        <div className="roulette-numbers">{renderRouletteNumbers()}</div>
      </div>
      <div className='tableBet'>
          <p>Selected Numbers: {selectedNumbers.join(', ')}</p>
              <p>Current Bet Amount: {betAmount}</p>
                      <p>Last Winning Numbers: {lastWinningNumbers.join(', ')}</p>

      <input
        type="number"
        value={betAmount}
        onChange={(e) => setBetAmount(e.target.value)}
      />
    <Button onClick={handleBet} disabled={spinning || selectedNumbers.length === 0}>
        Place Bet
      </Button>
      {winningNumber !== null && <p>Winning Number: {winningNumber}</p>}
          </div>
          </div>
  );
};

export default RouletteGame;
