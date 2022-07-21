/* eslint-disable react/prop-types */
import React from 'react'
import ContentLoader from 'react-content-loader'
import './style.scss'

const HeadingLoader = ({ type, center }) => (
  <ContentLoader
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    className={`custom-loader custom-heading heading-loader ${type} ${center ? 'center' : ''}`}
  >
  <rect rx="3" ry="3" width="100%" className="text-loader" />
  </ContentLoader>
)

export default HeadingLoader
