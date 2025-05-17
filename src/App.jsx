import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

import './App.css';
import {ResetGame} from './components/ResetGame.jsx';
import { Square } from './components/Square.jsx';
import { TURNS } from './constants.js';
import { checkWinner, checkEndGame } from './board.js';
import { saveGameToStorage, resetGameStorage } from './storage/index.js';


function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(()=> {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ? turnFromStorage : TURNS.X;
  });
  // null means no winner, false means draw
  const [winner, setWinner] = useState(()=> {
    const winnerFromStorage = window.localStorage.getItem('winner');
    return winnerFromStorage ? JSON.parse(winnerFromStorage) : null;
  });

    useEffect(() => {
      if (winner) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
       
    }, [winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameStorage();
  }  

  const updateBoard = (index) => {
    // if the square is already filled, return
    if (board[index] || winner) return;

    // update the board
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    // update the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
    // check for winner
    const newWinner = checkWinner(newBoard);
    // save the game in local storage
    saveGameToStorage(newBoard, newTurn, newWinner);
    if (newWinner) {
      setWinner(newWinner);
      return;
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
      console.log('draw');
      return;

    }
   
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
        <button className='reset' onClick={resetGame}> Reset</button>
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
