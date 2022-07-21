import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import moment from 'moment'
import cn from 'classnames'

import { IconCalendar } from '../../../assests/icons'
import { BOOTSTRAP_VARIANTS } from '../../../constants/common'
import { Text } from '..'

import './style.scss'

const CustomInput = React.forwardRef(({
  value, onClick, type, startOfWeek, endOfWeek, readOnly,
  dateFormat, monthFormat, placeholderText
}, ref) => {

  switch (type) {
    case 'date-input': {
      return (
        <>
          <input
            ref={ref}
            value={value}
            onClick={onClick}
            placeholder={placeholderText}
            className={cn('date-input form-control', { readOnly })}
            readOnly
          />
          <Button  className="custom-input-icon" onClick={onClick}>
            <IconCalendar />
          </Button>
        </>
      )
    }
    case 'date':
    default: {
      const textValue = moment(value).format(dateFormat)
      return (
        <>
          <input ref={ref} value={value} className="hidden-input" readOnly />
          <Button variant={BOOTSTRAP_VARIANTS.LINK} onClick={onClick}>
            <div className="text-value-wrapper">
              <IconCalendar className="calendar-icon" alignmentBaseline="middle" />
              <Text className="text-value">{textValue}</Text>
            </div>
          </Button>
        </>
      )
    }
    case 'month': {
      const textValue = moment(value).format(monthFormat)
      return (
        <>
          <input ref={ref} value={value} className="hidden-input" readOnly />
          <Button variant={BOOTSTRAP_VARIANTS.LINK} onClick={onClick}>
            <div className="text-value-wrapper">
              <IconCalendar className="calendar-icon" alignmentBaseline="middle" />
              <Text className="text-value">{textValue}</Text>
            </div>
          </Button>
        </>
      )
    }
    case 'week': {
      const startOfWeekText = moment(startOfWeek).format(dateFormat)
      const endOfWeekText = moment(endOfWeek).format(dateFormat)
      const weekTime = `${startOfWeekText} - ${endOfWeekText}`
      return (
        <>
          <input ref={ref} value={value} className="hidden-input" readOnly />
          <Button variant={BOOTSTRAP_VARIANTS.LINK} onClick={onClick}>
            <div className="text-value-wrapper">
              <IconCalendar className="calendar-icon" />
              <Text className="text-value">{weekTime}</Text>
            </div>
          </Button>
        </>
      )
    }
  }
})

CustomInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['date', 'date-input', 'week', 'month']),
  startOfWeek: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  endOfWeek: PropTypes.oneOfType([PropTypes.instanceOf(Object), PropTypes.string]),
  readOnly: PropTypes.bool,
  dateFormat: PropTypes.string,
  monthFormat: PropTypes.string,
  placeholderText: PropTypes.string
}

CustomInput.defaultProps = {
  value: new Date(),
  onClick: () => {},
  type: 'date',
  startOfWeek: null,
  endOfWeek: null,
  readOnly: false,
  dateFormat: 'MMMM D, YYYY',
  monthFormat: 'MMMM, YYYY',
  placeholderText: ''
}

CustomInput.displayName = 'CustomInput'

export default CustomInput
