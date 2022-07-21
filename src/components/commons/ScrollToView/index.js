import React from 'react'

const ScrollToView = () => {

  const scrollTo = (ref) => {
    ref && ref.scrollIntoView()
  }

  return <span ref={scrollTo} className="scroll-anchor" style={{ visibility: 'hidden', width: '100% !important', height: '0 !important' }} />
}

export default ScrollToView
