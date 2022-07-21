import BaseService from "./baseService";
import clientApi from "../api/clientApi";

class ClientService extends BaseService {
  login(username, password) {
    return clientApi
      .login(username, password)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  logout() {
    return clientApi
      .logout()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  resetPassword(query) {
    return clientApi
      .resetPassword(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  submitNewPassword(query) {
    return clientApi
      .submitNewPassword(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getUser(userId) {
    return clientApi
      .getUser(userId)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  uploadDocuments(accountId, files) {
    return clientApi
      .uploadDocuments(accountId, files)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getOverview(clientAccountId) {
    return clientApi
      .getOverview(clientAccountId)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getCurrency(clientAccountId) {
    return clientApi
      .getCurrency(clientAccountId)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getDocuments(query, expanded) {
    return clientApi
      .getDocuments(query, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getPosts(query, expanded) {
    return clientApi
      .getPosts(query, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getPostDetail(id, lang) {
    return clientApi
      .getPostDetail(id, lang)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getVouchers(query, expanded) {
    return clientApi
      .getVouchers(query, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getVoucher(id, lang) {
    return clientApi
      .getVoucher(id, lang)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getVoucherCategories(lang) {
    return clientApi
      .getVoucherCategories(lang)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getKlippaData(id, query) {
    return clientApi
      .getKlippaData(id, query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getQuestionTemplates() {
    return clientApi
      .getQuestionTemplates()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createQuestionTemplates(body) {
    return clientApi
      .createQuestionTemplates(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  updateQuestionTemplates(id, body) {
    return clientApi
      .updateQuestionTemplates(id, body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  deleteQuestionTemplates(id) {
    return clientApi
      .deleteQuestionTemplates(id)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createAccountingQuestions(body) {
    return clientApi
      .createAccountingQuestions(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountingQuestions(id, status, clientAccountId) {
    return clientApi
      .getAccountingQuestions(id, status, clientAccountId)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  answerAccountingQuestion(id, body) {
    return clientApi
      .answerAccountingQuestion(id, body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createBusinessPartners(body) {
    return clientApi
      .createBusinessPartners(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  updateBusinessPartner(id, body) {
    return clientApi
      .updateBusinessPartner(id, body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createProjects(body) {
    return clientApi
      .createProjects(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  updateProject(id, body) {
    return clientApi
      .updateProject(id, body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createAssets(body) {
    return clientApi
      .createAssets(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  updateAsset(id, body) {
    return clientApi
      .updateAsset(id, body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getBusinessPartners(clientAccountId, description, expanded, perPage, page) {
    return clientApi
      .getBusinessPartners(
        clientAccountId,
        description,
        isNaN(Number(expanded)) ? 1 : expanded,
        perPage,
        page
      )
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getOrganizations(description, expanded, perPage) {
    return clientApi
      .getOrganizations(description, expanded, perPage)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountingAccounts(query) {
    return clientApi
      .getAccountingAccounts(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountingAccount(query) {
    return clientApi
      .getAccountingAccount(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountSuggestions(clientAccountId, businessPartnerId, documentType) {
    return clientApi
      .getAccountSuggestions(clientAccountId, businessPartnerId, documentType)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getJournalEntriesRaw(journal_sequence_number, clientAccountId, expanded) {
    return clientApi
      .getJournalEntriesRaw(journal_sequence_number, clientAccountId, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getTaxCodes(query) {
    return clientApi
      .getTaxCodes(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  archivePosts(body) {
    return clientApi
      .archivePosts(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  reversePosts(body) {
    return clientApi
      .reversePosts(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createPosts(body) {
    return clientApi
      .createPosts(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  deletePosts(id) {
    return clientApi
      .deletePosts(id)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getOrganizationInfo(id) {
    return clientApi
      .getOrganizationInfo(id)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getBankAccounts(
    clientId,
    businessPartnerId,
    expanded,
    page,
    perPage,
    description
  ) {
    return clientApi
      .getBankAccounts(
        clientId,
        businessPartnerId,
        expanded,
        page,
        perPage,
        description
      )
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getProjects(clientId, expanded, page, perPage) {
    return clientApi
      .getProjects(clientId, expanded, page, perPage)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAssets(clientId, expanded, page, perPage) {
    return clientApi
      .getAssets(clientId, expanded, page, perPage)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createBankAccounts(body) {
    return clientApi
      .createBankAccounts(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getIbanCalculation(
    clientId,
    bban,
    country,
    bankCode,
    expanded,
    page,
    perPage
  ) {
    return clientApi
      .getIbanCalculation(
        clientId,
        expanded,
        bankCode,
        bban,
        country,
        page,
        perPage
      )
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getIbanValidation(clientId, iban, expanded) {
    return clientApi
      .getIbanValidation(clientId, iban, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getLabels(query) {
    return clientApi
      .getLabels(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getCategories(filter, expanded, page, perPage) {
    return clientApi
      .getCategories(filter, expanded, page, perPage)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getCategoriesLv1(expanded) {
    return clientApi
      .getCategoriesLv1(expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getChildInvoiceCategories(parentCode) {
    return clientApi
      .getChildInvoiceCategories(parentCode)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createDoc(body) {
    return clientApi
      .createDoc(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createExperiment(body) {
    return clientApi
      .createExperiment(body)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getUnits(filter, version, common, expanded, page, perPage) {
    return clientApi
      .getUnits(filter, version, common, expanded, page, perPage)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getItems(client_account_id, filter, expanded) {
    return clientApi
      .getItems(client_account_id, filter, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  addItem(query) {
    return clientApi
      .addItem(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export default new ClientService();
