/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useMemo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import './style.scss'

const TEXT_LINE_HEIGHT = 1.25

const Text = ({ size, children, as, lines, className, onClick, popover, popoverText, whitePopoverBackground, align, placement }) => {
  const wrapperClasses = cn(
    'custom-text-body',
    `text-${size}`,
    `text-${align}`,
    {
      'ellipsis-text': lines > 0,
      'pointer': popover,
    },
    [className]
  )
  const inlineStyle = {
    lineHeight: lines > 1 ? TEXT_LINE_HEIGHT : null,
    ...(lines > 1 && { WebkitLineClamp: lines, height: `${lines * TEXT_LINE_HEIGHT}em` }),
  }

  const renderTooltip = useMemo(
    (props) => (
      <Tooltip {...props} className={cn('text-custom-tooltip', { whitePopoverBackground })}>
        {popoverText ? <div className="popover-text" dangerouslySetInnerHTML={{ __html: popoverText }} /> : children}
      </Tooltip>
    ),
    [whitePopoverBackground, popoverText, children]
  )

  let textNode
  switch (as) {
    case 'p':
    default:
      textNode = <p onClick={onClick} className={wrapperClasses} style={inlineStyle}>{children}</p>
      break
    case 'span':
      textNode = <span onClick={onClick} className={wrapperClasses} style={inlineStyle}>{children}</span>
      break
    case 'i':
      textNode = <i onClick={onClick} className={wrapperClasses} style={inlineStyle}>{children}</i>
      break
    case 'a':
      textNode = <a onClick={onClick} className={wrapperClasses} style={inlineStyle}>{children}</a>
      break
  }
  return popover ? (
    <OverlayTrigger
      placement={placement}
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      {textNode}
    </OverlayTrigger>
  ) : textNode
}

Text.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'md40', 'lg']),
  children: PropTypes.node,
  as: PropTypes.oneOf(['span', 'p', 'i', 'a']),
  align: PropTypes.oneOf(['center', 'left', 'right', 'justify']),
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  className: PropTypes.string,
  lines: PropTypes.number,
  onClick: PropTypes.func,
  popover: PropTypes.bool,
  popoverText: PropTypes.node,
  whitePopoverBackground: PropTypes.bool,
}

Text.defaultProps = {
  size: null,
  children: '',
  as: 'p',
  align: 'left',
  placement: 'bottom',
  className: '',
  lines: null,
  onClick: () => {},
  popover: false,
  popoverText: null,
  whitePopoverBackground: false,
}

export default Text
