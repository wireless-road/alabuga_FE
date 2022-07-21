import React from 'react'
import { connect } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { loginBgImg, loginImg, elar } from '../../assests/images'
// import Language from '../../components/commons/Header/Language'
import { clientActions } from '../../redux/actions'
import LoginItem from '../../components/LoginItem'
import { clientSelectors } from '../../redux/selectors/clientSelector'
import './style.scss'

const Login = () => {
  const [t] = useTranslation()

  return (
    <div className="login-page" style={{ backgroundImage: `url(${loginBgImg})` }}>
      <div className="logo-container">
        <div className="logo"><img src={elar} alt="" /></div>
        <div className="desc">{t('login_page.slogan')}</div>
      </div>

      <LoginItem />

      <div className="login-img" style={{ backgroundImage: `url(${loginImg})` }} />
    </div>
  )
}

const mapStateToProps = state => ({
  token: clientSelectors.selectToken(state)
})

const mapDispatchToProps = {
  login: clientActions.login,
  clearLoginState: clientActions.clearLoginState,
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
