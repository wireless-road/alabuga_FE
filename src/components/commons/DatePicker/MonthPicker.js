import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import cn from 'classnames'

import CustomInput from './CustomInput'
import { IconArrowRight } from '../../../assests/icons'
import './style.scss'

const MonthPicker = props => {
  const { onChange, defaultDate, dateFormat, readOnly } = props
  const [selectedDate, changeSelectedDate] = useState(defaultDate)

  useEffect(() => {
    changeSelectedDate(defaultDate)
  }, [defaultDate])

  const handleChangeDate = date => {
    changeSelectedDate(date)
    onChange(date)
  }

  return (
    <div className="custom-monthpicker">
      <DatePicker
        openToDate={selectedDate}
        selected={selectedDate}
        onChange={handleChangeDate}
        customInput={<CustomInput type="month" dateFormat={dateFormat} value={selectedDate} />}
        disabled={readOnly}
        showMonthYearPicker
      />
    </div>
  )
}

MonthPicker.propTypes = {
  onChange: PropTypes.func,
  defaultDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  readOnly: PropTypes.bool,
}

MonthPicker.defaultProps = {
  onChange: null,
  defaultDate: new Date(),
  dateFormat: undefined,
  readOnly: false,
}

export const useMonthPicker = ({ readOnly, onChange, defaultDate }) => {

  const [selectedDate, changeSelectedDate] = useState(defaultDate)

  const handleChangeDate = date => {
    changeSelectedDate(date)
    onChange(date)
  }

  const isInCurMonth = moment(selectedDate).isSame(new Date(), 'month')

  const toPrevMonth = () => {
    if (readOnly) return
    const prevMonthDay = moment(selectedDate).subtract(1, 'months').toDate()
    handleChangeDate(prevMonthDay)
  }

  const toThisMonth = () => {
    if (readOnly || isInCurMonth) return
    const toDay = moment().startOf('month').toDate()
    handleChangeDate(toDay)
  }
  
  const toNextMonth = () => {
    if (readOnly) return
    const nextMonthDay = moment(selectedDate).add(1, 'months').toDate()
    handleChangeDate(nextMonthDay)
  }

  return {
    picker: <MonthPicker onChange={handleChangeDate} defaultDate={selectedDate} />,
    navigator: (
      <div className="picker-navigator">
        <span
          className={cn('shadow-sm rounded nav-btn nav-left noselect prevMonth-button', {
            disabled: readOnly,
          })}
          onClick={toPrevMonth}
          role="button"
        >
          <IconArrowRight />
        </span>
        <span
          className={cn('shadow-sm rounded nav-btn nav-center noselect thisMonth-button', {
            disabled: readOnly || isInCurMonth,
          })}
          onClick={toThisMonth}
          role="button"
        >
          This month
        </span>
        <span
          className={cn('shadow-sm rounded nav-btn nav-right noselect nextMonth-button', {
            disabled: readOnly,
          })}
          onClick={toNextMonth}
          role="button"
        >
          <IconArrowRight />
        </span>
      </div>
    ),
  }
}

export default MonthPicker
