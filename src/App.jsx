import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import './App.css';
import {ResetGame} from './components/ResetGame.jsx';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './board.js';


function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null means no winner, false means draw
  const [winner, setWinner] = useState(null);
  const [_, setShowWinnerEffect] = useState(false);

    useEffect(() => {
      if (winner) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });

        setShowWinnerEffect(true);
        const timeout = setTimeout(() => {
          setShowWinnerEffect(false);
        }, 3000);

        return () => clearTimeout(timeout);
      }
    }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
  }  

  const updateBoard = (index) => {
    // if the square is already filled, return
    if (board[index] || winner) return;

    // update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // check for winner
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
      return;
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      console.log('draw');
      return;

    }
    // update the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }

  

const Rocket = () => {
  return (
    <div className="rocket">🚀</div>
  );
};

  return (
    <div className="grid-layout"> 
      <div>
        <Rocket />
      </div>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        <section className='game'>
          {
            board.map((_, index) => {
              return (
                <Square key = {index} index={index} updateboard={updateBoard} >
                  {board[index]}
                </Square>
              )
            })
          }
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}> {TURNS.X}</Square>
          <Square isSelected = {turn === TURNS.O}> {TURNS.O}</Square>
        </section>  
        <ResetGame winner={winner} resetGame={resetGame}/>
      </main>   
      <div>
        <Rocket />
      </div> 
  </div>  
     
  )
}

export default App
