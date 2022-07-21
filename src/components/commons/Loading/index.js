import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { loadingGrey } from '../../../assests/images'
import './style.scss'

const Loading = ({ msg, className, loading, childLoading }) => {
  const customOverlayClass = cn(
    'webim-loading',
    { 'child-loading': childLoading },
    [className]
  )
  return loading ? (
    <div className={customOverlayClass}>
      <img src={loadingGrey} alt="loading" />
      {msg && <span>{msg}</span>}
    </div>
  ) : null
}

const { string, bool } = PropTypes

Loading.propTypes = {
  msg: string,
  className: string,
  loading: bool,
  childLoading: bool,
}

Loading.defaultProps = {
  childLoading: false,
}

export default Loading
