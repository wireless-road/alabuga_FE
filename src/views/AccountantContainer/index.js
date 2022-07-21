import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { IconArrowRight } from '../../assests/icons'
import { Footer, Header } from '../../components/commons'
import { pathKeys } from '../../constants'
import { appActions } from '../../redux/actions'
import { appSelectors } from '../../redux/selectors/appSelector'
import {
StubPage, TrialBalanceReport
} from '../index'
import './style.scss'



const AccountantContainer = props => {
  const {
    user,
    setCurrentAccount,
    currentAccount,
    setCurrentContract,
    currentContract,
  } = props
  const [t] = useTranslation()
  const routerHistory = useHistory()
  const location = useLocation()

  const [isExpanded, setIsExpanded] = useState(localStorage.getItem('isExpanded') === 'true')

  const contracts = ((user || {}).contracts || [])

  useEffect(() => {
    const isOverviewScreen = location.pathname.includes(pathKeys.OVERVIEW)
    setIsExpanded(isOverviewScreen)
    localStorage.setItem('isExpanded', isOverviewScreen)
  }, [location])

  useEffect(() => {
    if (!contracts.length) {
      routerHistory.replace(`${pathKeys.ACCOUNTANT}${pathKeys.NO_ACTIVE_CONTRACTS}`)
    }
    const ids = contracts.map(contract => contract.client_account_id)
  }, [])


  useEffect( () => {
    if (currentContract) {

    }
  }, [currentContract])

  const onExpandableClick = () => {
    localStorage.setItem('isExpanded', !isExpanded)
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <Header
        isAccountant
        selectedAccount={currentAccount}
        onAccountChange={setCurrentAccount}
        selectedContract={currentContract}
        onContractChange={setCurrentContract}
      />
      <div className={cn('accountant-container-page', 'container-page', { expanded: isExpanded })}>
        <div className="left-panel">
          <Switch>
            <Redirect exact path={pathKeys.ACCOUNTANT} to={`${pathKeys.ACCOUNTANT}${pathKeys.OVERVIEW}`} />
            <Route exact path={`${pathKeys.ACCOUNTANT}${pathKeys.REPORTS}${pathKeys.TRIAL_BALANCE}`} component={TrialBalanceReport} />
            <Route exact path={`${pathKeys.ACCOUNTANT}${pathKeys.NO_ACTIVE_CONTRACTS}`} render={props => <StubPage {...props} title={t('common_phrases.no_active_contracts')} />} />

          </Switch>
        </div>
        <div className="expandable-column">
          <span role="button" onClick={onExpandableClick}>
            <IconArrowRight />
          </span>
        </div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  user: appSelectors.selectUser(state),
  currentAccount: appSelectors.selectCurrentAccount(state),
  currentContract: appSelectors.selectCurrentContract(state),
})

const mapDispatchToProps = {
  showError: appActions.showErrorNotification,
  setCurrentAccount: appActions.setCurrentAccount,
  setCurrentContract: appActions.setCurrentContract,
  // getPendingDocuments: accountantActions.getPendingDocuments,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountantContainer)
