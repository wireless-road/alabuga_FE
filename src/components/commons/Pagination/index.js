import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Row, Col } from 'react-bootstrap'

import './pagination.scss'

const TOTAL_PAGE_SHOWING = 8

const Pagination = ({ data, onPageChange }) => {
  if (!data) {
    return null
  }

  let totalPage = Math.floor((data.totalItems || 0) / data.pageSize)

  if ((data.totalItems || 0) % data.pageSize > 0) {
    totalPage++
  }
  const startPage = Math.floor((data.currentPage - (TOTAL_PAGE_SHOWING / 2)) < 1 ? 1 : (data.currentPage - (TOTAL_PAGE_SHOWING / 2)))
  const endPage = (startPage + TOTAL_PAGE_SHOWING - 1) > totalPage ? totalPage : (startPage + TOTAL_PAGE_SHOWING - 1)

  const handleChangePage = e => {
    e.preventDefault()
    const { index } = e.target.dataset
    onPageChange(index)
  }

  const renderPageNumber = () => {
    const items = []

    for (let index = startPage; index <= endPage || 0; index++) {
      items.push(
        <li
          key={index}
          className={cn('page-item', { active: index === data.currentPage })}
        >
          <button
            type="button"
            className="page-link"
            data-index={index}
            onClick={handleChangePage}
          >
            {index}
          </button>
        </li>
      )
    }

    return items
  }

  return (
    <Row className="pt-1 pagination">
      <Col xs={12}>
        <div className="paginate-container">
          <ul className="paginate-buttons">
            <li
              className={cn('page-item previous', {
                disabled: data.currentPage === 1,
              })}
            >
              <button
                type="button"
                disabled={data.currentPage === 1}
                className="page-link"
                data-index={1}
                onClick={handleChangePage}
              >
                ❮❮
              </button>
            </li>
            <li
              className={cn('page-item previous', {
                disabled: data.currentPage === 1,
              })}
            >
              <button
                type="button"
                disabled={data.currentPage === 1}
                className="page-link"
                data-index={data.currentPage - 1}
                onClick={handleChangePage}
              >
                ❮
              </button>
            </li>
            {renderPageNumber()}
            <li
              className={cn('page-item next', {
                disabled: data.currentPage === totalPage,
              })}
            >
              <button
                type="button"
                disabled={data.currentPage === totalPage}
                className="page-link"
                data-index={data.currentPage + 1}
                onClick={handleChangePage}
              >
                ❯
              </button>
            </li>
            <li
              className={cn('page-item next', {
                disabled: data.currentPage === totalPage,
              })}
            >
              <button
                type="button"
                disabled={data.currentPage === totalPage}
                className="page-link"
                data-index={totalPage}
                onClick={handleChangePage}
              >
                ❯❯
              </button>
            </li>
          </ul>
        </div>
      </Col>
    </Row>
  )
}

Pagination.propTypes = {
  data: PropTypes.object,
  onPageChange: PropTypes.func
}

export default Pagination
