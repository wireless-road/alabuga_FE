import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Container from 'react-bootstrap/Container'

import { EmptyState, LinkButton } from '../../components/commons'
import { pathKeys } from '../../constants'

import './style.scss'

const useCustomTranslation = () => {
  const { t } = useTranslation()
  return {
    notFoundTitle: t('not_found_page.not_found_title'),
    notFoundMessage: t('not_found_page.not_found_message'),
    notFoundLinkText: t('not_found_page.not_found_link_text')
  }
}

const NotFound = () => {
  const translator = useCustomTranslation()
  const reactRouterHistory = useHistory()
  const handleBackToHome = () => {
    reactRouterHistory.replace(pathKeys.LOGIN)
  }
  return (
    <Container className="not-found-page">
      <LinkButton
        className="back-to-home-button"
        onClick={handleBackToHome}
        text={translator.notFoundLinkText}
      />
      <EmptyState
        text={translator.notFoundMessage}
        title={translator.notFoundTitle}
      />
    </Container>
  )
}

export default NotFound
