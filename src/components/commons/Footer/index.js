import React from 'react'
import { useTranslation } from 'react-i18next'

import './style.scss'

const Footer = () => {
  const [t] = useTranslation()

  return (
    <div className="footer-bar">
      <div>
        <div className="footer-content">
          <div className="main-text-wrap">
            <div className="main-text">Alabuga</div>
          </div>
        </div>
        <div className="footer-line" />
        <div className="copyright">(c) 2022 - Alabuga</div>
      </div>
    </div>
  )
}

export default Footer
