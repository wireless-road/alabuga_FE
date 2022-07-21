import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { appActions, clientActions } from '../../redux/actions'
import { clientSelectors } from '../../redux/selectors/clientSelector'
import { Input, Button } from '../../components/commons'
import { common, pathKeys } from '../../constants'
import { cookie } from '../../utils'
import { loginBgImg, loginImg, elar } from '../../assests/images'
import { IconArrowRight } from '../../assests/icons'

import './style.scss'

const ResetPassword = ({ token, submitNewPassword, clearLoginState, showErrorNotification }) => {
  const [t] = useTranslation()
  const routerHistory = useHistory()
  const pathArray = routerHistory.location.pathname.split('/')
  const tokenFromUrl = pathArray[pathArray.length-1]

  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

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

  const handleSubmitNewPassword = () => {
    if (password.length < 8 || repeatPassword.length < 8) {
      return showErrorNotification(t('reset_password_page.input_password_min_8_characters'))
    }
    if (password !== repeatPassword) {
      return showErrorNotification(t('reset_password_page.password_doesnt_match'))
    }
    if (!tokenFromUrl) {
      return showErrorNotification(t('reset_password_page.broken_link'))
    }
    submitNewPassword(tokenFromUrl, password, isSuccessed => {
      if (isSuccessed) {
        routerHistory.push(pathKeys.LOGIN)
      }
    })
  }

  return (
    <div className="reset-password-page" style={{ backgroundImage: `url(${loginBgImg})` }}>
      <div className="logo-container">
        <div className="logo"><img src={elar} alt="" /></div>
        <div className="desc">{t('login_page.slogan')}</div>
      </div>
      <div className="reset-password-form">
        <div>
          <div className="title">
            <span role="button" onClick={() => routerHistory.push(pathKeys.LOGIN)}>
              <IconArrowRight />
            </span>{t('reset_password_page.title')}
          </div>
          <Input
            label={t('reset_password_page.new_password')}
            type="password"
            value={password}
            required
            onChange={setPassword}
            placeholder={t('reset_password_page.password_placeholder')}
          />
          <Input
            label={t('reset_password_page.repeat_password')}
            type="password"
            value={repeatPassword}
            required
            onChange={setRepeatPassword}
            placeholder={t('reset_password_page.password_placeholder')}
          />
          <div className="text-center">
            <Button
              className="submit-new-password-button"
              size="lg"
              variant={common.BOOTSTRAP_VARIANTS.SUCCESS}
              text={t('reset_password_page.save_button')}
              onClick={handleSubmitNewPassword}
            />
          </div>
        </div>
      </div>
      <div className="reset-password-img" style={{ backgroundImage: `url(${loginImg})` }} />
    </div>
  )
}

const mapStateToProps = state => ({
  token: clientSelectors.selectToken(state)
})

const mapDispatchToProps = {
  submitNewPassword: clientActions.submitNewPassword,
  clearLoginState: clientActions.clearLoginState,
  showErrorNotification: appActions.showErrorNotification,
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
