import { createSelector } from "reselect";

const clientReducer = (state) => state.get("clientReducer");

export const clientSelectors = {
  selectToken: createSelector(clientReducer, (state) => state.get("token")),
  selectIsLoggedOut: createSelector(clientReducer, (state) =>
    state.get("isLoggedOut")
  ),
  documentsUploading: createSelector(clientReducer, (state) =>
    state.getIn(["uploadDocuments", "fetching"])
  ),
  selectOverviewFetching: createSelector(clientReducer, (state) =>
    state.getIn(["overview", "fetching"])
  ),
  selectOverview: createSelector(clientReducer, (state) =>
    state.getIn(["overview", "data"])
  ),
  selectCurrencyFetching: createSelector(clientReducer, (state) =>
    state.getIn(["currency", "fetching"])
  ),
  selectCurrency: createSelector(clientReducer, (state) =>
    state.getIn(["currency", "data"])
  ),
  selectDocumentsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["documents", "fetching"])
  ),
  selectDocuments: createSelector(clientReducer, (state) =>
    state.getIn(["documents", "data"])
  ),
  selectPostsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["posts", "fetching"])
  ),
  selectPosts: createSelector(clientReducer, (state) =>
    state.getIn(["posts", "data"])
  ),
  selectPostDetailFetching: createSelector(clientReducer, (state) =>
    state.getIn(["postDetail", "fetching"])
  ),
  selectPostDetail: createSelector(clientReducer, (state) =>
    state.getIn(["postDetail", "data"])
  ),
  selectVouchersFetching: createSelector(clientReducer, (state) =>
    state.getIn(["vouchers", "fetching"])
  ),
  selectVouchers: createSelector(clientReducer, (state) =>
    state.getIn(["vouchers", "data"])
  ),
  selectVoucherFetching: createSelector(clientReducer, (state) =>
    state.getIn(["voucher", "fetching"])
  ),
  selectVoucher: createSelector(clientReducer, (state) =>
    state.getIn(["voucher", "data"])
  ),
  selectVoucherCategoriesFetching: createSelector(clientReducer, (state) =>
    state.getIn(["voucherCategories", "fetching"])
  ),
  selectVoucherCategories: createSelector(
    clientReducer,
    (state) => state.getIn(["voucherCategories", "data"]) || []
  ),
  selectKlippaDataFetching: createSelector(clientReducer, (state) =>
    state.getIn(["klippaData", "fetching"])
  ),
  selectKlippaData: createSelector(clientReducer, (state) =>
    state.getIn(["klippaData", "data"])
  ),
  selectQuestionTemplatesFetching: createSelector(clientReducer, (state) =>
    state.getIn(["questionTemplates", "fetching"])
  ),
  selectQuestionTemplates: createSelector(
    clientReducer,
    (state) => state.getIn(["questionTemplates", "data"]) || []
  ),
  selectAccountingQuestionsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["accountingQuestions", "fetching"])
  ),
  selectAccountingQuestions: createSelector(
    clientReducer,
    (state) => state.getIn(["accountingQuestions", "data"]) || []
  ),
  selectAccountingQuestionsInDocumentDetailFetching: createSelector(
    clientReducer,
    (state) => state.getIn(["accountingQuestionsInDocumentDetail", "fetching"])
  ),
  selectAccountingQuestionsInDocumentDetail: createSelector(
    clientReducer,
    (state) =>
      state.getIn(["accountingQuestionsInDocumentDetail", "data"]) || []
  ),
  selectBusinessPartnersFetching: createSelector(clientReducer, (state) =>
    state.getIn(["businessPartners", "fetching"])
  ),
  selectBusinessPartners: createSelector(
    clientReducer,
    (state) =>
      (state.getIn(["businessPartners", "data"]) || {}).business_partners
  ),
  selectBusinessPartnerPages: createSelector(
    clientReducer,
    (state) => (state.getIn(["businessPartners", "data"]) || {}).pages
  ),
  selectOrganizationsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["organizations", "fetching"])
  ),
  selectOrganizations: createSelector(
    clientReducer,
    (state) => (state.getIn(["organizations", "data"]) || {}).organizations
  ),
  selectBankAccountsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["bankAccounts", "fetching"])
  ),
  selectBankAccounts: createSelector(
    clientReducer,
    (state) => state.getIn(["bankAccounts", "data"]) || []
  ),
  selectProjectsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["projects", "fetching"])
  ),
  selectProjects: createSelector(
    clientReducer,
    (state) => state.getIn(["projects", "data"]) || []
  ),
  selectAssetsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["assets", "fetching"])
  ),
  selectAssets: createSelector(
    clientReducer,
    (state) => state.getIn(["assets", "data"]) || []
  ),
  selectIbanCalculationFetching: createSelector(clientReducer, (state) =>
    state.getIn(["ibanCalculation", "fetching"])
  ),
  selectIbanCalculation: createSelector(
    clientReducer,
    (state) => state.getIn(["ibanCalculation", "data"]) || []
  ),
  selectIbanValidationFetching: createSelector(clientReducer, (state) =>
    state.getIn(["ibanValidation", "fetching"])
  ),
  selectIbanValidation: createSelector(
    clientReducer,
    (state) => state.getIn(["ibanValidation", "data"]) || []
  ),
  selectTaxCodesFetching: createSelector(clientReducer, (state) =>
    state.getIn(["taxCodes", "fetching"])
  ),
  selectTaxCodes: createSelector(
    clientReducer,
    (state) => (state.getIn(["taxCodes", "data"]) || {}).tax_codes
  ),
  selectAccountingAccountsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["accountingAccounts", "fetching"])
  ),
  selectAccountingAccounts: createSelector(
    clientReducer,
    (state) =>
      (state.getIn(["accountingAccounts", "data"]) || {}).accounting_accounts
  ),
  selectJournalEntriesRawFetching: createSelector(clientReducer, (state) =>
    state.getIn(["journalEntriesRaw", "fetching"])
  ),
  selectJournalEntriesRaw: createSelector(
    clientReducer,
    (state) => state.getIn(["journalEntriesRaw", "data"]) || {}
  ),
  selectTotalPendingDocumentsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["countPendingDocuments", "fetching"])
  ),
  selectTotalPendingDocuments: createSelector(clientReducer, (state) =>
    state.getIn(["countPendingDocuments", "total"])
  ),
  selectOrganizationFetching: createSelector(clientReducer, (state) =>
    state.getIn(["organization", "fetching"])
  ),
  selectOrganization: createSelector(clientReducer, (state) =>
    state.getIn(["organization", "data"])
  ),
  selectLabelsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["labels", "fetching"])
  ),
  selectLabels: createSelector(clientReducer, (state) =>
    state.getIn(["labels", "data"])
  ),
  selectCategories: createSelector(clientReducer, (state) =>
    state.getIn(["categories", "data"])
  ),
  selectCategoriesFetching: createSelector(clientReducer, (state) =>
    state.getIn(["categories", "fetching"])
  ),
  selectCategoriesLv1: createSelector(clientReducer, (state) =>
    state.getIn(["categoriesLv1", "data"])
  ),
  selectCategoriesLv1Fetching: createSelector(clientReducer, (state) =>
    state.getIn(["categoriesLv1", "fetching"])
  ),
  selectUnits: createSelector(
    clientReducer,
    (state) => (state.getIn(["units", "data"]) || {}).units
  ),
  selectUnitsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["units", "fetching"])
  ),
  selectItems: createSelector(
    clientReducer,
    (state) => state.getIn(["items", "data"]) || []
  ),
  selectItemsFetching: createSelector(clientReducer, (state) =>
    state.getIn(["items", "fetching"])
  ),
};
