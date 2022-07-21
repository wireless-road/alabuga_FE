/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import './style.scss'
import HeadingLoader from './loader'

const HEADING_LINE_HEIGHT = 1.23
const renderSpecificHeading = (type, props) => {
  // eslint-disable-next-line react/prop-types
  const { children, ...otherProps } = props
  switch (type) {
    case 'h1':
    default:
      return <h1 {...otherProps}>{children}</h1>
    case 'h2':
      return <h2 {...otherProps}>{children}</h2>
    case 'h3':
      return <h3 {...otherProps}>{children}</h3>
    case 'h4':
      return <h4 {...otherProps}>{children}</h4>
    case 'h5':
      return <h5 {...otherProps}>{children}</h5>
    case 'h6':
      return <h6 {...otherProps}>{children}</h6>
  }
}

const Heading = props => {
  const { className, size, as, lines, loading, center, ...otherProps } = props
  
  const inlineStyle = {
    lineHeight: HEADING_LINE_HEIGHT,
    ...(lines > 0 && { WebkitLineClamp: lines, height: `${lines * HEADING_LINE_HEIGHT}em` }),
  }
  const wrapperClass = cn(
    'text-heading',
    `custom-size-${size}`,
    { 'text-center': center, 'ellipsis-heading': lines > 0 },
    [className]
  )
  if (loading) return <HeadingLoader center={center} />
  return renderSpecificHeading(as, { ...otherProps, className: wrapperClass, style: inlineStyle })
}

Heading.propTypes = {
  children: PropTypes.node,
  lines: PropTypes.number,
  className: PropTypes.string,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  center: PropTypes.bool,
}

Heading.defaultProps = {
  children: '',
  lines: null,
  className: '',
  size: 'md',
  as: 'h1',
  onClick: null,
  loading: false,
  center: false,
}
export default Heading
