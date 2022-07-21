import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import ReactHtmlParser from 'react-html-parser'

import {Input, GridView, DateIntervalPicker, AsyncSelect, ExportToExcelButton, Button } from '../../components/commons'
import { ReportWrap } from '../../components'
import {colorizeKeyword, detectLanguage} from '../../utils/common'
import { accountantActions , clientActions } from '../../redux/actions'
import { accountantSelectors } from '../../redux/selectors/accountantSelector'
import { appSelectors } from '../../redux/selectors/appSelector'
import { clientSelectors } from '../../redux/selectors/clientSelector'

import './style.scss'
import { accountantService } from '../../services'

const TrialBalanceReport = props => {
  const {
    currentContract,
    getTrialBalanceReport,
    trialBalanceReport,
    trialBalanceReportFetching,
    currency,
    getCurrency,
    getAccountingAccounts,
    createExperiment,
    accountingAccounts,
    accountingAccountsFetching,
  } = props
  const [t] = useTranslation()

  const [selectedAccount, setSelectedAccount] = useState(null)
  const [startDate, changeStartDate] = useState(moment().startOf('year').toDate())
  const [endDate, changeEndDate] = useState(moment().endOf('year').toDate())
  const [keyWord, changeKeyWord] = useState('')
  const [text, changeText] = useState('')
  const [pattern, changePattern] = useState('')
  const [trialBalanceExpandableReport, setTrialBalanceExpandableReport] = useState(null)
  const [lines, setLines] = useState({ 0: {} })

  const handleQueryChange = data => {
    const q  = {
      client_account_id: currentContract.client_account_id,
      date_from: moment(startDate).format('YYYY-MM-DD'),
      date_to: moment(endDate).format('YYYY-MM-DD'),
      description: keyWord,
      account_code: selectedAccount,
      ...(data || {})
    }
    getTrialBalanceReport(q)
    getCurrency(currentContract.client_account_id)
    // getLabels()
    getAccountingAccounts()
  }

  useEffect(() => {
    if (currentContract) {
      handleQueryChange()
    }
  }, [currentContract, startDate, endDate, keyWord, selectedAccount])

  const handleReportData = (data) => {
    console.log('___ ', trialBalanceReport)
    setTrialBalanceExpandableReport(trialBalanceReport)
  }

  useEffect(() => {
    if (trialBalanceReport) {
      handleReportData(trialBalanceReport)
    }
  }, [trialBalanceReport, currency])

  const exportData = (report) =>
    report?.map((el) => ({
      [t('trial_balance.gridview.account_code')]: el.account_code,
      [t('trial_balance.gridview.description')]: el.description,
      [t('trial_balance.gridview.starting_balance')]: Number(el.starting_balance),
      [t('trial_balance.gridview.debit')]: Number(el.ending_debit),
      [t('trial_balance.gridview.credit')]: Number(el.ending_credit),
      [t('trial_balance.gridview.ending_balance')]: Number(el.ending_balance)
    }))

  const handleSetLines = (value, key, index, field) => {
    const newLines = { ...lines }
    newLines[key].line_id = index + 1
    newLines[key][field] = value
    setLines(newLines)
    setSelectedAccount((value || {}).account_code)
  }

  const handleGetAllData = async () => {
    const lang = detectLanguage()

    const q  = {
      client_account_id: currentContract.client_account_id,
      date_from: moment(startDate).format('YYYY-MM-DD'),
      date_to: moment(endDate).format('YYYY-MM-DD'),
      description: keyWord,
      account_code: selectedAccount,
      // ...(data || {})
    }

    const { data: report } = await accountantService.getTrialBalanceReport(
      { ...q, lang },
      false
    )

    const res = exportData(report.account_balances)
    return { 'data': res, 'labels': null }
  }

  const createMatch = () => {
    console.log('___ createMatch')
    const q  = {
      client_account_id: currentContract.client_account_id,
      text_1: text,
      text_2: pattern,
    }
    createExperiment(q, () => {
      const q  = {
        client_account_id: currentContract.client_account_id,
        date_from: moment(startDate).format('YYYY-MM-DD'),
        date_to: moment(endDate).format('YYYY-MM-DD'),
        description: keyWord,
        // account_code: selectedAccount
      }
      getTrialBalanceReport(q)
    })
  }

  return (
    <ReportWrap
      className="income-statement-report"
      title={t('trial_balance.title')}
      handleGetAllData={handleGetAllData}
      // exportData={exportData}
      filterItems={
        <>
          <div className="filter-row">
            <Input className="wide" size="md" placeholder={t('trial_balance.inspected_text')} value={text} onChange={changeText} />
            <Input className="wide" size="md" placeholder={t('trial_balance.pattern')} value={pattern} onChange={changePattern} />
            <Button className="shrinked" text="send" size="sm" onClick={createMatch} />
          </div>
        </>
      }
      data={<GridView
        columns={[
          {
            Header: t('trial_balance.gridview.id'),
            accessor: 'id',
            align: 'left',
            maxWidth: 50,
            classCustom: 'is-indent is-bold'
          },
          {
            Header: t('trial_balance.gridview.name'),
            accessor: 'name',
            align: 'left',
            classCustom: 'is-indent',
            maxWidth: 120,
            // Cell: cellProps => {
            //   if (!keyWord || cellProps.value === t('general_ledger.ingoing_balance') || cellProps.value === t('general_ledger.outgoing_balance')) {
            //     return cellProps.value
            //   }
            //   const newSentence = colorizeKeyword(cellProps.value, keyWord)
            //   return ReactHtmlParser(newSentence)
            // },
          },
          {
            Header: t('trial_balance.gridview.surname'),
            accessor: 'surname',
            align: 'right',
            maxWidth: 100,
            classCustom: 'is-indent'
          },
          {
            Header: t('trial_balance.gridview.age'),
            accessor: 'age',
            align: 'right',
            maxWidth: 50,
            classCustom: 'is-indent'
          },
          {
            Header: t('trial_balance.gridview.boss'),
            accessor: 'boss',
            align: 'right',
            maxWidth: 150,
            classCustom: 'is-indent'
          },
          {
            Header: t('trial_balance.gridview.status'),
            accessor: 'status',
            align: 'right',
            maxWidth: 500,
            classCustom: 'is-underline'
          },
          {
            Header: t('trial_balance.gridview.salary'),
            accessor: 'salary',
            align: 'right',
            maxWidth: 100,
            classCustom: 'is-indent'
          }
        ]}
        data={trialBalanceExpandableReport?.citizens}
        loading={trialBalanceReportFetching}
        relativeRowHeight={30}
        onStateChange={query => handleQueryChange(query)}
        emptyStateTitle=""
      />}
    />
  )
}

const mapStateToProps = state => ({
  currentContract: appSelectors.selectCurrentContract(state),
  trialBalanceReport: accountantSelectors.selectTrialBalanceReport(state),
  trialBalanceReportFetching: accountantSelectors.selectTrialBalanceReportFetching(state),
  accountingAccounts: clientSelectors.selectAccountingAccounts(state),
  accountingAccountsFetching: clientSelectors.selectAccountingAccountsFetching(state),
  currency: clientSelectors.selectCurrency(state),
  currencyFetching: clientSelectors.selectCurrencyFetching(state),
  labelsFetching: clientSelectors.selectLabelsFetching(state),
  labels: clientSelectors.selectLabels(state),
})

const mapDispatchToProps = {
  createExperiment: clientActions.createExperiment,
  getTrialBalanceReport: accountantActions.getTrialBalanceReport,
  getAccountingAccounts: clientActions.getAccountingAccounts,
  getCurrency: clientActions.getCurrency,
  getLabels: clientActions.getLabels,
}

export default connect(mapStateToProps, mapDispatchToProps)(TrialBalanceReport)
