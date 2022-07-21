import React from 'react'
import ContentLoader from 'react-content-loader'

const Loader = () => (
  <ContentLoader
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    width="100%"
    height="87px"
  >
    <rect x="35" y="0" rx="5" ry="5" width="250" height="21" />

    <rect x="35" y="31" rx="5" ry="5" width="56" height="56" />

    <rect x="96" y="38" rx="5" ry="5" width="150" height="18" />
    <rect x="96" y="61" rx="5" ry="5" width="150" height="18" />
  </ContentLoader>
)

export default Loader
