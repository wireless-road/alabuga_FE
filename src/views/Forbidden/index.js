/* istanbul ignore file */
import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { EmptyState } from '../../components/commons'
import { pathKeys } from '../../constants'
import './styles.scss'

const useCustomTranslation = () => {
  const { t } = useTranslation()
  return {
    unauthorizedTitle: t('forbidden.unauthorized_title'),
    unauthorizedMessage: t('forbidden.unauthorized_message'),
    unauthorizedLinkText: t('forbidden.unauthorized_link_text')
  }
}

const Forbidden = () => {
  const translator = useCustomTranslation()
  const reactRouterHistory = useHistory()
  const handleBackToHome = () => {
    reactRouterHistory.replace(pathKeys.LOGIN)
  }
  return (
    <div className="forbidden-page page-content">
      
      <EmptyState
        title={translator.unauthorizedTitle}
        text={() => {
          return (
            <>
            <div>
              {translator.unauthorizedMessage}
            </div>
            <div className="link-to-home">
              <a
                href="#top"
                onClick={handleBackToHome}
              >{translator.unauthorizedLinkText}</a> {' to return home.'}
            </div>
            </>
          )
        }}
      />
    </div>
  )
}

export default Forbidden
