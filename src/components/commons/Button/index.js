import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import cn from 'classnames'

import './style.scss'
import { Text } from '..'

const CustomButton = props => {
  const {
    variant,
    onClick,
    text,
    className,
    loading,
    loadingText,
    disabled,
    size,
    icon,
    iconPosition,
    lines,
    noPadding,
    ...otherProps
  } = props
  const textClass = cn('button-text', { 'dotLoading': loading })
  const displayText = loading ? (loadingText || text) : text
  return (
    <Button
      className={cn('custom-button', { noPadding }, [className])}
      onClick={onClick}
      variant={variant}
      disabled={loading || disabled}
      size={size}
      {...otherProps}
    >
      <div
        className={cn('btn-content-wrapper', {
          'icon-left': icon && iconPosition === 'left',
          'icon-right': icon && iconPosition === 'right'
        })}
      >
        {(text || loadingText) && (
          <Text as="span" size={size} lines={lines} className={textClass}>
            {!!icon && <span className="icon">{icon}</span>}
            {displayText}
          </Text>
        )}
      </div>
    </Button>
  )
}

CustomButton.propTypes = {
  variant: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  noPadding: PropTypes.bool,
  loadingText: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'md40', 'lg']),
  icon: PropTypes.node,
  lines: PropTypes.number,
  iconPosition: PropTypes.oneOf(['left', 'right']),
}

CustomButton.defaultProps = {
  variant: undefined,
  onClick: () => {},
  text: null,
  className: '',
  loading: false,
  disabled: false,
  noPadding: false,
  loadingText: null,
  size: 'md',
  icon: null,
  lines: null,
  iconPosition: 'left'
}

export default CustomButton
