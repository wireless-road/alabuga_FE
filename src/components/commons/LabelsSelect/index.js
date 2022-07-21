import React, { useState, useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import Select, { components } from 'react-select'
import { useTranslation } from 'react-i18next'

import { Button, CheckBox } from '../index'
import { IconClear } from '../../../assests/icons'
import { BOOTSTRAP_VARIANTS } from '../../../constants'

import './style.scss'

const CustomSelect = ({
  show, onHide, onClickAddNew, labels, loading, className, activeLineLabelsData, positionTop, onChange, ...otherProps
}) => {
  const [t] = useTranslation()
  const ref = useRef(null)
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (labels) {
      const options = Object.keys(labels).filter(key => labels[key]).map(key => ({ label: key, options: labels[key] }))
      setOptions(options)
    }
  }, [labels])

  // hide when outside click
  useEffect(() => {
    if (show) {
      const handleClickOutside = e => {
        if (ref.current && !ref.current.contains(e.target)) {
          onHide()
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [show, ref])

  const isOptionSelected = item =>
    activeLineLabelsData.some(e => e?.relation_id === item?.relation_id && e?.relation_type === item?.relation_type)

  const IndicatorsContainer = props => (
    <components.IndicatorsContainer {...props}>
      <div className="counter">{`(${props.selectProps.value?.length || 0})`}</div>
    </components.IndicatorsContainer>
  )

  const Option = props =>  (
    <components.Option {...props} className={cn('custom-option', { selected: isOptionSelected(props.data) })}>
      <CheckBox checked={isOptionSelected(props.data)} onClick={() => props.selectOption(props.data)} />
      <span>{props.data.name}</span>
    </components.Option>
  )

  // temporary hide Add New Label button
  const Menu = props => (
    <components.Menu {...props}>
      {props.children}
      <div className="add-new-label">
        <Button
          size="sm"
          variant={BOOTSTRAP_VARIANTS.SECONDARY}
          text={t('labels.select.add_new_label')}
          onClick={onClickAddNew}
        />
      </div>
    </components.Menu>
  )

  return (
    <div ref={ref} className={cn(className || '', { show })} style={{ top: `${positionTop}px` }}>
      <span className="close-icon" role="button" onClick={onHide}><IconClear /></span>
      {className === 'labels-select' ? <div className="select-title">{t('labels.select.manage_labels')}</div> : <></>}
      <Select
        isLoading={loading}
        className={cn('select')}
        placeholder={t('common_components.input.placeholder_search')}
        components={{ IndicatorsContainer, Option }}
        value={activeLineLabelsData}
        onChange={onChange}
        getOptionLabel={({ name }) => name}
        getOptionValue={({ name, relation_id, relation_type }) => `${relation_type}_${relation_id}`}
        options={options}
        isOptionSelected={isOptionSelected}
        menuIsOpen
        isSearchable
        isClearable
        isMulti
        hideSelectedOptions={false}
        controlShouldRenderValue={false}
        {...otherProps}
      />
    </div>
  )
}

CustomSelect.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func,
  onClickAddNew: PropTypes.func,
  labels: PropTypes.object,
  loading: PropTypes.bool,
  className: PropTypes.string,
  activeLineLabelsData: PropTypes.array,
  positionTop: PropTypes.number,
  onChange: PropTypes.func,
}

export default memo(CustomSelect)
