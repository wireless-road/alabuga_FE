import { accountantService } from "../../services";
import { detectLanguage } from "../../utils/common";
import * as accountantActionTypes from "../constants/accountantActions";
import { appSelectors } from "../selectors/appSelector";
import { showErrorNotification } from "./appActions";
import { GET_JOURNAL_ENTRY_LINES_REQUEST, SPLIT_PDF_REQUEST } from '../constants/accountantActions'

export function getPendingDocuments(ids, useLoadingState = true, expanded = 1) {
  return async (dispatch) => {
    try {
      useLoadingState &&
        dispatch({ type: accountantActionTypes.GET_PENDING_DOCUMENTS_REQUEST });
      // new way to get list of pending documents. Fast.
      const idss = ids.join(",");
      const query = {
        client_account_ids: idss,
      };
      const data_new = await accountantService.getPendingPostsOverview(
        query,
        expanded
      );
      const data = data_new?.data.res;
      dispatch({
        type: accountantActionTypes.GET_PENDING_DOCUMENTS_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_PENDING_DOCUMENTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getGlobalSearch(query) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_GLOBAL_SEARCH_REQUEST });
      const lang = detectLanguage();

      const { data } = await accountantService.getGlobalSearch({
        ...query,
        lang,
      });

      dispatch({ type: accountantActionTypes.GET_GLOBAL_SEARCH_SUCCESS, data });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_GLOBAL_SEARCH_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function splitPdf(id, pages_range) {
  return async dispatch => {
    try {
      dispatch({ type: accountantActionTypes.SPLIT_PDF_REQUEST })
      // const lang = detectLanguage()

      const { data } = await accountantService.splitPdf(id, pages_range)

      dispatch({ type: accountantActionTypes.SPLIT_PDF_SUCCESS, data })
    } catch (error) {
      dispatch({ type: accountantActionTypes.SPLIT_PDF_FAILURE })
      dispatch(showErrorNotification(error))
    }
  }
}

export function getJournalEntriesReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_JOURNAL_ENTRIES_REPORT_REQUEST,
      });
      const lang = detectLanguage();

      const { data } = await accountantService.getJournalEntriesReport({
        ...query,
        lang,
      });

      dispatch({
        type: accountantActionTypes.GET_JOURNAL_ENTRIES_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_JOURNAL_ENTRIES_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getGeneralLedgerReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_GENERAL_LEDGER_REPORT_REQUEST,
      });
      const lang = detectLanguage();

      const { data } = await accountantService.getGeneralLedgerReport({
        ...query,
        lang,
      });

      dispatch({
        type: accountantActionTypes.GET_GENERAL_LEDGER_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_GENERAL_LEDGER_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getVatReport(query) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_VAT_REPORT_REQUEST });
      const lang = detectLanguage();

      const { data } = await accountantService.getVatReport({ ...query, lang });
      dispatch({ type: accountantActionTypes.GET_VAT_REPORT_SUCCESS, data });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_VAT_REPORT_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getIncomeStatementReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_INCOME_STATEMENT_REPORT_REQUEST,
      });
      const lang = detectLanguage();

      const { data } = await accountantService.getIncomeStatementReport({
        ...query,
        lang,
      });

      dispatch({
        type: accountantActionTypes.GET_INCOME_STATEMENT_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_INCOME_STATEMENT_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getTrialBalanceReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_TRIAL_BALANCE_REPORT_REQUEST,
      });
      const lang = detectLanguage();

      const { data } = await accountantService.getTrialBalanceReport({
        ...query,
        lang,
      });

      dispatch({
        type: accountantActionTypes.GET_TRIAL_BALANCE_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_TRIAL_BALANCE_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAccountReceivableReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_RECEIVABLE_REPORT_REQUEST,
      });

      const { data } = await accountantService.getAccountReceivableReport(
        query
      );

      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_RECEIVABLE_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_RECEIVABLE_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAccountPayableReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_PAYABLE_REPORT_REQUEST,
      });

      const { data } = await accountantService.getAccountPayableReport(query);

      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_PAYABLE_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_PAYABLE_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getBalanceSheetReport(query) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_BALANCE_SHEET_REPORT_REQUEST,
      });

      const { data } = await accountantService.getBalanceSheetReport(query);

      dispatch({
        type: accountantActionTypes.GET_BALANCE_SHEET_REPORT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_BALANCE_SHEET_REPORT_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getBankTransactions(clientId, bankAccountId, expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_BANK_TRANSACTIONS_REQUEST });

      const { data } = await accountantService.getBankTransactions(
        clientId,
        bankAccountId,
        expanded
      );

      dispatch({
        type: accountantActionTypes.GET_BANK_TRANSACTIONS_SUCCESS,
        data: data.bank_transactions,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_BANK_TRANSACTIONS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function resetBankTransactions() {
  return async (dispatch) => {
    dispatch({ type: accountantActionTypes.RESET_BANK_TRANSACTIONS });
  };
}

export function getDocumentSuggestions(
  bankTransactionId,
  docType,
  currency,
  exchange_rate,
  expanded = 1
) {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_REQUEST,
      });
      const client_account_id = appSelectors.selectCurrentContract(getState())
        .client_account_id;
      const query = {
        bank_transaction_id: bankTransactionId,
        document_type: docType,
        currency,
        exchange_rate,
        client_account_id,
        expanded,
      };
      const { data } = await accountantService.getDocumentSuggestions(query);

      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createPayment(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_REQUEST });

      await accountantService.createPayment(body);

      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_SUCCESS });

      callback && callback(true);
    } catch (error) {
      callback && callback();
      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createPaymentRequest(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_REQUEST_REQUEST });

      await accountantService.createPaymentRequest(body);

      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_REQUEST_SUCCESS });

      callback && callback(true);
    } catch (error) {
      callback && callback();
      dispatch({ type: accountantActionTypes.CREATE_PAYMENT_REQUEST_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAccountBalances(bankAccountId, fromDate, toDate) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_ACCOUNT_BALANCES_REQUEST });

      const query = {
        date: fromDate || "2000-01-01",
        to_date: toDate || new Date().toISOString().substring(0, 10),
      };
      const res = await accountantService.getAccountBalances(
        bankAccountId,
        query
      );

      const data = {};
      res.data.account_balances.forEach((r) => {
        data[r.date] = {
          currency: res.data.currency,
          bank_account_id: res.data.bank_account_id,
          ...r,
        };
      });

      dispatch({
        type: accountantActionTypes.GET_ACCOUNT_BALANCES_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_ACCOUNT_BALANCES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function searchDocuments(bankTransactionId, partnerName) {
  return async (dispatch) => {
    try {
      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_REQUEST,
      });

      const { data } = await accountantService.searchDocuments(
        bankTransactionId,
        partnerName
      );

      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: accountantActionTypes.GET_DOCUMENT_SUGGESTIONS_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getJournalEntries(
  bankAccountId,
  accountCode,
  fromDate,
  toDate
) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_JOURNAL_ENTRIES_REQUEST });

      const query = {
        bank_account_id: bankAccountId,
        account_code: accountCode,
        date: fromDate || "2000-01-01",
        to_date: toDate || new Date().toISOString().substring(0, 10),
      };
      const res = await accountantService.getJournalEntries(query);

      const data = {};
      res.data.journal_entries.forEach((r) => {
        if (!data[r.posting_date]) data[r.posting_date] = [];

        data[r.posting_date].push({
          ...r,
        });
      });

      dispatch({
        type: accountantActionTypes.GET_JOURNAL_ENTRIES_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_JOURNAL_ENTRIES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createJournalEntry(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.CREATE_JOURNAL_ENTRY_REQUEST });

      const data = await accountantService.createJournalEntry(body);

      dispatch({ type: accountantActionTypes.CREATE_JOURNAL_ENTRY_SUCCESS });

      callback && callback(data.data);
    } catch (error) {
      callback && callback();
      dispatch({ type: accountantActionTypes.CREATE_JOURNAL_ENTRY_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getJournalEntryLines(query) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_JOURNAL_ENTRY_LINES_REQUEST });

      const res = await accountantService.getJournalEntryLines(query);

      dispatch({
        type: accountantActionTypes.GET_JOURNAL_ENTRY_LINES_SUCCESS,
        data: (res.data || {}).journal_entry_lines,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_JOURNAL_ENTRY_LINES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getReconciliations(query) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.GET_RECONCILIATIONS_REQUEST });

      const data = await accountantService.getReconciliations(query);

      dispatch({
        type: accountantActionTypes.GET_RECONCILIATIONS_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({ type: accountantActionTypes.GET_RECONCILIATIONS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createReconciliation(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: accountantActionTypes.CREATE_RECONCILIATION_REQUEST });

      const res = await accountantService.createReconciliation(body);

      dispatch({ type: accountantActionTypes.CREATE_RECONCILIATION_SUCCESS });

      callback && callback((res || {}).data);
    } catch (error) {
      callback && callback();
      dispatch({ type: accountantActionTypes.CREATE_RECONCILIATION_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function setAccountantSelectionBankAccount(data) {
  return async (dispatch) => {
    dispatch({ type: accountantActionTypes.SET_SELECTION_BANK_ACCOUNT, data });
  };
}
