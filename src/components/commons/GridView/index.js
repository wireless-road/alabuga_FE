import React, { useState } from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import BootstrapRow from 'react-bootstrap/Row'
import BootstrapCol from 'react-bootstrap/Col'
import { useTable, useSortBy } from 'react-table'
import { useTranslation } from 'react-i18next'
import { IconArrowDown } from '../../../assests/icons'
import { Pagination, EmptyState, LinkButton, Loading, UploadFile } from '..'
import GridContentLoader from './GridContentLoader'
import { FILE_UPLOAD_ACCEPTED } from '../../../constants/common'
import './style.scss'

const createStyleFromProps = (minWidth, maxWidth, cursor) => ({
  ...(!!minWidth && { minWidth }),
  ...(!!maxWidth && { maxWidth }),
  ...(!!cursor && { cursor })
})

const useCustomColumns = (columns) => React.useMemo(() => columns, [columns])

const useCustomData = (data) => React.useMemo(() => data, [data])

// -- look for 'react-table' documentation for using Table/Column/Row/Cell properties -->
const GridView = (props) => {
  const {
    className,
    columns,
    data,
    onStateChange,
    pages,
    loading,
    relativeRowHeight,
    emptyStateTitle,
    emptyStateText,
    gridviewSeeMore,
    lazyLoading,
    showSeeMoreBtn,
    onRowClick,
    RowWrapper,
    hidePaging,
    group,
    withDnD,
    handleFilesUpload,
    handleFilesRejected,
    headerStyle='table-header'
  } = props
  const [t] = useTranslation()

  const [hiddenGroups, setHiddenGroups] = useState({})

  let { per_page: pageSize, page: pageIndex } = pages || {}

  pageIndex = pageIndex || 1

  const customColumns = useCustomColumns(columns)
  const customData = useCustomData(data)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: customColumns,
    data: customData,
  }, useSortBy)

  const updatePageObject = () => {
    if (!pages) return null
    return {
      page: pages.page,
     // pageSize: pages.per_page  // pageSize doesn't used anywhere on BE side
    }
  }

  const onChangeCurrentPage = (pageNum) => {
    typeof onStateChange === 'function' && onStateChange({ ...(updatePageObject() || {}), page: pageNum })
  }

  const handleLoadMoreItems = () => {
    typeof onStateChange === 'function' && onStateChange({ ...(updatePageObject() || {}), page: pageIndex + 1, lazyLoading: true })
  }

  const HeaderColumn = (column) => {
    const {
      getHeaderProps,
      render,
      className,
      align,
      minWidth,
      maxWidth,
    } = column
    return (
      <BootstrapCol
        {...getHeaderProps(column.getSortByToggleProps())}
        className={cn('table-header-column', `cell-align-${align || 'left'}`, [className])}
        style={createStyleFromProps(minWidth, maxWidth, 'pointer')}
      >
        {render('Header')}
        <span className={cn('sort-icon', { sorted: column.isSorted, 'sorted-desc': column.isSortedDesc })}>
          <IconArrowDown />
        </span>
      </BootstrapCol>
    )
  }

  const HeaderGroup = (headerGroup) => {
    const { getHeaderGroupProps, headers } = headerGroup
    return (
      <BootstrapRow className={headerStyle} {...getHeaderGroupProps()}>
        {headers.map(HeaderColumn)}
      </BootstrapRow>
    )
  }

  const Cell = (cellProps) => {
    const { getCellProps, render, column } = cellProps
    const { classInd } = cellProps
    const { minWidth, maxWidth, align, className } = column
    const cellClass = cn('table-cell', `cell-align-${align || 'left'}`, [
      className, classInd,
    ])
    return (
      <BootstrapCol
        {...getCellProps()}
        className={cellClass}
        style={createStyleFromProps(minWidth, maxWidth)}
      >
        {render('Cell')}
      </BootstrapCol>
    )
  }

  const Row = (rowProps) => {
    prepareRow(rowProps)
    const { getRowProps, cells, index, original, id } = rowProps
    const handleClick = () => {
      typeof onRowClick === 'function' && onRowClick(index, original)
    }
    const groupName = (data || [])[index][group]
    const hasGroup = !!group && ((index === 0) || groupName !== (data || [])[index - 1][group])

    const handleHideGroup = () => {
      if (hiddenGroups[groupName]) {
        delete hiddenGroups[groupName]
      } else {
        hiddenGroups[groupName] = true
      }
      setHiddenGroups({ ...hiddenGroups })
    }
    const isGroup = cells.filter(c => c.column.isGroup && c.column.isGroup(c))
    const isLabel = cells.filter(c => c.column.isLabel && c.column.isLabel(c))
    const isSubResult = cells.filter(c => c.column.isSubResult && c.column.isSubResult(c))
    const isCategory = cells.filter(c => c.column.isCategory && c.column.isCategory(c))
    const isIndent = cells.filter(c => c.column.isIndent && c.column.isIndent(c))
    cells.forEach(cell => cell.classInd = (cell.column.classCustom && cell.column.classCustom.indexOf('is-indent') !== -1 && cell.row.original.class && cell.row.original.class.indexOf('is-indent') !== -1) ? `${cell.classInd} is-indent` : cell.classInd)
    cells.forEach(cell => cell.classInd = (cell.column.classCustom && cell.column.classCustom.indexOf('is-underline') !== -1 && cell.row.original.class && cell.row.original.class.indexOf('is-underline') !== -1) ? `${cell.classInd} is-underline` : cell.classInd)
    cells.forEach(cell => cell.classInd = (cell.column.classCustom && cell.column.classCustom.indexOf('is-bold') !== -1 && cell.row.original.class && cell.row.original.class.indexOf('is-bold') !== -1) ? `${cell.classInd} is-bold` : cell.classInd)
    cells.forEach(cell => cell.classInd = (cell.column.classCustom && cell.column.classCustom.indexOf('is-subresult') !== -1 && cell.row.original.class && cell.row.original.class.indexOf('is-subresult') !== -1) ? `${cell.classInd} is-subresult` : cell.classInd)
    cells.forEach(cell => cell.classInd = (cell.column.classCustom && cell.column.classCustom.indexOf('is-2-underline') !== -1 && cell.row.original.class && cell.row.original.class.indexOf('is-2-underline') !== -1) ? `${cell.classInd} is-2-underline` : cell.classInd)
    return (
      <div className={cn('row-wrapper', { clickable: onRowClick })} key={id}>
        {hasGroup && (
          <div className="group-header" role="button" onClick={handleHideGroup}>
            <span className="expand-icon">
              {!hiddenGroups[groupName] && 'IconExpand'}
              {hiddenGroups[groupName] && 'IconCollapse'}
            </span>
            {groupName}
          </div>
        )}
        {!hiddenGroups[groupName] && (
          <RowWrapper {...rowProps}>
            <BootstrapRow
              className={cn('table-row', {
                'is-group': isGroup.length > 0,
                'is-label': isLabel.length > 0,
                'is-subresult': isSubResult.length > 0,
                'is-category': isCategory.length > 0,
                // 'is-indent': isIndent.length > 0,
              })}
              {...getRowProps()}
              onClick={handleClick}
            >
              {isGroup.length > 0 && <Cell {...isGroup[0]} />}
              {isGroup.length === 0 && cells.map(Cell)}
            </BootstrapRow>
          </RowWrapper>
        )}
      </div>
    )
  }

  const isEmpty = !customData.length && !loading && pageIndex === 0
  const totalItems = pages?.total || 1
  const canLoadMore = lazyLoading && customData.length > 0 && (customData.length !== totalItems)

  return (
    <div className={cn('table-wrapper', [className])}>
      <div {...getTableProps()} className="grid-view common-table">
        {headerGroups.map(HeaderGroup)}
        <div {...getTableBodyProps()}>
          {withDnD && (
            <UploadFile
              loading={loading}
              accept={FILE_UPLOAD_ACCEPTED}
              onDropAccepted={handleFilesUpload}
              onDropRejected={handleFilesRejected}
              withButton={false}
              withIcon
            />
          )}
          {loading && !lazyLoading && (
            <GridContentLoader
              columns={columns}
              relativeRowHeight={relativeRowHeight}
              pageSize={pageSize}
            />
          )}
          {(!loading || lazyLoading) && rows.map(Row)}
          {isEmpty && (
            <EmptyState 
              title={emptyStateTitle || t('common_components.gridview.no_data_title')} 
              text={emptyStateText || t('common_components.gridview.no_data')}
            />
          )}
        </div>
      </div>
      {pages && (!isEmpty || pageIndex > 0) && !lazyLoading && !hidePaging && (
        <Pagination
          data={{ currentPage: pageIndex, totalItems, pageSize }}
          onPageChange={onChangeCurrentPage}
        />
      )}
      {lazyLoading && loading && (
        <div className="lazy-loadding-wrapper">
          <Loading childLoading loading={loading} />
        </div>
      )}
      {lazyLoading && canLoadMore && showSeeMoreBtn && (
        <div className="loadmore-btn-wrapper">
          <LinkButton
            icon={null}
            text={gridviewSeeMore || t('common_components.gridview.see_more')}
            disabled={loading}
            onClick={handleLoadMoreItems}
          />
        </div>
      )}
    </div>
  )
}

GridView.propTypes = {
  className: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.func,
      ]),
      classCustom: PropTypes.string,
      accessor: PropTypes.string,
      sorts: PropTypes.arrayOf(
        PropTypes.shape({
          sortKey: PropTypes.string,
          ascText: PropTypes.string,
          descText: PropTypes.string,
        })
      ),
      Cell: PropTypes.func,
      align: PropTypes.oneOf(['left', 'right', 'center']),
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      minWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      maxWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    })
  ),
  data: PropTypes.array,
  state: PropTypes.shape({
    sorts: PropTypes.instanceOf(Object),
    pageIndex: PropTypes.number,
    pageSize: PropTypes.number,
  }),
  onStateChange: PropTypes.func,
  pages: PropTypes.object,
  loading: PropTypes.bool,
  relativeRowHeight: PropTypes.number,
  emptyStateTitle: PropTypes.string,
  emptyStateText: PropTypes.string,
  gridviewSeeMore: PropTypes.string,
  lazyLoading: PropTypes.bool,
  showSeeMoreBtn: PropTypes.bool,
  onRowClick: PropTypes.func,
  RowWrapper: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
    PropTypes.elementType,
  ]),
  hidePaging: PropTypes.bool,
  group: PropTypes.string,
  withDnD: PropTypes.bool,
  handleFilesUpload: PropTypes.func,
  handleFilesRejected: PropTypes.func,
}

const DefaultRowWrapper = ({ key, children }) => <React.Fragment key={key}>{children}</React.Fragment>
GridView.defaultProps = {
  className: '',
  columns: [],
  data: [],
  onStateChange: null,
  pages: null,
  loading: false,
  relativeRowHeight: 30,
  lazyLoading: false,
  showSeeMoreBtn: true,
  onRowClick: null,
  RowWrapper: DefaultRowWrapper,
  group: null,
  withDnD: false,
  handleFilesUpload: () => {},
  handleFilesRejected: () => {},
}

export default GridView
