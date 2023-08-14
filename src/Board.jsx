import { useContext, useEffect } from 'react'
import GlobalContext from './GlobalContext'
import Square from './Square'

function Board() {

  const { squares, setSquares, xTurn, setTurn, gameState, setGameState } = useContext(GlobalContext)

  useEffect(() => {
    localStorage.setItem(
      'gameState',
      JSON.stringify({ squares, xTurn, gameState })
    )

    if (!checkWin()) {
      checkDraw()
    }

  }, [squares, xTurn])

  function handleClick(e) {

    if (gameState.running) {

      if (e.target === e.currentTarget || e.target.innerText !== '') {
        return
      }
      const arr = [...squares]
      arr[e.target.id] = xTurn ? 'X' : 'O'

      setTurn(!xTurn)
      setSquares(arr)
    }
  }

  function checkWin() {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let condition of winConditions) {
      const [_A, _B, _C] = condition

      if (squares[_A] !== null) {
        if (squares[_A] === squares[_B] && squares[_A] === squares[_C]) {

          setGameState({ ...gameState, running: false, winner: squares[_A] })
          return true
        }
      }
    }
  }

  function checkDraw() {
    if (!squares.includes(null) && gameState.running) {
      setGameState({ ...gameState, running: false, draw: true })
    }
  }

  return (
    <div className='board' onClick={(e) => handleClick(e)}>
      {squares.map((sqr, index) => (
        <Square value={sqr} key={index} index={index} />)
      )}
    </div>
  )
}

export default Board