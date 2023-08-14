import { createContext, useState } from "react"
import PropTypes from 'prop-types'

const GlobalContext = createContext()

export const ContextProvider = ({ children }) => {

  const storedGameState = JSON.parse(localStorage.getItem('gameState'));
  const initialSquares = storedGameState?.squares || Array(9).fill(null);
  const initialXTurn = storedGameState?.xTurn !== undefined ? storedGameState.xTurn : true;
  const initialGameState = storedGameState?.gameState || {
    running: true,
    winner: null,
    draw: false
  }

  const [squares, setSquares] = useState(initialSquares)
  const [xTurn, setTurn] = useState(initialXTurn)
  const [gameState, setGameState] = useState(initialGameState)

  function onReset() {
    setSquares(squares.fill(null))
    setTurn(true)
    setGameState({
      running: true,
      winner: null,
      draw: false
    })
  }

  const ContextValues = {
    squares,
    setSquares,
    xTurn,
    setTurn,
    gameState,
    setGameState,
    onReset
  }

  return <GlobalContext.Provider value={ContextValues}>
    {children}
  </GlobalContext.Provider>

}

ContextProvider.propTypes = {
  children: PropTypes.node
}

export default GlobalContext