import PropTypes from 'prop-types'

function Square({ value, index }) {
  return (
    <div className="box" id={index} >
      {value}
    </div>
  )
}

Square.propTypes = {
  value: PropTypes.string,
  index: PropTypes.number
}

export default Square