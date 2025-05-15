import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti';

import './App.css'

const TURNS = {
  X: 'X',
  O: 'O'
}

const Square = ({children, isSelected, updateboard, index}) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateboard(index);
  }

  return (
    <div className={className} onClick={handleClick}>
      {children} </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  // null means no winner, false means draw
  const [winner, setWinner] = useState(null);
  const [showWinnerEffect, setShowWinnerEffect] = useState(false);

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



  const checkWinner = (boardToCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    return null;
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
    }
    // update the turn
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);
  }

  const ResetGame = () => {
    const className = winner !== null ? '' : 'reset';
    return (
      <button className={className} onClick={() => {
        setBoard(Array(9).fill(null));
        setTurn(TURNS.X);
        setWinner(null);
      }
      }>Reset</button>
    )
  }
  
  return (
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
      <ResetGame />
    </main>    
      
     
  )
}

export default App
