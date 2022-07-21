const root = '/a'

const base = {
  LOGIN: root + '/login',
  FORGOT_PASSWORD: root + '/forgot-password',
  RESET_PASSWORD: root + '/reset-password',
  ADMIN: root +'/admin',
  ACCOUNTANT: root + '/accountant',
  CUSTOMER: root
}

const appendix = {
  DOCUMENTS: '/documents',
  MESSAGES: '/messages',
  REPORTS: '/reports',
  POSTS: '/posts',
  OVERVIEW: '/overview',
  GENERAL_LEDGER: '/general-ledger',
  RECONCILIATION: '/reconcile',
  BANK_RECONCILIATION: '/reconcile/bank',
  INTERNAL_RECONCILIATION: '/reconcile/internal',
  VAT: '/vat',
  JOURNAL_ENTRIES: '/journal-entries',
  INCOME_STATEMENT: '/income-statement',
  VALUE_ADDED_TAX_RETURN_REPORT: '/value-added-tax-return-report',
  BALANCE_STATEMENT: '/balance-sheet',
  ACCOUNTS_RECEIVABLE: '/accounts-receivable',
  TRIAL_BALANCE: '/trial-balance',
  ACCOUNTS_PAYABLE: '/balance-payable',
  NO_ACTIVE_CONTRACTS: '/no-active-contracts',
  INVOICE: '/invoices',
  ADD_INVOICE: '/new'
}

const routes = { ...appendix, ...base }

export default routes
