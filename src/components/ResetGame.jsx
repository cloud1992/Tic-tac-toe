import { TURNS } from "../constants.js";


export function ResetGame({winner, resetGame }) {
  if (winner === null) {
    return null; // not winner yet
  }
  
  let text = "";
  if (winner === TURNS.X || winner === TURNS.O) {
    text = `${winner} has won!`
  } else if (winner === false) {
    text = "It's a draw!";
  }

  return (
      <section className="winner">
        <div className="text">
          <h2>{text}</h2>
          <button
            onClick={resetGame}
          >
            Reset
          </button>
        </div>
      </section>
    );

 
  }
