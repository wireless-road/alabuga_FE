import React from 'react'
import PropTypes from 'prop-types'
import { IconCheck, IconUnCheck } from '../../../assests/icons'

import './style.scss'

const Checkbox = props => {
  const {
    onClick,
    checked,
    children,
    disabled,
  } = props

  const handleCheckBoxClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    typeof onClick === 'function' && !disabled && onClick()
  }

  return (
    <div className="checkbox" role="button" onClick={handleCheckBoxClick}>
      {!checked && <IconUnCheck />}
      {checked && <IconCheck />}
      {children ? <span>{children}</span> : null}
    </div>
  )
}

Checkbox.propTypes = {
  children: PropTypes.node,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

Checkbox.defaultProps = {
  children: null,
  checked: false,
  disabled: false,
  onClick: undefined,
}

export default Checkbox
