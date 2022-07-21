import React from 'react'
import PropTypes from 'prop-types'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import cn from 'classnames'

import { Heading, Text } from '..'
import './style.scss'

const EmptyState = props => {
  const { title, text, photo, className, centralized } = props
  return (
    <Row className={cn('custom-empty-state', [className], { centralized })}>
      {
        photo && (
          <Col xs={12} className="text-center description-image">
            <img src={photo} alt="empty-state" />
          </Col>
        )
      }
      { title && (
        <Col xs={12} className="text-center description-title">
          <Heading as="h4" size="md">{title}</Heading>
        </Col>
        )
      }
      <Col xs={12} className="text-center description-message">
        <Text size="lg" className="text-center">{typeof text === 'function' ? text() : text}</Text>
      </Col>
    </Row>
  )
}

EmptyState.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  photo: PropTypes.string,
  className: PropTypes.string,
  centralized: PropTypes.bool,
}

EmptyState.defaultProps = {
  title: '',
  text: '',
  photo: null,
  className: '',
  centralized: false,
}

export default EmptyState
