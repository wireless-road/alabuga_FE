import React from 'react'
import PropTypes from 'prop-types'

import { IconArrowDown } from '../../../assests/icons'

import './style.scss'

const Language = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div className="language" role="button" ref={ref} onClick={onClick}>
      {children}
      <IconArrowDown />
    </div>
  )
})

Language.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func
}

export default Language
