import { fromJS, set } from "immutable";

import { createReducer } from "../../utils/reduxHelpers";
import * as accountantActions from "../constants/accountantActions";

const initialState = fromJS({
  pendingDocuments: {
    fetching: false,
    data: null,
  },
  globalSearch: {
    fetching: false,
    data: null,
  },
  journalEntriesReport: {
    fetching: false,
    data: null,
  },
  generalLedgerReport: {
    fetching: false,
    data: null,
  },
  vatReport: {
    fetching: false,
    data: null,
  },
  incomeStatementReport: {
    fetching: false,
    data: null,
  },
  accountReceivableReport: {
    fetching: false,
    data: null,
  },
  accountPayableReport: {
    fetching: false,
    data: null,
  },
  balanceSheetReport: {
    fetching: false,
    data: null,
  },
  bankTransactions: {
    fetching: false,
    data: null,
  },
  documentSuggestions: {
    fetching: false,
    data: null,
  },
  accountBalances: {
    fetching: false,
    data: null,
  },
  journalEntries: {
    fetching: false,
    data: null,
  },
  journalEntryLines: {
    fetching: false,
    data: null,
  },
  reconciliations: {
    fetching: false,
    data: null,
  },
  accountantSelections: {
    bankAccount: null,
  },
});

const getPendingDocumentsRequest = (state) => {
  return state.setIn(["pendingDocuments", "fetching"], true);
};

const getPendingDocumentsSuccess = (state, action) => {
  return state
    .setIn(["pendingDocuments", "fetching"], false)
    .setIn(["pendingDocuments", "data"], action.data);
};

const getPendingDocumentsFailure = (state) => {
  return state.setIn(["pendingDocuments", "fetching"], false);
};

const getGlobalSearchRequest = (state) => {
  return state.setIn(["globalSearch", "fetching"], true);
};

const getGlobalSearchSuccess = (state, action) => {
  return state
    .setIn(["globalSearch", "fetching"], false)
    .setIn(["globalSearch", "data"], action.data);
};

const getGlobalSearchFailure = (state) => {
  return state.setIn(["globalSearch", "fetching"], false);
};

const getJournalEntriesReportRequest = (state) => {
  return state.setIn(["journalEntriesReport", "fetching"], true);
};

const getJournalEntriesReportSuccess = (state, action) => {
  return state
    .setIn(["journalEntriesReport", "fetching"], false)
    .setIn(["journalEntriesReport", "data"], action.data);
};

const getJournalEntriesReportFailure = (state) => {
  return state.setIn(["journalEntriesReport", "fetching"], false);
};

const getGeneralLedgerReportRequest = (state) => {
  return state.setIn(["generalLedgerReport", "fetching"], true);
};

const getGeneralLedgerReportSuccess = (state, action) => {
  return state
    .setIn(["generalLedgerReport", "fetching"], false)
    .setIn(["generalLedgerReport", "data"], action.data);
};

const getGeneralLedgerReportFailure = (state) => {
  return state.setIn(["generalLedgerReport", "fetching"], false);
};

const getVatReportRequest = (state) => {
  return state.setIn(["vatReport", "fetching"], true);
};

const getVatReportSuccess = (state, action) => {
  return state
    .setIn(["vatReport", "fetching"], false)
    .setIn(["vatReport", "data"], action.data);
};

const getVatReportFailure = (state) => {
  return state.setIn(["vatReport", "fetching"], false);
};

const getIncomeStatementReportRequest = (state) => {
  return state.setIn(["incomeStatementReport", "fetching"], true);
};

const getIncomeStatementReportSuccess = (state, action) => {
  return state
    .setIn(["incomeStatementReport", "fetching"], false)
    .setIn(["incomeStatementReport", "data"], action.data);
};

const getIncomeStatementReportFailure = (state) => {
  return state.setIn(["incomeStatementReport", "fetching"], false);
};

const getTrialBalanceReportRequest = (state) => {
  return state.setIn(["trialBalanceReport", "fetching"], true);
};

const getTrialBalanceReportSuccess = (state, action) => {
  return state
    .setIn(["trialBalanceReport", "fetching"], false)
    .setIn(["trialBalanceReport", "data"], action.data);
};

const getTrialBalanceReportFailure = (state) => {
  return state.setIn(["trialBalanceReport", "fetching"], false);
};

const getAccountReceivableReportRequest = (state) => {
  return state.setIn(["accountReceivableReport", "fetching"], true);
};

const getAccountReceivableReportSuccess = (state, action) => {
  return state
    .setIn(["accountReceivableReport", "fetching"], false)
    .setIn(["accountReceivableReport", "data"], action.data);
};

const getAccountReceivableReportFailure = (state) => {
  return state.setIn(["accountReceivableReport", "fetching"], false);
};

const getAccountPayableReportRequest = (state) => {
  return state.setIn(["accountPayableReport", "fetching"], true);
};

const getAccountPayableReportSuccess = (state, action) => {
  return state
    .setIn(["accountPayableReport", "fetching"], false)
    .setIn(["accountPayableReport", "data"], action.data);
};

const getAccountPayableReportFailure = (state) => {
  return state.setIn(["accountPayableReport", "fetching"], false);
};

const getBalanceSheetReportRequest = (state) => {
  return state.setIn(["balanceSheetReport", "fetching"], true);
};

const getBalanceSheetReportSuccess = (state, action) => {
  return state
    .setIn(["balanceSheetReport", "fetching"], false)
    .setIn(["balanceSheetReport", "data"], action.data);
};

const getBalanceSheetReportFailure = (state) => {
  return state.setIn(["balanceSheetReport", "fetching"], false);
};

const getBankTransactionsRequest = (state) => {
  return state.setIn(["bankTransactions", "fetching"], true);
};

const getBankTransactionsSuccess = (state, action) => {
  return state
    .setIn(["bankTransactions", "fetching"], false)
    .setIn(["bankTransactions", "data"], action.data);
};

const getBankTransactionsFailure = (state) => {
  return state.setIn(["bankTransactions", "fetching"], false);
};

const resetBankTransactions = (state) => {
  return state
    .setIn(["bankTransactions", "fetching"], false)
    .setIn(["bankTransactions", "data"], null);
};

const getDocumentSuggestionsRequest = (state) => {
  return state.setIn(["documentSuggestions", "fetching"], true);
};

const getDocumentSuggestionsSuccess = (state, action) => {
  return state
    .setIn(["documentSuggestions", "fetching"], false)
    .setIn(["documentSuggestions", "data"], action.data);
};

const getDocumentSuggestionsFailure = (state) => {
  return state.setIn(["documentSuggestions", "fetching"], false);
};

const getAccountBalancesRequest = (state) => {
  return state.setIn(["accountBalances", "fetching"], true);
};

const getAccountBalancesSuccess = (state, action) => {
  return state
    .setIn(["accountBalances", "fetching"], false)
    .setIn(["accountBalances", "data"], action.data);
};

const getAccountBalancesFailure = (state) => {
  return state.setIn(["accountBalances", "fetching"], false);
};

const getJournalEntriesRequest = (state) => {
  return state.setIn(["journalEntries", "fetching"], true);
};

const getJournalEntriesSuccess = (state, action) => {
  return state
    .setIn(["journalEntries", "fetching"], false)
    .setIn(["journalEntries", "data"], action.data);
};

const getJournalEntriesFailure = (state) => {
  return state.setIn(["journalEntries", "fetching"], false);
};

const getJournalEntryLinesRequest = (state) => {
  return state.setIn(["journalEntryLines", "fetching"], true);
};

const getJournalEntryLinesSuccess = (state, action) => {
  return state
    .setIn(["journalEntryLines", "fetching"], false)
    .setIn(["journalEntryLines", "data"], action.data);
};

const getJournalEntryLinesFailure = (state) => {
  return state.setIn(["journalEntryLines", "fetching"], false);
};

const getReconciliationsRequest = (state) => {
  return state.setIn(["reconciliations", "fetching"], true);
};

const getReconciliationsSuccess = (state, action) => {
  return state
    .setIn(["reconciliations", "fetching"], false)
    .setIn(["reconciliations", "data"], action.data);
};

const getReconciliationsFailure = (state) => {
  return state.setIn(["reconciliations", "fetching"], false);
};

const setAccountantSelectionBankAccount = (state, action) => {
  return state.setIn(["accountantSelections", "bankAccount"], action.data);
};

export default createReducer(initialState, {
  [accountantActions.GET_PENDING_DOCUMENTS_REQUEST]: getPendingDocumentsRequest,
  [accountantActions.GET_PENDING_DOCUMENTS_SUCCESS]: getPendingDocumentsSuccess,
  [accountantActions.GET_PENDING_DOCUMENTS_FAILURE]: getPendingDocumentsFailure,

  [accountantActions.GET_GLOBAL_SEARCH_REQUEST]: getGlobalSearchRequest,
  [accountantActions.GET_GLOBAL_SEARCH_SUCCESS]: getGlobalSearchSuccess,
  [accountantActions.GET_GLOBAL_SEARCH_FAILURE]: getGlobalSearchFailure,

  [accountantActions.GET_JOURNAL_ENTRIES_REPORT_REQUEST]: getJournalEntriesReportRequest,
  [accountantActions.GET_JOURNAL_ENTRIES_REPORT_SUCCESS]: getJournalEntriesReportSuccess,
  [accountantActions.GET_JOURNAL_ENTRIES_REPORT_FAILURE]: getJournalEntriesReportFailure,

  [accountantActions.GET_GENERAL_LEDGER_REPORT_REQUEST]: getGeneralLedgerReportRequest,
  [accountantActions.GET_GENERAL_LEDGER_REPORT_SUCCESS]: getGeneralLedgerReportSuccess,
  [accountantActions.GET_GENERAL_LEDGER_REPORT_FAILURE]: getGeneralLedgerReportFailure,

  [accountantActions.GET_VAT_REPORT_REQUEST]: getVatReportRequest,
  [accountantActions.GET_VAT_REPORT_SUCCESS]: getVatReportSuccess,
  [accountantActions.GET_VAT_REPORT_FAILURE]: getVatReportFailure,

  [accountantActions.GET_INCOME_STATEMENT_REPORT_REQUEST]: getIncomeStatementReportRequest,
  [accountantActions.GET_INCOME_STATEMENT_REPORT_SUCCESS]: getIncomeStatementReportSuccess,
  [accountantActions.GET_INCOME_STATEMENT_REPORT_FAILURE]: getIncomeStatementReportFailure,

  [accountantActions.GET_TRIAL_BALANCE_REPORT_REQUEST]: getTrialBalanceReportRequest,
  [accountantActions.GET_TRIAL_BALANCE_REPORT_SUCCESS]: getTrialBalanceReportSuccess,
  [accountantActions.GET_TRIAL_BALANCE_REPORT_FAILURE]: getTrialBalanceReportFailure,

  [accountantActions.GET_ACCOUNT_RECEIVABLE_REPORT_REQUEST]: getAccountReceivableReportRequest,
  [accountantActions.GET_ACCOUNT_RECEIVABLE_REPORT_SUCCESS]: getAccountReceivableReportSuccess,
  [accountantActions.GET_ACCOUNT_RECEIVABLE_REPORT_FAILURE]: getAccountReceivableReportFailure,

  [accountantActions.GET_ACCOUNT_PAYABLE_REPORT_REQUEST]: getAccountPayableReportRequest,
  [accountantActions.GET_ACCOUNT_PAYABLE_REPORT_SUCCESS]: getAccountPayableReportSuccess,
  [accountantActions.GET_ACCOUNT_PAYABLE_REPORT_FAILURE]: getAccountPayableReportFailure,

  [accountantActions.GET_BALANCE_SHEET_REPORT_REQUEST]: getBalanceSheetReportRequest,
  [accountantActions.GET_BALANCE_SHEET_REPORT_SUCCESS]: getBalanceSheetReportSuccess,
  [accountantActions.GET_BALANCE_SHEET_REPORT_FAILURE]: getBalanceSheetReportFailure,

  [accountantActions.RESET_BANK_TRANSACTIONS]: resetBankTransactions,
  [accountantActions.GET_BANK_TRANSACTIONS_REQUEST]: getBankTransactionsRequest,
  [accountantActions.GET_BANK_TRANSACTIONS_SUCCESS]: getBankTransactionsSuccess,
  [accountantActions.GET_BANK_TRANSACTIONS_FAILURE]: getBankTransactionsFailure,

  [accountantActions.GET_DOCUMENT_SUGGESTIONS_REQUEST]: getDocumentSuggestionsRequest,
  [accountantActions.GET_DOCUMENT_SUGGESTIONS_SUCCESS]: getDocumentSuggestionsSuccess,
  [accountantActions.GET_DOCUMENT_SUGGESTIONS_FAILURE]: getDocumentSuggestionsFailure,

  [accountantActions.GET_ACCOUNT_BALANCES_REQUEST]: getAccountBalancesRequest,
  [accountantActions.GET_ACCOUNT_BALANCES_SUCCESS]: getAccountBalancesSuccess,
  [accountantActions.GET_ACCOUNT_BALANCES_FAILURE]: getAccountBalancesFailure,

  [accountantActions.GET_JOURNAL_ENTRIES_REQUEST]: getJournalEntriesRequest,
  [accountantActions.GET_JOURNAL_ENTRIES_SUCCESS]: getJournalEntriesSuccess,
  [accountantActions.GET_JOURNAL_ENTRIES_FAILURE]: getJournalEntriesFailure,

  [accountantActions.GET_JOURNAL_ENTRY_LINES_REQUEST]: getJournalEntryLinesRequest,
  [accountantActions.GET_JOURNAL_ENTRY_LINES_SUCCESS]: getJournalEntryLinesSuccess,
  [accountantActions.GET_JOURNAL_ENTRY_LINES_FAILURE]: getJournalEntryLinesFailure,

  [accountantActions.GET_RECONCILIATIONS_REQUEST]: getReconciliationsRequest,
  [accountantActions.GET_RECONCILIATIONS_SUCCESS]: getReconciliationsSuccess,
  [accountantActions.GET_RECONCILIATIONS_FAILURE]: getReconciliationsFailure,

  [accountantActions.SET_SELECTION_BANK_ACCOUNT]: setAccountantSelectionBankAccount,
});
