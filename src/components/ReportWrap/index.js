import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { ExportToExcelButton } from '../commons'

import './style.scss'

const ReportWrap = ({ title, className, filterItems, data, exportData, handleGetAllData }) =>  (
  <div className={cn('report-page-wrap', className)}>
    <div className="report-header">
      <div className="title">{title}</div>
      <ExportToExcelButton filename={title} data={exportData} handleGetAllData={handleGetAllData} />
    </div>
    <div className="filter-header">
      {filterItems}
    </div>
    <div className="report-list">
      {data}
    </div>
  </div>
)

ReportWrap.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  filterItems: PropTypes.node,
  data: PropTypes.node,
  exportData: PropTypes.array,
}

ReportWrap.defaultProps = {
  title: '',
  className: '',
  filterItems: null,
  data: null,
  exportData: [],
}

export default ReportWrap
