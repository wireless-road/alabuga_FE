import PropTypes from 'prop-types'
import { Calendar, createStaticRanges, DefinedRange } from 'react-date-range'
import React, { useEffect, useState } from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
import { InputGroup, OverlayTrigger, Popover } from 'react-bootstrap'
import './style.scss'
import coreStyles from 'react-date-range/src/styles'

import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns'
import { useTranslation } from 'react-i18next'
import { Input, Button } from '../index'
import { IconArrowRight, IconCalendar } from '../../../assests/icons'
import { BOOTSTRAP_VARIANTS } from '../../../constants/common'

const DateIntervalPicker = props => {
  const [t] = useTranslation()
  const {
    onChangeStartDate, onChangeEndDate, startDate, endDate, dateFormat, disabled
  } = props

  const [dateString, setDateString] = useState('')
  const [overlayShow, setOverlayShow] = useState(false)
  const [tempStartDate, setTempStartDate] = useState(startDate)
  const [tempEndDate, setTempEndDate] = useState(endDate)

  const [range, setRange] = useState([
    {
      'startDate': startDate,
      'endDate': endDate,
      'key': 'selection'
    }
  ])

  const updateString = () => {
    let newDateString = ''
    if (tempStartDate) {
      newDateString = format(tempStartDate, dateFormat)
    }
    newDateString += ' - '
    if (tempEndDate) {
      newDateString += format(tempEndDate, dateFormat)
    }

    setDateString(newDateString)
  }

  useEffect(() => {
    updateString()
  }, [tempStartDate, tempEndDate])

  useEffect(() => {
    setTempStartDate(range[0].startDate)
    setTempEndDate(range[0].endDate)
  }, [range])

  const defineds = {
    startOfWeek: startOfWeek(new Date()),
    endOfWeek: endOfWeek(new Date()),
    startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
    endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
    startOfToday: startOfDay(new Date()),
    endOfToday: endOfDay(new Date()),
    startOfYesterday: startOfDay(addDays(new Date(), -1)),
    endOfYesterday: endOfDay(addDays(new Date(), -1)),
    startOfMonth: startOfMonth(new Date()),
    endOfMonth: endOfMonth(new Date()),
    startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
    endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
    startOfYear: startOfYear(new Date()),
    endOfYear: endOfYear(new Date()),
    startOfLastYear: startOfYear(addYears(new Date(), -1)),
    endOfLastYear: endOfYear(addYears(new Date(), -1)),

    startOfTerm1: startOfYear(new Date()),
    endOfTerm1: addDays(addMonths(startOfYear(new Date()), 2), -1),
    startOfTerm2: addMonths(startOfYear(new Date()), 2),
    endOfTerm2: addDays(addMonths(startOfYear(new Date()), 4), -1),
    startOfTerm3: addMonths(startOfYear(new Date()), 4),
    endOfTerm3: addDays(addMonths(startOfYear(new Date()), 6), -1),
    startOfTerm4: addMonths(startOfYear(new Date()), 6),
    endOfTerm4: addDays(addMonths(startOfYear(new Date()), 8), -1),
    startOfTerm5: addMonths(startOfYear(new Date()), 8),
    endOfTerm5: addDays(addMonths(startOfYear(new Date()), 10), -1),
    startOfTerm6: addMonths(startOfYear(new Date()), 10),
    endOfTerm6: endOfYear(new Date())
  }

  const staticRanges = createStaticRanges([
    {
      label: t('date_interval.static_date_ranges.this_week'),
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.last_week'),
      range: () => ({
        startDate: defineds.startOfLastWeek,
        endDate: defineds.endOfLastWeek,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.this_month'),
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.last_month'),
      range: () => ({
        startDate: defineds.startOfLastMonth,
        endDate: defineds.endOfLastMonth,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.this_year'),
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: defineds.endOfYear,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.last_year'),
      range: () => ({
        startDate: defineds.startOfLastYear,
        endDate: defineds.endOfLastYear,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.this_year_to_date'),
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: new Date(),
      }),
    },
    {
      label: t('date_interval.static_date_ranges.last_year_to_date'),
      range: () => ({
        startDate: defineds.startOfLastYear,
        endDate: new Date(),
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term1'),
      range: () => ({
        startDate: defineds.startOfTerm1,
        endDate: defineds.endOfTerm1,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term2'),
      range: () => ({
        startDate: defineds.startOfTerm2,
        endDate: defineds.endOfTerm2,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term3'),
      range: () => ({
        startDate: defineds.startOfTerm3,
        endDate: defineds.endOfTerm3,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term4'),
      range: () => ({
        startDate: defineds.startOfTerm4,
        endDate: defineds.endOfTerm4
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term5'),
      range: () => ({
        startDate: defineds.startOfTerm5,
        endDate: defineds.endOfTerm5,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.term6'),
      range: () => ({
        startDate: defineds.startOfTerm6,
        endDate: defineds.endOfTerm6,
      }),
    },
    {
      label: t('date_interval.static_date_ranges.quarter1'),
      range: () => ({
        startDate: defineds.startOfYear,
        endDate: addDays(addQuarters(defineds.startOfYear, 1), -1),
      }),
    },
    {
      label: t('date_interval.static_date_ranges.quarter2'),
      range: () => ({
        startDate: addQuarters(defineds.startOfYear, 1),
        endDate: addDays(addQuarters(defineds.startOfYear, 2), -1),
      }),
    },
    {
      label: t('date_interval.static_date_ranges.quarter3'),
      range: () => ({
        startDate: addQuarters(defineds.startOfYear, 2),
        endDate: addDays(addQuarters(defineds.startOfYear, 3), -1),
      }),
    },
    {
      label: t('date_interval.static_date_ranges.quarter4'),
      range: () => ({
        startDate: addQuarters(defineds.startOfYear, 3),
        endDate: defineds.endOfYear,
      }),
    },
  ])

  const monthNames = [t('date_interval.month_names.January'), t('date_interval.month_names.February'), t('date_interval.month_names.March'),
    t('date_interval.month_names.April'), t('date_interval.month_names.May'), t('date_interval.month_names.June'),
    t('date_interval.month_names.July'), t('date_interval.month_names.August'), t('date_interval.month_names.September'),
    t('date_interval.month_names.October'), t('date_interval.month_names.November'), t('date_interval.month_names.December')
  ]

  const handleCancel = () => {
    setOverlayShow(false)
    setTempStartDate(startDate)
    setTempEndDate(endDate)
  }

  const handleOk = () => {
    setOverlayShow(false)
    onChangeStartDate(tempStartDate)
    onChangeEndDate(tempEndDate)
  }

  const renderMonthAndYear = (focusedDate, changeShownDate, props) => {
    const { showMonthArrow, locale, minDate, maxDate, showMonthAndYearPickers } = props
    const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear()
    const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear()
    const styles = coreStyles
    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
        {showMonthArrow && (
          <span role="button" className="monthNextPrevBtn PrevBtn" onClick={() => changeShownDate(-1, 'monthOffset')}>
            <IconArrowRight />
          </span>
        )}
        {showMonthAndYearPickers ? (
          <span className={styles.monthAndYearPickers}>
            <span className={styles.monthPicker}>
              <select
                value={focusedDate.getMonth()}
                onClick={e => changeShownDate(e.target.value, 'setMonth')}
              >
                {locale.localize.months().map((month, i) => (
                  <option key={i} value={i}>
                    {month}
                  </option>
                ))}
              </select>
            </span>
            <span className={styles.monthAndYearDivider} />
            <span className={styles.yearPicker}>
              <select
                value={focusedDate.getFullYear()}
                onClick={e => changeShownDate(e.target.value, 'setYear')}
              >
                {new Array(upperYearLimit - lowerYearLimit + 1)
                  .fill(upperYearLimit)
                  .map((val, i) => {
                    const year = val - i
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    )
                  })}
              </select>
            </span>
          </span>
        ) : (
          <span className={styles.monthAndYearPickers}>
            {monthNames[focusedDate.getMonth()]} {focusedDate.getFullYear()}
          </span>
        )}
        {showMonthArrow && (
          <span role="button" className="monthNextPrevBtn" onClick={() => changeShownDate(+1, 'monthOffset')}>
            <IconArrowRight />
          </span>
        )}
      </div>
    )
  }

  const popover = (
    <Popover id="popover-date-intervalpicker" className="popover-nolimit-width">
      <Popover.Content>
        <div className="flex-row">
          <div className="flex-column mr-2">
            <span className="mb-1">{t('date_interval.from_date')}:</span>
            <Calendar
              date={tempStartDate}
              onChange={setTempStartDate}
              showMonthAndYearPickers={false}
              navigatorRenderer={renderMonthAndYear}
              showSelectionPreview={false}
              color="#44dec5"
            />
          </div>
          <div className="flex-column ml-2">
            <span className="mb-1">{t('date_interval.to_date')}:</span>
            <Calendar
              date={tempEndDate}
              onChange={setTempEndDate}
              showMonthAndYearPickers={false}
              navigatorRenderer={renderMonthAndYear}
              showSelectionPreview={false}
              color="#44dec5"
            />
          </div>
          <DefinedRange
            onChange={item => setRange([item.selection])}
            ranges={range}
            staticRanges={staticRanges}
            inputRanges={[]}
            color="#fff"
          />
        </div>
        <div className="dateintervalpicker-footer">
          <Button className="mr-2" size="sm" variant={BOOTSTRAP_VARIANTS.LIGHT} onClick={handleCancel} text={t('common_components.button.cancel')} />
          <Button size="sm" variant={BOOTSTRAP_VARIANTS.SUCCESS} onClick={handleOk} text={t('common_components.button.ok')} />
        </div>
      </Popover.Content>
    </Popover>
  )

  return (
    <div className="date-interval-picker">
      <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose show={overlayShow}>
        <InputGroup onClick={() => !disabled && setOverlayShow(true)} className="flex-nowrap">
          <Input className="flex-auto" size="md" value={dateString || ''} onChange={() => {}} disabled={disabled} />
          <InputGroup.Append>
            <InputGroup.Text><IconCalendar /></InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </OverlayTrigger>
    </div>
  )
}

DateIntervalPicker.propTypes = {
  onChangeStartDate: PropTypes.func,
  onChangeEndDate: PropTypes.func,
  startDate: PropTypes.instanceOf(Date),
  endDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  disabled: PropTypes.bool
}

DateIntervalPicker.defaultProps = {
  startDate: null,
  endDate: null,
  dateFormat: undefined,
  disabled: false
}

export default DateIntervalPicker
