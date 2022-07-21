import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import moment from "moment";
import cn from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import { nb, nn } from "date-fns/locale";

import { IconArrowRight } from "../../../assests/icons";
import { detectLanguage, localeFormatDate } from "../../../utils/common";
import "./style.scss";

const DatePicker = (props) => {
  const {
    onChange,
    type,
    selectedDate,
    readOnly,
    dateFormat,
    label,
    isCheckValid,
    required,
    onFocus,
    onBlur,
    options,
    placeholder,
    disabled,
    dateViewFormat,
    ...otherProps
  } = props;

  // Ref to datepicker instance
  const datePicker = useRef();

  // localization
  const localesArr = [nb, nn];
  let locale = "en";
  // custom for NO, because no translations for this in date-fns/locale
  if (detectLanguage() === "no") {
    registerLocale("no", nb);
    locale = "no";
  }
  localesArr.forEach((el) => {
    if (el.code === detectLanguage()) {
      registerLocale(`${el}`, el);
      locale = `${el}`;
    }
  });

  const [checkValid, changeCheckValid] = useState(false);
  const [open, setOpen] = useState();

  const handleOnBlur = (dt) => {
    changeCheckValid(true);
    onBlur();
    setOpen(false, true);
  };

  const getInputFieldDate = (fieldValue) => {
    const dateStr = (fieldValue || "").replaceAll(/\b(\d)\b/g, "0$1").replaceAll(/\D/g, "");
    const today = new Date();

    // TODO: Support US locale
    if (dateStr == "") return;
    else if (dateStr.length <= 2) {
      return new Date(today.getFullYear(), today.getMonth(), dateStr);
    } else if (dateStr.length == 4) {
      return new Date(
        today.getFullYear(),
        parseInt(dateStr.slice(2, 4), 10) - 1,
        dateStr.slice(0, 2)
      );
    } else if (dateStr.length == 6) {
      return new Date(
        "20" + dateStr.slice(4, 6),
        parseInt(dateStr.slice(2, 4), 10) - 1,
        dateStr.slice(0, 2)
      );
    } else if (dateStr.length == 8) {
      return new Date(
        dateStr.slice(4, 8),
        parseInt(dateStr.slice(2, 4), 10) - 1,
        dateStr.slice(0, 2)
      );
    }
  };

  const handleKeyDown = (event) => {
    if (event?.which === 9) {
      const dt = getInputFieldDate(event.target.value);

      datePicker.current.setSelected(dt || new Date());

      setOpen(false, true);
    }

    return true;
  };

  const handleInputClick = () => {
    datePicker.current.input.select();
    setOpen(true);
  };

  useEffect(() => {
    if (isCheckValid) changeCheckValid(true);
  }, [isCheckValid]);

  let isInvalid = false;
  if (required && checkValid) {
    isInvalid = !selectedDate;
  }

  // fixme
  const defaultDateFormat = moment(localeFormatDate(selectedDate))
    .localeData()
    .longDateFormat("L")
    .toLowerCase()
    .replaceAll("m", "M");

  return (
    <div
      className={cn("custom-datepicker", {
        invalid: isInvalid,
        "custom-datepicker-disabled": disabled,
      })}
    >
      {label && (
        <div className={cn("label", required && "required")}>{label}</div>
      )}
      <ReactDatePicker
        locale={locale}
        selected={selectedDate}
        open={open}
        openToDate={selectedDate}
        onChange={onChange}
        readOnly={readOnly}
        dateFormat={dateViewFormat || defaultDateFormat}
        useWeekdaysShort
        onCalendarClose={handleOnBlur}
        onCalendarOpen={onFocus}
        onKeyDown={handleKeyDown}
        onInputClick={handleInputClick}
        preventOpenOnFocus={true}
        {...(options || {})}
        disabled={disabled}
        {...otherProps}
        ref={datePicker}
      />
    </div>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.oneOf(["date", "date-input", "week"]),
  readOnly: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date),
  dateFormat: PropTypes.string,
  options: PropTypes.object,
  defaultValue: PropTypes.instanceOf(Date),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isCheckValid: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
};

DatePicker.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  selectedDate: null,
  readOnly: false,
  dateFormat: undefined,
  options: {},
  label: null,
  disabled: false,
};

export const useDatePicker = ({
  onChange,
  type,
  selectedDate,
  readOnly,
  ...otherProps
}) => {
  const [startDate, changeStartDate] = useState(selectedDate || new Date());

  useEffect(() => {
    const isSelectedDateChanged = !moment(selectedDate).isSame(
      moment(startDate),
      "day"
    );
    if (!!selectedDate && isSelectedDateChanged) {
      changeStartDate(selectedDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleOnChange = (date) => {
    changeStartDate(date);
    typeof onChange === "function" && onChange(date);
  };
  const isInCurDay = moment(startDate).isSame(new Date(), "day");

  const goToPrevDay = () => {
    if (readOnly) return;
    const prevWeekDay = moment(startDate)
      .subtract(1, "day")
      .toDate();
    handleOnChange(prevWeekDay);
  };
  const goToDay = () => {
    if (readOnly || isInCurDay) return;
    handleOnChange(new Date());
  };
  const goToNextDay = () => {
    if (readOnly) return;
    const nextWeekDay = moment(startDate)
      .add(1, "day")
      .toDate();
    handleOnChange(nextWeekDay);
  };
  return {
    picker: (
      <DatePicker
        onChange={handleOnChange}
        type={type}
        readOnly={readOnly}
        selectedDate={startDate}
        {...otherProps}
      />
    ),
    navigator: (
      <div className="picker-navigator">
        <span
          className={cn(
            "shadow-sm rounded nav-btn nav-left noselect prevDay-button",
            {
              disabled: readOnly,
            }
          )}
          onClick={goToPrevDay}
          role="button"
        >
          <IconArrowRight />
        </span>
        <span
          className={cn(
            "shadow-sm rounded nav-btn nav-center noselect today-button",
            {
              disabled: readOnly || isInCurDay,
            }
          )}
          onClick={goToDay}
          role="button"
        >
          Today
        </span>
        <span
          className={cn(
            "shadow-sm rounded nav-btn nav-right noselect nextDay-button",
            {
              disabled: readOnly,
            }
          )}
          onClick={goToNextDay}
          role="button"
        >
          <IconArrowRight />
        </span>
      </div>
    ),
  };
};

export default DatePicker;
