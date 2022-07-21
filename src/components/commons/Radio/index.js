import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'

import {
  IconRadioChecked,
  IconRadioUncheck
} from '../../../assests/icons'

import './style.scss'

const Radio = (props) => {
  const { onClick, checked, label } = props

  const icon = () => {
    if (checked) return <IconRadioChecked />
    return <IconRadioUncheck />
  }

  const handleOnClick = () => onClick()

  return (
    <Button
      as="div"
      onClick={handleOnClick}
      className="radio-button"
    >
      <span className="icon">{icon()}</span><span className="label">{label}</span>
    </Button>
  )
}

Radio.propTypes = {
  checked: PropTypes.bool,
  onClick: PropTypes.func,
  label: PropTypes.string
}

Radio.defaultProps = {
  checked: false,
  onClick: null,
  label: ''
}

export default Radio
