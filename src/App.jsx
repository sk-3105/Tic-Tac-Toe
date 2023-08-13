import { useEffect, useState } from "react";
import GlobalContext from './context'
import Board from './Board'

function App() {

  const storedGameState = JSON.parse(localStorage.getItem('gameState'));
  const initialSquares = storedGameState?.squares || Array(9).fill(null);
  const initialXTurn = storedGameState?.xTurn || true;
  const initialGameState = storedGameState?.gameState || {
    running: true,
    winner: null,
    draw: false
  }

  const [squares, setSquares] = useState(initialSquares)
  const [xTurn, setTurn] = useState(initialXTurn)
  const [gameState, setGameState] = useState(initialGameState)
  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify({ squares, xTurn, gameState }));
  }, [squares, xTurn, gameState]);

  function onReset() {
    setSquares(squares.fill(null))
    setTurn(true)
    setGameState({
      running: true,
      winner: null,
      draw: false
    })
  }

  useEffect(() => {
    if (gameState.running) {
      setMessage(`${xTurn ? 'X' : 'O'}'s turn`)
    } else if (gameState.winner) {
      setMessage(`${gameState.winner} Won!!`)
    } else if (gameState.draw) {
      setMessage(`Game Draw`)
    }
  }, [gameState, xTurn])

  return (
    <main>

      <header>
        <h1>Tic Tac Toe</h1>
      </header>

      <h4>{message}</h4>

      <GlobalContext.Provider value={
        { squares, setSquares, xTurn, setTurn, gameState, setGameState }}>
        <Board />
      </GlobalContext.Provider>

      <button onClick={onReset}>Reset Game</button>
    </main>
  )
}

export default App