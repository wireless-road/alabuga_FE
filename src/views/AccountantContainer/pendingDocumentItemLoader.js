import React from 'react'
import ContentLoader from 'react-content-loader'
import './style.scss'

const PendingDocumentItemLoader = () => (
  <ContentLoader
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    width="100%"
    height="80px"
  >
    <rect x="10" y="10" rx="5" ry="5" width="200" height="15" />
    <rect x="10" y="30" rx="5" ry="5" width="220" height="15" />
  </ContentLoader>
)

export default PendingDocumentItemLoader
