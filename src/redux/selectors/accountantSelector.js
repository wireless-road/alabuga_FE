import { createSelector } from "reselect";

const accountantReducer = (state) => state.get("accountantReducer");

export const accountantSelectors = {
  selectPendingDocumentsFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["pendingDocuments", "fetching"])
  ),
  selectPendingDocuments: createSelector(accountantReducer, (state) =>
    state.getIn(["pendingDocuments", "data"])
  ),

  selectGlobalSearchFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["globalSearch", "fetching"])
  ),
  selectGlobalSearch: createSelector(accountantReducer, (state) =>
    state.getIn(["globalSearch", "data"])
  ),

  selectJournalEntriesReportFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["journalEntriesReport", "fetching"])
  ),
  selectJournalEntriesReport: createSelector(accountantReducer, (state) =>
    state.getIn(["journalEntriesReport", "data"])
  ),

  selectGeneralLedgerReportFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["generalLedgerReport", "fetching"])
  ),
  selectGeneralLedgerReport: createSelector(accountantReducer, (state) =>
    state.getIn(["generalLedgerReport", "data"])
  ),

  selectVatReportFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["vatReport", "fetching"])
  ),
  selectVatReport: createSelector(accountantReducer, (state) =>
    state.getIn(["vatReport", "data"])
  ),

  selectIncomeStatementReportFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["incomeStatementReport", "fetching"])
  ),
  selectIncomeStatementReport: createSelector(accountantReducer, (state) =>
    state.getIn(["incomeStatementReport", "data"])
  ),

  selectTrialBalanceReportFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["trialBalanceReport", "fetching"])
  ),
  selectTrialBalanceReport: createSelector(accountantReducer, (state) =>
    state.getIn(["trialBalanceReport", "data"])
  ),

  selectAccountReceivableReportFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["accountReceivableReport", "fetching"])
  ),
  selectAccountReceivableReport: createSelector(accountantReducer, (state) =>
    state.getIn(["accountReceivableReport", "data"])
  ),

  selectAccountPayableReportFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["accountPayableReport", "fetching"])
  ),
  selectAccountPayableReport: createSelector(accountantReducer, (state) =>
    state.getIn(["accountPayableReport", "data"])
  ),

  selectBalanceSheetReportFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["balanceSheetReport", "fetching"])
  ),
  selectBalanceSheetReport: createSelector(accountantReducer, (state) =>
    state.getIn(["balanceSheetReport", "data"])
  ),
  selectBankTransactionsFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["bankTransactions", "fetching"])
  ),
  selectBankTransactions: createSelector(
    accountantReducer,
    (state) => state.getIn(["bankTransactions", "data"]) || []
  ),
  selectDocumentSuggestionsFetching: createSelector(
    accountantReducer,
    (state) => state.getIn(["documentSuggestions", "fetching"])
  ),
  selectDocumentSuggestions: createSelector(
    accountantReducer,
    (state) => state.getIn(["documentSuggestions", "data"]) || []
  ),
  selectAccountBalancesFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["accountBalances", "fetching"])
  ),
  selectAccountBalances: createSelector(
    accountantReducer,
    (state) => state.getIn(["accountBalances", "data"]) || {}
  ),
  selectJournalEntriesFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["journalEntries", "fetching"])
  ),
  selectJournalEntries: createSelector(accountantReducer, (state) =>
    state.getIn(["journalEntries", "data"])
  ),
  selectJournalEntryLinesFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["journalEntryLines", "fetching"])
  ),
  selectJournalEntryLines: createSelector(accountantReducer, (state) =>
    state.getIn(["journalEntryLines", "data"])
  ),
  selectReconciliationsFetching: createSelector(accountantReducer, (state) =>
    state.getIn(["reconciliations", "fetching"])
  ),
  selectReconciliations: createSelector(accountantReducer, (state) =>
    state.getIn(["reconciliations", "data"])
  ),
  selectAccountantSelectedBankAccount: createSelector(
    accountantReducer,
    (state) => state.getIn(["accountantSelections", "bankAccount"])
  ),
};
