import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import { IconArrowUp } from '../../../assests/icons'

import './style.scss'

const ExpandableHeader = props => {
  const {
    children,
    headerIcon,
    expanded,
    onClick
  } = props

  const [isExpanded, setIsExpanded] = useState(expanded)

  return (
    <div className="expandable-header">
      {headerIcon && <span className="header-icon">{headerIcon}</span>}
      {children}
      <span
        role="button"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          setIsExpanded(!isExpanded)
          onClick()
        }}
        className={cn('toggle-button', { expanded: isExpanded })}
      >
        <IconArrowUp />
      </span>
    </div>
  )
}

ExpandableHeader.propTypes = {
  children: PropTypes.node,
  headerIcon: PropTypes.node,
  expanded: PropTypes.bool,
  onClick: PropTypes.func
}

ExpandableHeader.defaultProps = {
  expanded: true,
}

export default ExpandableHeader
