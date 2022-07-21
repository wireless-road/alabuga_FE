import React, { useState, memo, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'

import { IconEye, IconEyeHidden } from '../../../assests/icons'
import { validateEmail } from '../../../utils/common'

import './style.scss'

const Input = ({
  label, onChange, value, type, onPasswordIconClick, className, autocompleteItems,
  isPassword, placeholder, size, required, focus, onEnter, noPadding, isCheckValid, shouldCheckEmail, setEmailValid, ...otherProps
}) => {
  const [t] = useTranslation()

  const [checkValid, changeCheckValid] = useState(false)
  const [filteredData, setFilteredData] = useState([])
  const [focusing, setFocusing] = useState(false)

  const inputRef = useRef(null)

  useEffect(() => {
    if (focus) {
      setTimeout(() => inputRef.current.focus())
    }
  }, [focus])

  useEffect(() => {
    if (autocompleteItems && autocompleteItems.length > 0) {
      if (value) {
        setFilteredData(autocompleteItems.filter(i => i.search(new RegExp(value, 'i')) !== -1))
      } else {
        setFilteredData([])
      }
    }
  }, [value])

  useEffect(() => {
    if (isCheckValid) changeCheckValid(true)
  }, [isCheckValid])

  const handleOnBlur = () => {
    changeCheckValid(true)
    setTimeout(() => setFocusing(false), 300)
  }

  const handleOnFocus = () => {
    setFocusing(true)
  }

  const handleOnChange = (value) => {
    onChange(value)
    shouldCheckEmail && setEmailValid(validateEmail(value))
  }

  let isInvalid = false

  if (required && checkValid) {
    isInvalid = (value == null || value === '')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onEnter && onEnter()
    }
  }

  return (
    <div
      className={cn('input-control', {
        [`input-${size}`]: size,
        [className]: className,
        invalid: isInvalid,
        'no-padding': noPadding
      })}
    >
      {label && <div className={cn('label', required && 'required')}>{label}</div>}
      <input
        placeholder={placeholder || t('common_components.input.placeholder')}
        ref={inputRef}
        type={type || 'text'}
        value={value}
        onChange={e => handleOnChange(e.target.value)}
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        {...otherProps}
      />
      {isPassword && <span role="button" onClick={onPasswordIconClick} className="password-icon">
        {type === 'password' ? <IconEyeHidden /> : <IconEye />}</span>}
      {focusing && filteredData && filteredData.length > 0 && <div className="autocomplete-items">
        {filteredData.map((item, index) => (
          <div key={item + index} role="button" onClick={() => onChange(item)} className="autocomplete-item">{item}</div>
        ))}
      </div>}
    </div>
  )
}

Input.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onPasswordIconClick: PropTypes.func,
  isPassword: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  required: PropTypes.bool,
  focus: PropTypes.bool,
  onEnter: PropTypes.func,
  noPadding: PropTypes.bool,
  isCheckValid: PropTypes.bool
}

export default memo(Input)
