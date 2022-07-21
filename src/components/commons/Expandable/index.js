import React from 'react'
import PropTypes from 'prop-types'
import { Accordion } from 'react-bootstrap'
import cn from 'classnames'
import ExpandableHeader from './ExpandableHeader'

import './style.scss'

const Expandable = props => {
  const {
    title,
    children,
    headerIcon,
    defaultActiveKey,
    contentClassName,
    className
  } = props

  return (
    <div className={cn('expandable', className)}>
      <Accordion defaultActiveKey={defaultActiveKey}>
        <div>
          <Accordion.Toggle as={ExpandableHeader} headerIcon={headerIcon} expanded={!+defaultActiveKey} eventKey="0">
            {typeof title === 'function' ? title() : title}
          </Accordion.Toggle>
          <Accordion.Collapse className={contentClassName} eventKey="0" style={{ position: 'relative' }}>
            <div>{children}</div>
          </Accordion.Collapse>
        </div>
      </Accordion>
    </div>
  )
}

Expandable.propTypes = {
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.func, PropTypes.node]),
  headerIcon: PropTypes.node,
  defaultActiveKey: PropTypes.oneOf(['1', '0']),
  contentClassName: PropTypes.string,
  className: PropTypes.string
}

Expandable.defaultProps = {
  children: null,
  title: '',
  headerIcon: null,
  defaultActiveKey: '0',
  className: ''
}

export default Expandable
