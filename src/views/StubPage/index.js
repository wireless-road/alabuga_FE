import React from 'react'
import { useTranslation } from 'react-i18next'
import Container from 'react-bootstrap/Container'

import './style.scss'

const StubPage = ({ title, subtitle }) => {
  const [t] = useTranslation()

  return (
    <Container className="stub-page-wrapper">
      <div className="title">{title || t('common_phrases.something_went_wrong')}</div>
      <div className="subtitle">{subtitle || t('common_phrases.please_try_later')}</div>
    </Container>
  )
}

export default StubPage
