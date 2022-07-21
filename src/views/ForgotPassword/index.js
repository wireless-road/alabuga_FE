import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import DOMPurify from 'dompurify'

import { Input, Button, LinkButton } from '../../components/commons'
import { common, pathKeys } from '../../constants'
import { cookie } from '../../utils'

import { loginBgImg, loginImg, elar } from '../../assests/images'
import { IconArrowRight } from '../../assests/icons'

import { clientActions } from '../../redux/actions'
import { clientSelectors } from '../../redux/selectors/clientSelector'

import './style.scss'
import {detectLanguage} from "../../utils/common";

const ForgotPassword = props => {
  const {
    resetPassword,
    token,
    clearLoginState
  } = props

  const [t] = useTranslation()
  const routerHistory = useHistory()

  const [username, setUsername] = useState('')
  const [isEmailValid, setEmailValid] = useState(false)
  const [showMessageAfterSuccessResetPassword, setShowMessageAfterSuccessResetPassword] = useState(false)

  useEffect(() => {
    if (token) {
      cookie.setToken(token)
      routerHistory.replace(pathKeys.OVERVIEW)
      clearLoginState()
    } else {
      const savedToken = cookie.getToken()
      if (savedToken) {
        routerHistory.replace(pathKeys.OVERVIEW)
      }
    }
  }, [token])

  const handleResetPassword = () => {
    const lang = detectLanguage()
    resetPassword(DOMPurify.sanitize(username, { ALLOWED_TAGS: [] }), lang, isSuccessed => {
      if (isSuccessed) {
        setShowMessageAfterSuccessResetPassword(true)
      }
    })
  }

  return (
    <div className="forgot-password-page" style={{ backgroundImage: `url(${loginBgImg})` }}>
      <div className="logo-container">
        <div className="logo"><img src={elar} alt="" /></div>
        <div className="desc">{t('login_page.slogan')}</div>
      </div>
      <div className="forgot-password-form">
        <div>
          <div className="title">
            <span role="button" onClick={() => routerHistory.push(pathKeys.LOGIN)}>
              <IconArrowRight />
            </span>{t('forgot_password_page.title')}
          </div>
          {showMessageAfterSuccessResetPassword ? (
            <div className="sub-title">{t('forgot_password_page.we_sent_email_check_inbox')}</div>
          ) : (
            <>
              <div className="sub-title">{t('forgot_password_page.sub_title')}</div>
              <Input
                value={username}
                required
                onChange={setUsername}
                shouldCheckEmail
                setEmailValid={setEmailValid}
                onEnter={handleResetPassword}
                placeholder={t('forgot_password_page.email_placeholder')}
              />
              <div className="text-center">
                <Button
                  className="forgot-password-button"
                  size="lg"
                  variant={common.BOOTSTRAP_VARIANTS.SECONDARY}
                  text={t('forgot_password_page.reset_password_button')}
                  onClick={handleResetPassword}
                  disabled={!isEmailValid}
                />
              </div>
              <div className="text-center or-text">or</div>
              <div className="text-center login-text">
                {t('forgot_password_page.if_you_remember_your_password')}
                <LinkButton onClick={() => routerHistory.push(pathKeys.LOGIN)} text={t('forgot_password_page.login_link')} />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="forgot-password-img" style={{ backgroundImage: `url(${loginImg})` }} />
    </div>
  )
}

const mapStateToProps = state => ({
  token: clientSelectors.selectToken(state)
})

const mapDispatchToProps = {
  resetPassword: clientActions.resetPassword,
  clearLoginState: clientActions.clearLoginState,
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
