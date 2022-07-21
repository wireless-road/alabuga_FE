import BaseApi from "./baseApi";

class AccountantApi extends BaseApi {
  getPosts(query, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/posts/?expanded=${expanded}`;
    return super.execute(method, endpoint, null, true, query, true);
  }

  getPendingPostsOverview(query, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/posts/pending/?expanded=${expanded}`;
    return super.execute(method, endpoint, null, true, query, true);
  }

  getGlobalSearch(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/search/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  splitPdf(id, pages_range) {
    const method = this.Methods.GET;
    const endpoint = `/files/split/${id}?list_of_pages=${pages_range}&expanded=1`
    return super.execute(method, endpoint, null, true, null, false)
  }

  getJournalEntriesReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/base-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getGeneralLedgerReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/general-ledger-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getVatReport(query) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/vat-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, true);
  }

  getAccountReceivableReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/accounts-receivable-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getAccountPayableReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/accounts-payable-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getBalanceSheetReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/balance-sheet-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getTrialBalanceReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/citizens/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getIncomeStatementReport(query, isUsePaging) {
    const method = this.Methods.GET;
    const endpoint = "/journal-entries/income-statement-report/?expanded=1";
    return super.execute(method, endpoint, null, true, query, isUsePaging);
  }

  getBankTransactions(clientId, bankAccountId, expanded) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }

    if (bankAccountId) {
      query.push(`bank_account_id=${bankAccountId}`);
    }

    const endpoint = `/bank-transactions/?expanded=${expanded}&${query.join(
      "&"
    )}`;
    return super.execute(method, endpoint, null, true);
  }

  getDocumentSuggestions(query) {
    const method = this.Methods.GET;

    const endpoint = "/document-suggestions/";
    return super.execute(method, endpoint, null, true, query);
  }

  getAccountBalances(bankAccountId, query) {
    const method = this.Methods.GET;

    const endpoint = `/account-balances/${bankAccountId}`;
    return super.execute(method, endpoint, null, true, query);
  }

  createPayment(data) {
    const method = this.Methods.POST;

    const endpoint = "/payments/";
    return super.execute(method, endpoint, null, true, data);
  }

  createPaymentRequest(data) {
    const method = this.Methods.POST;

    const endpoint = "/payment-requests/";
    return super.execute(method, endpoint, null, true, data);
  }

  searchDocuments(bankTransactionId, partnerName) {
    const method = this.Methods.GET;

    const query = [];

    if (bankTransactionId) {
      query.push(`bank_transaction_id=${bankTransactionId}`);
    }

    if (partnerName) {
      query.push(`name=${partnerName}`);
    }

    const endpoint = `/documents-bank-suggestions/?${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getJournalEntries(query) {
    const method = this.Methods.GET;

    const endpoint = "/journal-entries/";
    return super.execute(method, endpoint, null, true, query);
  }

  createJournalEntry(data) {
    const method = this.Methods.POST;

    const endpoint = "/journal-entries/";
    return super.execute(method, endpoint, null, true, data);
  }

  getJournalEntryLines(query) {
    const method = this.Methods.GET;

    const endpoint = "/journal-entry-lines/";
    return super.execute(method, endpoint, null, true, query);
  }

  getReconciliations(query) {
    const method = this.Methods.GET;

    const endpoint = "/reconciliations/";
    return super.execute(method, endpoint, null, true, query);
  }

  createReconciliation(data) {
    const method = this.Methods.POST;

    const endpoint = "/reconciliations/";
    return super.execute(method, endpoint, null, true, data);
  }
}

export default new AccountantApi();
