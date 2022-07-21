import React, { useState, memo, useEffect } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import Select, { components } from 'react-select'

import { IconArrowDown } from '../../../assests/icons'
import './style.scss'

const CustomSelect = ({
  label, onChange, value, options, loading, className,
  placeholder, size, required, noPadding, isCheckValid,
  getOptionValue, getOptionLabel, disabled, onInputChange, onClose, ...otherProps
}) => {
  const [t] = useTranslation()
  const [checkValid, changeCheckValid] = useState(false)
  const [typingTimeout, setTypingTimeOut] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredOptions, setFilteredOptions] = useState([])

  const handleOnBlur = () => {
    changeCheckValid(true)
    setIsLoading(false)
  }

  useEffect(() => {
    if (isCheckValid) changeCheckValid(true)
  }, [isCheckValid])

  useEffect(() => {
    if (options) {
      setFilteredOptions([...options])
    }
  }, [options])

  useEffect(() => {
    setIsLoading(loading)
  }, [loading])

  let isInvalid = false

  if (required && checkValid) {
    isInvalid = (value == null || value === '')
  }

  const handleInputChange = (newVal, act) => {
    if (act.action === 'input-change') {
      const callback = (data) => {
        setIsLoading(false)
        setFilteredOptions([...data])
      }
      if (!newVal) {
        callback([])
        // return
      }

      setIsLoading(true)
      const loadData = () => {
        onInputChange(newVal, callback)
      }
      if (typingTimeout) {
        clearTimeout(typingTimeout)
      }
      const newTypingTimeOut = setTimeout(loadData, 500)
      setTypingTimeOut(newTypingTimeOut)
    }
  }

  const handleKeyDown = (event) => {
    if (isLoading && (event?.which === 9 || event?.which === 13)) {
      event.preventDefault();
    }
  }

  const DropdownIndicator = props =>  (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <span className={props.selectProps.menuIsOpen ? 'menu-is-open' : 'menu-is-hidden'}><IconArrowDown /></span>
      </components.DropdownIndicator>
    )
  )

  return (
    <div
      className={cn('async-select-control', className || '', {
        [`select-${size}`]: size,
        invalid: isInvalid,
        'no-padding': noPadding
      })}
    >
      {label && <div className={cn('label', required && 'required')}>{label}</div>}
      <Select
        className={cn('select')}
        placeholder={placeholder || t('common_components.input.placeholder')}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        value={value}
        onBlur={handleOnBlur}
        onChange={onChange}
        onMenuClose={onClose}
        onKeyDown={handleKeyDown}
        options={filteredOptions}
        isLoading={isLoading}
        isSearchable
        isClearable
        isDisabled={disabled}
        onInputChange={handleInputChange}
        {...otherProps}
        components={{ ...otherProps.components, DropdownIndicator }}
      />
    </div>
  )
}

CustomSelect.propTypes = {
  loading: PropTypes.bool,
  label: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.any,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  required: PropTypes.bool,
  options: PropTypes.array,
  noPadding: PropTypes.bool,
  getOptionLabel: PropTypes.func,
  getOptionValue: PropTypes.func,
  isCheckValid: PropTypes.bool,
  disabled: PropTypes.bool,
  onInputChange: PropTypes.func
}

CustomSelect.defaultProps = {
  getOptionLabel: ({ label }) => label,
  getOptionValue: ({ value }) => value,
  disabled: false
}

export default memo(CustomSelect)
