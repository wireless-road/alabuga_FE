import React, { forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Button from 'react-bootstrap/Button'
import './styles.scss'
import { BOOTSTRAP_VARIANTS } from '../../../constants/common'
import Text from '../Text'

const LinkButton = forwardRef((props, ref) => {
  const {
    onClick,
    text,
    size,
    className,
    textClassName,
    disabled,
    as,
    href,
    lines,
    ...otherProps
  } = props
  const handleOnclick = (e) => {
    onClick && onClick(e)
  }
  useImperativeHandle(ref, () => ({
    click: handleOnclick,
  }))

  return (
    <Button
      ref={ref}
      className={cn('custom-link-button', [className])}
      variant={BOOTSTRAP_VARIANTS.LINK}
      as={as}
      onClick={handleOnclick}
      size={size}
      disabled={disabled}
      href={href}
      target={href ? '_blank' : undefined}
      {...otherProps}
    >
      <Text
        as="span"
        size={size}
        lines={lines}
        className={cn('link-button-text', [textClassName], {
          disabled,
          'ellipsis-text': lines > 0,
        })}
      >
        {text}
      </Text>
    </Button>
  )
})

LinkButton.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  textClassName: PropTypes.string,
  disabled: PropTypes.bool,
  as: PropTypes.string,
  href: PropTypes.string,
  lines: PropTypes.number,
}

LinkButton.defaultProps = {
  onClick: null,
  text: '',
  size: 'md',
  className: '',
  textClassName: '',
  disabled: false,
  as: undefined,
  href: undefined,
  lines: null,
}
LinkButton.displayName = 'LinkButton'

export default LinkButton
