import React from 'react'
import PropTypes from 'prop-types'

import { IconArrowDown } from '../../../assests/icons'

import './style.scss'

const HeaderProfile = React.forwardRef(({ children, onClick }, ref) => {
  return (
    <div className="profile" role="button" ref={ref} onClick={onClick}>
      {children}
      <IconArrowDown />
    </div>
  )
})

HeaderProfile.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func
}

export default HeaderProfile
