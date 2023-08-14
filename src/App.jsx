import { useContext, useEffect, useState } from "react"
import GlobalContext from './GlobalContext'
import Board from './Board'

function App() {

  const { squares, setSquares, xTurn, setTurn, gameState, setGameState } = useContext(GlobalContext)
  const [message, setMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'gameState',
      JSON.stringify({ squares, xTurn, gameState })
    )
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

      <Board />

      <button onClick={onReset}>Reset Game</button>
    </main>
  )
}

export default App