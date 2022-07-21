import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import DOMPurify from 'dompurify'

import { common, pathKeys } from '../../constants'
import { cookie } from '../../utils'
import { clientActions } from '../../redux/actions'
import { clientSelectors } from '../../redux/selectors/clientSelector'
import './styles.scss'

import { Input, Button, LinkButton, CheckBox } from '../commons'
import { appSelectors } from '../../redux/selectors/appSelector'

const LoginItem = (props) => {
  const {
    login,
    token,
    user,
    getUser,
    isPopUp = false
  } = props

  const [isRemember, setIsRemember] = useState(false)
  const [passwordType, setPasswordType] = useState('password')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const routerHistory = useHistory()
  const [t] = useTranslation()

  const redirectHome = user => {
    const accounts = ((user || {}).accounts || [])
    if (accounts.length > 0) {
      if ((accounts[0].role || {}).name === 'AA') {
        routerHistory.replace(pathKeys.ACCOUNTANT)
        return
      }
    }
    routerHistory.replace(pathKeys.CUSTOMER)
  }

  useEffect(() => {
    if (token) {
      cookie.setToken(token)
      getUser(cookie.getUserId())
    } else {
      const savedToken = cookie.getToken()
      if (savedToken) {
        getUser(cookie.getUserId())
      }
    }
  }, [token])

  useEffect(() => {
    if (user) {
      redirectHome(user)
    }
  }, [user])

  const handlePasswordIconClick = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
    } else {
      setPasswordType('password')
    }
  }

  const handleLogin = () => login(DOMPurify.sanitize(username, { ALLOWED_TAGS: [] }), DOMPurify.sanitize(password, { ALLOWED_TAGS: [] }))

  const handleUsernameChange = (e) => setUsername(e)

  const handlePasswordChange = (e) => setPassword(e)

  const loginContainer = isPopUp ? 'login-form shouldCenter' : 'login-form'

  return (
    <div className={loginContainer}>
      <div>
        <div className="title">
          {t('login_page.title')}
        </div>
        <Input
          label={t('login_page.email_label')}
          value={username}
          required
          onChange={handleUsernameChange}
          onEnter={handleLogin}
        />
        <Input
          type={passwordType}
          value={password}
          required
          isPassword
          label={t('login_page.password_label')}
          onPasswordIconClick={handlePasswordIconClick}
          onChange={handlePasswordChange}
          onEnter={handleLogin}
        />
        <div className="forgot-password">
          <LinkButton
            onClick={() => routerHistory.push(pathKeys.FORGOT_PASSWORD)}
            text={t('login_page.forgot_password_link')}
          />
        </div>
        <div>
          <CheckBox
            checked={isRemember}
            onClick={() => setIsRemember(!isRemember)}
          >
            {t('login_page.remember_me_checkbox')}
          </CheckBox>
        </div>
        <div className="text-center">
          <Button
            className="login-button"
            size="lg"
            variant={common.BOOTSTRAP_VARIANTS.SUCCESS} 
            text={t('login_page.login_button')}
            onClick={handleLogin}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  token: clientSelectors.selectToken(state),
  user: appSelectors.selectUser(state)
})

const mapDispatchToProps = {
  login: clientActions.login,
  clearLoginState: clientActions.clearLoginState,
  getUser: clientActions.getUser
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginItem)
