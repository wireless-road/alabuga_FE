import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import cn from 'classnames'

import CustomInput from './CustomInput'
import { IconArrowRight } from '../../../assests/icons'
import './style.scss'

export const getWeekDateRange = date => {
  const startOfWeek = moment(date).startOf('week')
  const highlightDates = [...Array(7)].map((_, dateIndex) => {
    const momentDay = moment(startOfWeek)
      .startOf('week')
      // .startOf('isoWeek') to start from Monday
      .add(dateIndex, 'day')

    if (dateIndex === 0) {
      return momentDay.startOf('day').toDate()
    }
    if (dateIndex === 6) {
      return momentDay.endOf('day').toDate()
    }
    return momentDay.toDate()
  })
  return { highlightDates, start: highlightDates[0], end: highlightDates[6] }
}

const WeekPicker = props => {
  const { onChange, defaultDate, dateFormat, readOnly } = props
  const [selectedDate, changeSelectedDate] = useState(defaultDate)

  useEffect(() => {
    changeSelectedDate(defaultDate)
  }, [defaultDate])

  const { highlightDates, start, end } = getWeekDateRange(selectedDate)

  const handleChangeDate = date => {
    changeSelectedDate(date)
    const { start, end } = getWeekDateRange(date)
    onChange({ start, end, date })
  }

  return (
    <div className="custom-weekpicker">
      <DatePicker
        openToDate={selectedDate}
        selected={selectedDate}
        onChange={handleChangeDate}
        highlightDates={[{ 'week_hightlight': highlightDates }]}
        customInput={<CustomInput startOfWeek={start} endOfWeek={end} type="week" dateFormat={dateFormat} />}
        disabled={readOnly}
      />
    </div>
  )
}

WeekPicker.propTypes = {
  onChange: PropTypes.func,
  defaultDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  readOnly: PropTypes.bool,
}

WeekPicker.defaultProps = {
  onChange: null,
  defaultDate: new Date(),
  dateFormat: undefined,
  readOnly: false,
}

export const useWeekPicker = ({ readOnly, onChange, defaultDate, dateFormat }) => {

  const [selectedDate, changeSelectedDate] = useState(defaultDate)

  const handleChangeDate = date => {
    changeSelectedDate(date)
    const { start, end } = getWeekDateRange(date)
    onChange({ start, end })
  }

  const handleChangeDateByPicker = ({ date }) => {
    handleChangeDate(date)
  }

  const isInCurWeek = moment(selectedDate).isSame(new Date(), 'week')

  const toPrevWeek = () => {
    if (readOnly) return
    const prevWeekDay = moment(selectedDate).subtract(7, 'day').toDate()
    handleChangeDate(prevWeekDay)
  }

  const toThisWeek = () => {
    if (readOnly || isInCurWeek) return
    const toDay = new Date()
    handleChangeDate(toDay)
  }
  
  const toNextWeek = () => {
    if (readOnly) return
    const nextWeekDay = moment(selectedDate).add(7, 'day').toDate()
    handleChangeDate(nextWeekDay)
  }

  return {
    picker: <WeekPicker onChange={handleChangeDateByPicker} defaultDate={selectedDate} dateFormat={dateFormat} />,
    navigator: (
      <div className="picker-navigator">
        <span
          className={cn('shadow-sm rounded nav-btn nav-left noselect prevWeek-button', {
            disabled: readOnly,
          })}
          onClick={toPrevWeek}
          role="button"
        >
          <IconArrowRight />
        </span>
        <span
          className={cn('shadow-sm rounded nav-btn nav-center noselect thisWeek-button', {
            disabled: readOnly || isInCurWeek,
          })}
          onClick={toThisWeek}
          role="button"
        >
          This week
        </span>
        <span
          className={cn('shadow-sm rounded nav-btn nav-right noselect nextWeek-button', {
            disabled: readOnly,
          })}
          onClick={toNextWeek}
          role="button"
        >
          <IconArrowRight />
        </span>
      </div>
    ),
  }
}

export default WeekPicker
