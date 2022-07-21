import React from 'react'
import PropTypes from 'prop-types'
import { IconClearRow } from '../../../assests/icons'
import './style.scss'

const Chip = ({ idx, text, onClick }) => (
  <div className="chip" key={idx}>
    <span className="chip-value">{text}</span>
    <span role="button" className="chip-delete-button" onClick={onClick}><IconClearRow /></span>
  </div>
)

Chip.propTypes = {
  idx: PropTypes.number,
  text: PropTypes.string,
  onClick: PropTypes.func,
}

Chip.defaultProps = {
  idx: 0,
  text: '',
  onClick: () => {},
}

export default Chip
