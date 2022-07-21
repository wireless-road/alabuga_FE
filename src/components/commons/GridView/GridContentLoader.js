import React from 'react'
import ContentLoader from 'react-content-loader'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './style.scss'

const GridContentLoader = (props) => {
  const { columns, relativeRowHeight, pageSize = 5 } = props
  return [...Array(pageSize)].map((_, index) => {
    return (
      <Row className="table-row loader-row" key={index}>
        {columns.map((col) => {
          const { accessor, className } = col
          return (
            <Col key={accessor} className={className}>
              <ContentLoader speed={2} height={relativeRowHeight} width="80%">
                <rect x="0" y="0" rx="0" ry="0" width="100%" height={relativeRowHeight} />
              </ContentLoader>
            </Col>
          )
        })}
      </Row>
    )
  })
}

export default GridContentLoader
