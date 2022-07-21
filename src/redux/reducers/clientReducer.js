import { fromJS } from "immutable";

import { createReducer } from "../../utils/reduxHelpers";
import * as clientActions from "../constants/clientActions";

const initialState = fromJS({
  token: null,
  isLoggedOut: false,
  user: {
    fetching: false,
    data: null,
  },
  uploadDocuments: {
    fetching: false,
  },
  overview: {
    fetching: false,
    data: null,
  },
  documents: {
    fetching: false,
    data: null,
  },
  posts: {
    fetching: false,
    data: null,
  },
  postDetail: {
    fetching: false,
    data: null,
  },
  vouchers: {
    fetching: false,
    data: null,
  },
  voucher: {
    fetching: false,
    data: null,
  },
  voucherCategories: {
    fetching: false,
    data: null,
  },
  klippaData: {
    fetching: false,
    data: null,
  },
  questionTemplates: {
    fetching: false,
    data: null,
  },
  accountingQuestions: {
    fetching: false,
    data: null,
  },
  accountingQuestionsInDocumentDetail: {
    fetching: false,
    data: null,
  },
  answerAccountingQuestion: {
    fetching: false,
    successed: false,
  },
  organizations: {
    fetching: false,
    data: null,
  },
  businessPartners: {
    fetching: false,
    data: null,
  },
  bankAccounts: {
    fetching: false,
    data: null,
  },
  projects: {
    fetching: false,
    data: null,
  },
  assets: {
    fetching: false,
    data: null,
  },
  ibanCalculation: {
    fetching: false,
    data: null,
  },
  ibanValidation: {
    fetching: false,
    data: null,
  },
  accountingAccounts: {
    fetching: false,
    data: null,
  },
  taxCodes: {
    fetching: false,
    data: null,
  },
  countPendingDocuments: {
    fetching: false,
    total: 0,
  },
  organization: {
    fetching: false,
    data: null,
  },
  labels: {
    fetching: false,
    data: null,
  },
});

const loginSuccess = (state, action) => {
  return state.set("token", action.token);
};

const logoutSuccess = (state) => {
  return state.set("isLoggedOut", true);
};

const getUserRequest = (state) => {
  return state.setIn(["user", "fetching"], true);
};

const getUserSuccess = (state, action) => {
  return state
    .setIn(["user", "fetching"], false)
    .setIn(["user", "data"], action.data);
};

const getUserFailure = (state) => {
  return state.setIn(["user", "fetching"], false);
};

const uploadDocumentsRequest = (state) => {
  return state.setIn(["uploadDocuments", "fetching"], true);
};

const uploadDocumentsSuccess = (state) => {
  return state.setIn(["uploadDocuments", "fetching"], false);
};

const uploadDocumentsFailure = (state) => {
  return state.setIn(["uploadDocuments", "fetching"], false);
};

const getOverviewRequest = (state) => {
  return state.setIn(["overview", "fetching"], true);
};

const getOverviewSuccess = (state, action) => {
  return state
    .setIn(["overview", "fetching"], false)
    .setIn(["overview", "data"], action.data);
};

const getOverviewFailure = (state) => {
  return state.setIn(["overview", "fetching"], false);
};

const getCurrencyRequest = (state) => {
  return state.setIn(["currency", "fetching"], true);
};

const getCurrencySuccess = (state, action) => {
  return state
    .setIn(["currency", "fetching"], false)
    .setIn(["currency", "data"], action.data);
};

const getCurrencyFailure = (state) => {
  return state.setIn(["currency", "fetching"], false);
};

const getDocumentsRequest = (state) => {
  return state.setIn(["documents", "fetching"], true);
};

const getDocumentsSuccess = (state, action) => {
  return state
    .setIn(["documents", "fetching"], false)
    .setIn(["documents", "data"], action.data);
};

const getDocumentsFailure = (state) => {
  return state.setIn(["documents", "fetching"], false);
};

const getPostsRequest = (state) => {
  return state.setIn(["posts", "fetching"], true);
};

const getPostsSuccess = (state, action) => {
  return state
    .setIn(["posts", "fetching"], false)
    .setIn(["posts", "data"], action.data);
};

const getPostsFailure = (state) => {
  return state.setIn(["posts", "fetching"], false);
};

const getPostDetailRequest = (state) => {
  return state.setIn(["postDetail", "fetching"], true);
};

const getPostDetailSuccess = (state, action) => {
  return state
    .setIn(["postDetail", "fetching"], false)
    .setIn(["postDetail", "data"], action.data);
};

const getPostDetailFailure = (state) => {
  return state.setIn(["postDetail", "fetching"], false);
};

const getVouchersRequest = (state) => {
  return state.setIn(["vouchers", "fetching"], true);
};

const getVouchersSuccess = (state, action) => {
  return state
    .setIn(["vouchers", "fetching"], false)
    .setIn(["vouchers", "data"], action.data);
};

const getVouchersFailure = (state) => {
  return state.setIn(["vouchers", "fetching"], false);
};

const getVoucherRequest = (state) => {
  return state.setIn(["voucher", "fetching"], true);
};

const getVoucherSuccess = (state, action) => {
  return state
    .setIn(["voucher", "fetching"], false)
    .setIn(["voucher", "data"], action.data);
};

const getVoucherFailure = (state) => {
  return state.setIn(["voucher", "fetching"], false);
};

const getVoucherCategoriesRequest = (state) => {
  return state.setIn(["voucherCategories", "fetching"], true);
};

const getVoucherCategoriesSuccess = (state, action) => {
  return state
    .setIn(["voucherCategories", "fetching"], false)
    .setIn(["voucherCategories", "data"], action.data);
};

const getVoucherCategoriesFailure = (state) => {
  return state.setIn(["voucherCategories", "fetching"], false);
};

const getKlippaDataRequest = (state) => {
  return state.setIn(["klippaData", "fetching"], true);
};

const getKlippaDataSuccess = (state, action) => {
  return state
    .setIn(["klippaData", "fetching"], false)
    .setIn(["klippaData", "data"], action.data);
};

const getKlippaDataFailure = (state) => {
  return state.setIn(["klippaData", "fetching"], false);
};

const getQuestionTemplatesRequest = (state) => {
  return state.setIn(["questionTemplates", "fetching"], true);
};

const getQuestionTemplatesSuccess = (state, action) => {
  return state
    .setIn(["questionTemplates", "fetching"], false)
    .setIn(["questionTemplates", "data"], action.data);
};

const getQuestionTemplatesFailure = (state) => {
  return state.setIn(["questionTemplates", "fetching"], false);
};

const getAccountingQuestionsRequest = (state) => {
  return state.setIn(["accountingQuestions", "fetching"], true);
};

const getAccountingQuestionsSuccess = (state, action) => {
  return state
    .setIn(["accountingQuestions", "fetching"], false)
    .setIn(["accountingQuestions", "data"], action.data);
};

const getAccountingQuestionsFailure = (state) => {
  return state.setIn(["accountingQuestions", "fetching"], false);
};

const getAccountingQuestionsInDocumentDetailRequest = (state) => {
  return state.setIn(["accountingQuestionsInDocumentDetail", "fetching"], true);
};

const getAccountingQuestionsInDocumentDetailSuccess = (state, action) => {
  return state
    .setIn(["accountingQuestionsInDocumentDetail", "fetching"], false)
    .setIn(["accountingQuestionsInDocumentDetail", "data"], action.data);
};

const getAccountingQuestionsInDocumentDetailFailure = (state) => {
  return state.setIn(
    ["accountingQuestionsInDocumentDetail", "fetching"],
    false
  );
};

const answerAccountingQuestionRequest = (state) => {
  return state
    .setIn(["answerAccountingQuestion", "fetching"], true)
    .setIn(["answerAccountingQuestion", "successed"], false);
};

const answerAccountingQuestionSuccess = (state) => {
  return state
    .setIn(["answerAccountingQuestion", "fetching"], false)
    .setIn(["answerAccountingQuestion", "successed"], true);
};

const answerAccountingQuestionFailure = (state) => {
  return state
    .setIn(["answerAccountingQuestion", "fetching"], false)
    .setIn(["answerAccountingQuestion", "successed"], false);
};

const getBusinessPartnersRequest = (state) => {
  return state.setIn(["businessPartners", "fetching"], true);
};

const getBusinessPartnersSuccess = (state, action) => {
  return state
    .setIn(["businessPartners", "fetching"], false)
    .setIn(["businessPartners", "data"], action.data);
};

const getBusinessPartnersFailure = (state) => {
  return state.setIn(["businessPartners", "fetching"], false);
};

const getOrganizationsRequest = (state) => {
  return state.setIn(["organizations", "fetching"], true);
};

const getOrganizationsSuccess = (state, action) => {
  return state
    .setIn(["organizations", "fetching"], false)
    .setIn(["organizations", "data"], action.data);
};

const getOrganizationsFailure = (state) => {
  return state.setIn(["organizations", "fetching"], false);
};

const getBankAccountsRequest = (state) => {
  return state.setIn(["bankAccounts", "fetching"], true);
};

const getBankAccountsSuccess = (state, action) => {
  return state
    .setIn(["bankAccounts", "fetching"], false)
    .setIn(["bankAccounts", "data"], action.data);
};

const getBankAccountsFailure = (state) => {
  return state.setIn(["bankAccounts", "fetching"], false);
};

const getProjectsRequest = (state) => {
  return state.setIn(["projects", "fetching"], true);
};

const getProjectsSuccess = (state, action) => {
  return state
    .setIn(["projects", "fetching"], false)
    .setIn(["projects", "data"], action.data);
};

const getProjectsFailure = (state) => {
  return state.setIn(["projects", "fetching"], false);
};

const getAssetsRequest = (state) => {
  return state.setIn(["assets", "fetching"], true);
};

const getAssetsSuccess = (state, action) => {
  return state
    .setIn(["assets", "fetching"], false)
    .setIn(["assets", "data"], action.data);
};

const getAssetsFailure = (state) => {
  return state.setIn(["assets", "fetching"], false);
};

const getTaxCodesRequest = (state) => {
  return state.setIn(["taxCodes", "fetching"], true);
};

const getIbanCalculationRequest = (state) => {
  return state.setIn(["ibanCalculation", "fetching"], true);
};

const getIbanCalculationSuccess = (state, action) => {
  return state
    .setIn(["ibanCalculation", "fetching"], false)
    .setIn(["ibanCalculation", "data"], action.data);
};

const getIbanCalculationFailure = (state) => {
  return state.setIn(["ibanCalculation", "fetching"], false);
};

const getIbanValidationRequest = (state) => {
  return state.setIn(["ibanValidation", "fetching"], true);
};

const getIbanValidationSuccess = (state, action) => {
  return state
    .setIn(["ibanValidation", "fetching"], false)
    .setIn(["ibanValidation", "data"], action.data);
};

const getIbanValidationFailure = (state) => {
  return state.setIn(["ibanValidation", "fetching"], false);
};

const getTaxCodesSuccess = (state, action) => {
  return state
    .setIn(["taxCodes", "fetching"], false)
    .setIn(["taxCodes", "data"], action.data);
};

const getTaxCodesFailure = (state) => {
  return state.setIn(["taxCodes", "fetching"], false);
};

const getAccountingAccountsRequest = (state) => {
  return state.setIn(["accountingAccounts", "fetching"], true);
};

const getAccountingAccountsSuccess = (state, action) => {
  return state
    .setIn(["accountingAccounts", "fetching"], false)
    .setIn(["accountingAccounts", "data"], action.data);
};

const getAccountingAccountsFailure = (state) => {
  return state.setIn(["accountingAccounts", "fetching"], false);
};

const getJournalEntriesRawRequest = (state) => {
  return state.setIn(["journalEntriesRaw", "fetching"], true);
};

const getJournalEntriesRawSuccess = (state, action) => {
  return state
    .setIn(["journalEntriesRaw", "fetching"], false)
    .setIn(["journalEntriesRaw", "data"], action.data);
};

const getJournalEntriesRawFailure = (state) => {
  return state.setIn(["journalEntriesRaw", "fetching"], false);
};

const countPendingDocumentsRequest = (state) => {
  return state.setIn(["countPendingDocuments", "fetching"], true);
};

const countPendingDocumentsSuccess = (state, action) => {
  return state
    .setIn(["countPendingDocuments", "fetching"], false)
    .setIn(["countPendingDocuments", "total"], action.total);
};

const countPendingDocumentsFailure = (state) => {
  return state.setIn(["countPendingDocuments", "fetching"], false);
};

const getOrganizationRequest = (state) => {
  return state.setIn(["countPendingDocuments", "fetching"], true);
};

const getOrganizationSuccess = (state, action) => {
  return state
    .setIn(["organization", "fetching"], false)
    .setIn(["organization", "data"], action.data);
};

const getOrganizationFailure = (state) => {
  return state.setIn(["organization", "fetching"], false);
};

const getLabelsRequest = (state) => {
  return state.setIn(["labels", "fetching"], true);
};

const getLabelsSuccess = (state, action) => {
  return state
    .setIn(["labels", "fetching"], false)
    .setIn(["labels", "data"], action.data);
};

const getLabelsFailure = (state) => {
  return state.setIn(["labels", "fetching"], false);
};

const getCategoriesRequest = (state) => {
  return state.setIn(["categories", "fetching"], true);
};

const getCategoriesSuccess = (state, action) => {
  return state
    .setIn(["categories", "fetching"], false)
    .setIn(["categories", "data"], action.data);
};

const getCategoriesFailure = (state) => {
  return state.setIn(["categories", "fetching"], false);
};

const getCategoriesLv1Request = (state) => {
  return state.setIn(["categoriesLv1", "fetching"], true);
};

const getCategoriesLv1Success = (state, action) => {
  return state
    .setIn(["categoriesLv1", "fetching"], false)
    .setIn(["categoriesLv1", "data"], action.data);
};

const getCategoriesLv1Failure = (state) => {
  return state.setIn(["categoriesLv1", "fetching"], false);
};

const getUnitsRequest = (state) => {
  return state.setIn(["units", "fetching"], true);
};

const getUnitsSuccess = (state, action) => {
  return state
    .setIn(["units", "fetching"], false)
    .setIn(["units", "data"], action.data);
};

const getUnitsFailure = (state) => {
  return state.setIn(["units", "fetching"], false);
};

const getItemsRequest = (state) => {
  return state.setIn(["items", "fetching"], true);
};

const getItemsSuccess = (state, action) => {
  return state
    .setIn(["items", "fetching"], false)
    .setIn(["items", "data"], action.data);
};

const getItemsFailure = (state) => {
  return state.setIn(["items", "fetching"], false);
};

export default createReducer(initialState, {
  [clientActions.LOGIN_SUCCESS]: loginSuccess,
  [clientActions.LOGOUT_SUCCESS]: logoutSuccess,
  [clientActions.GET_USER_REQUEST]: getUserRequest,
  [clientActions.GET_USER_SUCCESS]: getUserSuccess,
  [clientActions.GET_USER_FAILURE]: getUserFailure,
  [clientActions.UPLOAD_DOCUMENTS_REQUEST]: uploadDocumentsRequest,
  [clientActions.UPLOAD_DOCUMENTS_SUCCESS]: uploadDocumentsSuccess,
  [clientActions.UPLOAD_DOCUMENTS_FAILURE]: uploadDocumentsFailure,
  [clientActions.GET_OVERVIEW_REQUEST]: getOverviewRequest,
  [clientActions.GET_OVERVIEW_SUCCESS]: getOverviewSuccess,
  [clientActions.GET_OVERVIEW_FAILURE]: getOverviewFailure,
  [clientActions.GET_CURRENCY_REQUEST]: getCurrencyRequest,
  [clientActions.GET_CURRENCY_SUCCESS]: getCurrencySuccess,
  [clientActions.GET_CURRENCY_FAILURE]: getCurrencyFailure,
  [clientActions.GET_DOCUMENTS_REQUEST]: getDocumentsRequest,
  [clientActions.GET_DOCUMENTS_SUCCESS]: getDocumentsSuccess,
  [clientActions.GET_DOCUMENTS_FAILURE]: getDocumentsFailure,
  [clientActions.GET_POSTS_REQUEST]: getPostsRequest,
  [clientActions.GET_POSTS_SUCCESS]: getPostsSuccess,
  [clientActions.GET_POSTS_FAILURE]: getPostsFailure,
  [clientActions.GET_POST_DETAIL_REQUEST]: getPostDetailRequest,
  [clientActions.GET_POST_DETAIL_SUCCESS]: getPostDetailSuccess,
  [clientActions.GET_POST_DETAIL_FAILURE]: getPostDetailFailure,
  [clientActions.GET_VOUCHERS_REQUEST]: getVouchersRequest,
  [clientActions.GET_VOUCHERS_SUCCESS]: getVouchersSuccess,
  [clientActions.GET_VOUCHERS_FAILURE]: getVouchersFailure,
  [clientActions.GET_VOUCHER_REQUEST]: getVoucherRequest,
  [clientActions.GET_VOUCHER_SUCCESS]: getVoucherSuccess,
  [clientActions.GET_VOUCHER_FAILURE]: getVoucherFailure,

  [clientActions.GET_VOUCHER_CATEGORIES_REQUEST]: getVoucherCategoriesRequest,
  [clientActions.GET_VOUCHER_CATEGORIES_SUCCESS]: getVoucherCategoriesSuccess,
  [clientActions.GET_VOUCHER_CATEGORIES_FAILURE]: getVoucherCategoriesFailure,

  [clientActions.GET_KLIPPA_DATA_REQUEST]: getKlippaDataRequest,
  [clientActions.GET_KLIPPA_DATA_SUCCESS]: getKlippaDataSuccess,
  [clientActions.GET_KLIPPA_DATA_FAILURE]: getKlippaDataFailure,
  [clientActions.GET_QUESTION_TEMPLATES_REQUEST]: getQuestionTemplatesRequest,
  [clientActions.GET_QUESTION_TEMPLATES_SUCCESS]: getQuestionTemplatesSuccess,
  [clientActions.GET_QUESTION_TEMPLATES_FAILURE]: getQuestionTemplatesFailure,
  [clientActions.GET_ACCOUNTING_QUESTIONS_REQUEST]: getAccountingQuestionsRequest,
  [clientActions.GET_ACCOUNTING_QUESTIONS_SUCCESS]: getAccountingQuestionsSuccess,
  [clientActions.GET_ACCOUNTING_QUESTIONS_FAILURE]: getAccountingQuestionsFailure,

  [clientActions.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_REQUEST]: getAccountingQuestionsInDocumentDetailRequest,
  [clientActions.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_SUCCESS]: getAccountingQuestionsInDocumentDetailSuccess,
  [clientActions.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_FAILURE]: getAccountingQuestionsInDocumentDetailFailure,

  [clientActions.ANSWER_ACCOUNTING_QUESTION_REQUEST]: answerAccountingQuestionRequest,
  [clientActions.ANSWER_ACCOUNTING_QUESTION_SUCCESS]: answerAccountingQuestionSuccess,
  [clientActions.ANSWER_ACCOUNTING_QUESTION_FAILURE]: answerAccountingQuestionFailure,

  [clientActions.GET_BUSINESS_PARTNERS_REQUEST]: getBusinessPartnersRequest,
  [clientActions.GET_BUSINESS_PARTNERS_SUCCESS]: getBusinessPartnersSuccess,
  [clientActions.GET_BUSINESS_PARTNERS_FAILURE]: getBusinessPartnersFailure,

  [clientActions.GET_PROJECTS_REQUEST]: getProjectsRequest,
  [clientActions.GET_PROJECTS_SUCCESS]: getProjectsSuccess,
  [clientActions.GET_PROJECTS_FAILURE]: getProjectsFailure,

  [clientActions.GET_ASSETS_REQUEST]: getAssetsRequest,
  [clientActions.GET_ASSETS_SUCCESS]: getAssetsSuccess,
  [clientActions.GET_ASSETS_FAILURE]: getAssetsFailure,

  [clientActions.GET_ORGANIZATIONS_REQUEST]: getOrganizationsRequest,
  [clientActions.GET_ORGANIZATIONS_SUCCESS]: getOrganizationsSuccess,
  [clientActions.GET_ORGANIZATIONS_FAILURE]: getOrganizationsFailure,

  [clientActions.GET_BANK_ACCOUNTS_REQUEST]: getBankAccountsRequest,
  [clientActions.GET_BANK_ACCOUNTS_SUCCESS]: getBankAccountsSuccess,
  [clientActions.GET_BANK_ACCOUNTS_FAILURE]: getBankAccountsFailure,

  [clientActions.GET_IBAN_CALCULATION_REQUEST]: getIbanCalculationRequest,
  [clientActions.GET_IBAN_CALCULATION_SUCCESS]: getIbanCalculationSuccess,
  [clientActions.GET_IBAN_CALCULATION_FAILURE]: getIbanCalculationFailure,

  [clientActions.GET_IBAN_VALIDATION_REQUEST]: getIbanValidationRequest,
  [clientActions.GET_IBAN_VALIDATION_SUCCESS]: getIbanValidationSuccess,
  [clientActions.GET_IBAN_VALIDATION_FAILURE]: getIbanValidationFailure,

  [clientActions.GET_ACCOUNTING_ACCOUNTS_REQUEST]: getAccountingAccountsRequest,
  [clientActions.GET_ACCOUNTING_ACCOUNTS_SUCCESS]: getAccountingAccountsSuccess,
  [clientActions.GET_ACCOUNTING_ACCOUNTS_FAILURE]: getAccountingAccountsFailure,

  [clientActions.GET_JOURNAL_ENTRIES_RAW_REQUEST]: getJournalEntriesRawRequest,
  [clientActions.GET_JOURNAL_ENTRIES_RAW_SUCCESS]: getJournalEntriesRawSuccess,
  [clientActions.GET_JOURNAL_ENTRIES_RAW_FAILURE]: getJournalEntriesRawFailure,

  [clientActions.GET_TAX_CODES_REQUEST]: getTaxCodesRequest,
  [clientActions.GET_TAX_CODES_SUCCESS]: getTaxCodesSuccess,
  [clientActions.GET_TAX_CODES_FAILURE]: getTaxCodesFailure,

  [clientActions.COUNT_PENDING_DOCUMENTS_REQUEST]: countPendingDocumentsRequest,
  [clientActions.COUNT_PENDING_DOCUMENTS_SUCCESS]: countPendingDocumentsSuccess,
  [clientActions.COUNT_PENDING_DOCUMENTS_FAILURE]: countPendingDocumentsFailure,

  [clientActions.GET_ORGANIZATION_REQUEST]: getOrganizationRequest,
  [clientActions.GET_ORGANIZATION_SUCCESS]: getOrganizationSuccess,
  [clientActions.GET_ORGANIZATION_FAILURE]: getOrganizationFailure,

  [clientActions.GET_LABELS_REQUEST]: getLabelsRequest,
  [clientActions.GET_LABELS_SUCCESS]: getLabelsSuccess,
  [clientActions.GET_LABELS_FAILURE]: getLabelsFailure,

  [clientActions.GET_CATEGORIES_REQUEST]: getCategoriesRequest,
  [clientActions.GET_CATEGORIES_SUCCESS]: getCategoriesSuccess,
  [clientActions.GET_CATEGORIES_FAILURE]: getCategoriesFailure,

  [clientActions.GET_CATEGORIES_LV1_REQUEST]: getCategoriesLv1Request,
  [clientActions.GET_CATEGORIES_LV1_SUCCESS]: getCategoriesLv1Success,
  [clientActions.GET_CATEGORIES_LV1_FAILURE]: getCategoriesLv1Failure,

  [clientActions.GET_UNITS_REQUEST]: getUnitsRequest,
  [clientActions.GET_UNITS_SUCCESS]: getUnitsSuccess,
  [clientActions.GET_UNITS_FAILURE]: getUnitsFailure,

  [clientActions.GET_ITEMS_REQUEST]: getItemsRequest,
  [clientActions.GET_ITEMS_SUCCESS]: getItemsSuccess,
  [clientActions.GET_ITEMS_FAILURE]: getItemsFailure,
});
