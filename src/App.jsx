import { useContext, useEffect, useState } from "react"
import GlobalContext from './GlobalContext'
import Board from './Board'

function App() {

  const { xTurn, gameState, onReset } = useContext(GlobalContext)
  const [message, setMessage] = useState('')

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

      <h1>Tic Tac Toe</h1>

      <h4>{message}</h4>

      <Board />

      <button onClick={onReset}>Reset Game</button>

    </main>
  )



}

export default App