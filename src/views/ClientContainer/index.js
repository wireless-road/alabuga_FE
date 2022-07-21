import React, { useState, useEffect, memo } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next'
import cn from 'classnames'

import {
  Header, Footer, Expandable, UploadFile, Button, 
  Modal, LinkButton, Loading
} from '../../components/commons'

import { IconArrowRight, IconMessages, IconQuestions } from '../../assests/icons'

import { pathKeys } from '../../constants'
import { BOOTSTRAP_VARIANTS, FILE_UPLOAD_ACCEPTED } from '../../constants/common'

import { appActions, clientActions } from '../../redux/actions'
import { clientSelectors } from '../../redux/selectors/clientSelector'
import { appSelectors } from '../../redux/selectors/appSelector'

import {
  NotFound,
} from '../index'
import Loader from './pendingAccountingCompanyInfoLoader'

import './style.scss'

const ClientContainer = props => {
  const {
    setCurrentAccount,
    currentAccount,
    uploadDocuments,
    documentsUploading,
    accountingQuestions,
    accountingQuestionsFetching,
    getAccountingQuestions,
    countPendingDocuments,
    totalPendingDocuments,
    totalPendingDocumentsFetching,
    getOrganizationInfo,
    organization,
    organizationFetching,
    showError,
    getChatChannels,
    chatChannels,
    chatChannelsFetching,
  } = props
  const [t] = useTranslation()
  const routerHistory = useHistory()
  const location = useLocation()

  const [isExpanded, setIsExpanded] = useState(localStorage.getItem('isExpanded') === 'true')
  const [showUploadSuccessModal, changeShowUploadSuccessModal] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState([])
  const [totalNewMessages, setTotalNewMessages] = useState(0)
  const [unreadChannels, setUnreadChannels] = useState([])

  useEffect(() => {
    const isOverviewScreen = location.pathname.includes(pathKeys.OVERVIEW)
    setIsExpanded(isOverviewScreen)
    localStorage.setItem('isExpanded', isOverviewScreen)

    showUploadSuccessModal && changeShowUploadSuccessModal(false)
  }, [location])

  useEffect(() => {
    if (chatChannels && !chatChannelsFetching) {
      let total = 0
      const channels = []
      chatChannels.forEach(channel => {
        if (channel.messages_amount) {
          total += channel.messages_amount
          channels.push(channel)
        }
      })
      setTotalNewMessages(total)
      setUnreadChannels(channels)
    }
  }, [chatChannels, chatChannelsFetching])

  useEffect(() => {
    if (currentAccount) {
      getChatChannels(currentAccount.account.id, currentAccount.account.id)

      countPendingDocuments(currentAccount.account.id)
      getOrganizationInfo(currentAccount.account.id)
      getAccountingQuestions()
    }
  }, [currentAccount])

  const onExpandableClick = () => {
    localStorage.setItem('isExpanded', !isExpanded)
    setIsExpanded(!isExpanded)
  }

  const handleFilesUpload = files => {
    setUploadingFiles(files)
    uploadDocuments(currentAccount.account.id, files, () => changeShowUploadSuccessModal(true))
  }

  const handleFilesRejected = () => showError(`${t('client_container.upload_error')} ${FILE_UPLOAD_ACCEPTED.join(', ')}`)

  const rightPanel = () => {
    if (isExpanded) {
      return <>
        {organization && !organizationFetching && !totalPendingDocumentsFetching ? (
          <>
            <div className="title2">
              {organization[0]?.display_name}<span className="sub-title">{` (${t('client_container.accountant_title')})`}</span>
            </div>
            <div className="client-info">
              <img className="profile-image" src={organization[0]?.organization.logo} alt="" />
              <div className="client-progress">
                <div>{`${totalPendingDocuments} ${t('client_container.pending_docs_count')}`}</div>
                <div>4 hours (approx)</div>
              </div>
            </div>
          </>
        ) : (
          <Loader />
        )}
        <div className="divider no-padding" />
        {organization && (
          <div className="pb-4">
            <UploadFile
              uploadMessage={t('client_home_page.upload_msg', { name: organization[0]?.display_name })}
              accept={FILE_UPLOAD_ACCEPTED}
              onDropAccepted={handleFilesUpload}
              onDropRejected={handleFilesRejected}
              loading={documentsUploading}
            />
          </div>
        )}
        <div className="no-padding">
          <Expandable
            contentClassName="padding"
            title={<>
              {t('client_container.accounting_questions')}
              {!!accountingQuestions.length && <div className="counter">{accountingQuestions.length}</div>}
              </>}
          >
            <Loading childLoading loading={accountingQuestionsFetching} />
          </Expandable>
        </div>
        <div className="no-padding">
          <Expandable
            contentClassName="padding messages"
            title={<>
              {t('client_container.messages')}
              {!!totalNewMessages && <div className="counter">{totalNewMessages}</div>}
              </>}
          >
          </Expandable>
        </div>
      </>
    }

    return <>
      <div className="right-notification-icon">
        {!!accountingQuestions.length && <div className="counter">{accountingQuestions.length}</div>}
        <span role="button"><IconQuestions /></span>
      </div>
      <div className="right-notification-icon">
        {!!totalNewMessages && <div className="counter">{totalNewMessages}</div>}
        <span role="button"><IconMessages /></span>
      </div>
    </>
  }

  const closeModal = () => changeShowUploadSuccessModal(false)
  return (
    <>
      <Header
        selectedAccount={currentAccount}
        onAccountChange={setCurrentAccount}
      />
      <div className={cn('client-container-page', 'container-page', { expanded: isExpanded })}>
        <Modal
          className="documents-uploaded-modal"
          show={showUploadSuccessModal}
          loading={false}
          size="lg"
          // centered
          backdrop="static"
          onHide={closeModal}
          title={t('client_home_page.documents_uploaded_modal.title')}
        >
          <div className="content">
            <Trans
              i18nKey="client_home_page.documents_uploaded_modal.content"
              values={{ files: uploadingFiles.map(i => i.name).join(', ') }}
              components={{
                document: <LinkButton onClick={() => routerHistory.push(pathKeys.DOCUMENTS)} text={t('client_home_page.documents_uploaded_modal.document_link')} />,
                bold: <span className="document-files" />
              }}
            />
          </div>
          <div className="actions">
            <Button
              className="login-button"
              size="md"
              variant={BOOTSTRAP_VARIANTS.SUCCESS} 
              text={t('client_home_page.documents_uploaded_modal.ok_button')}
              onClick={closeModal}
            />
          </div>
        </Modal>
        <div className="left-panel">
          <Switch>
            <Route component={NotFound} />

          </Switch>
        </div>
        <div className="expandable-column">
          <span role="button" onClick={onExpandableClick}>
            <IconArrowRight />
          </span>
        </div>
        <div className="right-panel">{rightPanel()}</div>
      </div>
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  user: appSelectors.selectUser(state),
  currentAccount: appSelectors.selectCurrentAccount(state),
  documentsUploading: clientSelectors.documentsUploading(state),
  accountingQuestions: clientSelectors.selectAccountingQuestions(state),
  accountingQuestionsFetching: clientSelectors.selectAccountingQuestionsFetching(state),
  totalPendingDocumentsFetching: clientSelectors.selectTotalPendingDocumentsFetching(state),
  totalPendingDocuments: clientSelectors.selectTotalPendingDocuments(state),
  organizationFetching: clientSelectors.selectOrganizationFetching(state),
  organization: clientSelectors.selectOrganization(state),
})

const mapDispatchToProps = dispatch => ({
  setCurrentAccount: account => dispatch(appActions.setCurrentAccount(account)),
  showError: message => dispatch(appActions.showErrorNotification(message)),
  uploadDocuments: (accountId, files, callback, updateStatus = true) => dispatch(clientActions.uploadDocuments(accountId, files, callback, updateStatus)),
  getAccountingQuestions: () => dispatch(clientActions.getAccountingQuestions(null, 'open')),
  answerAccountingQuestion: (id, body, callback) => dispatch(clientActions.answerAccountingQuestion(id, body, callback)),
  countPendingDocuments: (id, useLoadingState) => dispatch(clientActions.countPendingDocuments(id, useLoadingState)),
  getOrganizationInfo: id => dispatch(clientActions.getOrganizationInfo(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(memo(ClientContainer))
