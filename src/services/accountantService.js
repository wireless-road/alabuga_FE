import BaseService from "./baseService";
import accountantApi from "../api/accountantApi";

class AccountantService extends BaseService {

  getPendingPostsOverview(query, expanded) {
    return accountantApi
      .getPendingPostsOverview(query, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getGlobalSearch(query, isUsePaging = false) {
    return accountantApi
      .getGlobalSearch(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  splitPdf(id, pages_range ) {
    return accountantApi.splitPdf(id, pages_range)
      .then(this.handleResponse)
      .catch(this.handleError)
  }

  getJournalEntriesReport(query, isUsePaging = true) {
    return accountantApi
      .getJournalEntriesReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getGeneralLedgerReport(query, isUsePaging = true) {
    return accountantApi
      .getGeneralLedgerReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getVatReport(query) {
    return accountantApi
      .getVatReport(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getIncomeStatementReport(query, isUsePaging = true) {
    return accountantApi
      .getIncomeStatementReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getTrialBalanceReport(query, isUsePaging = true) {
    return accountantApi
      .getTrialBalanceReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountReceivableReport(query, isUsePaging = true) {
    return accountantApi
      .getAccountReceivableReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountPayableReport(query, isUsePaging = true) {
    return accountantApi
      .getAccountPayableReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getBalanceSheetReport(query, isUsePaging = true) {
    return accountantApi
      .getBalanceSheetReport(query, isUsePaging)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getBankTransactions(clientId, bankAccountId, expanded) {
    return accountantApi
      .getBankTransactions(clientId, bankAccountId, expanded)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getDocumentSuggestions(query) {
    return accountantApi
      .getDocumentSuggestions(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAccountBalances(bankAccountId, query) {
    return accountantApi
      .getAccountBalances(bankAccountId, query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createPayment(data) {
    return accountantApi
      .createPayment(data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createPaymentRequest(data) {
    return accountantApi
      .createPaymentRequest(data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  searchDocuments(bankTransactionId, partnerName) {
    return accountantApi
      .searchDocuments(bankTransactionId, partnerName)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getJournalEntries(query) {
    return accountantApi
      .getJournalEntries(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createJournalEntry(data) {
    return accountantApi
      .createJournalEntry(data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getJournalEntryLines(query) {
    return accountantApi
      .getJournalEntryLines(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getReconciliations(query) {
    return accountantApi
      .getReconciliations(query)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  createReconciliation(data) {
    return accountantApi
      .createReconciliation(data)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}

export default new AccountantService();
