import React from 'react'
import PropTypes from 'prop-types'

import {
  IconToggle, IconToggleActive
} from '../../../assests/icons'

import './style.scss'

const CustomToggle = ({ active, onToggle }) => (
  <div className="custom-toggle" role="button" onClick={onToggle}>
    {active ? <IconToggleActive /> : <IconToggle />}
  </div>
)

CustomToggle.propTypes = {
  onToggle: PropTypes.func,
  active: PropTypes.bool,
}

CustomToggle.defaultProps = {
  onToggle: () => {},
  active: false,
}

export default CustomToggle
