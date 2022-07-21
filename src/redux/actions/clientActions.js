import * as clientActionTypes from "../constants/clientActions";
import * as appActionTypes from "../constants/appActions";
import {
  hideLoading,
  showErrorNotification,
  showLoading,
  showSuccessNotification,
} from "./appActions";
import { clientService } from "../../services";
import { detectLanguage } from "../../utils/common";
import { appSelectors } from "../selectors/appSelector";

export function login(username, password) {
  return async (dispatch) => {
    try {
      if (!username) {
        return dispatch(showErrorNotification("Please input username"));
      }
      if (!password) {
        return dispatch(showErrorNotification("Please input password"));
      }
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.LOGIN_REQUEST });

      const { data } = await clientService.login(username, password);

      dispatch({
        type: clientActionTypes.LOGIN_SUCCESS,
        token: data.token,
        user: data.user,
      });
      dispatch({ type: appActionTypes.SET_USER, user: data.user });
      dispatch(hideLoading());
    } catch (error) {
      dispatch({ type: clientActionTypes.LOGIN_FAILURE });
      dispatch(hideLoading());
      dispatch(showErrorNotification(error));
    }
  };
}

export function logout(callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.LOGOUT_REQUEST });

      await clientService.logout();

      dispatch({ type: clientActionTypes.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: clientActionTypes.LOGOUT_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function resetPassword(email, lang, callback) {
  return async (dispatch) => {
    try {
      if (!email) {
        return dispatch(showErrorNotification("Please input username"));
      }
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.RESET_PASSWORD_REQUEST });

      await clientService.resetPassword({ email, lang });

      dispatch({ type: clientActionTypes.RESET_PASSWORD_SUCCESS });
      dispatch(hideLoading());
      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.RESET_PASSWORD_FAILURE });
      dispatch(hideLoading());
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function submitNewPassword(token, password, callback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.SUBMIT_NEW_PASSWORD_REQUEST });

      await clientService.submitNewPassword({ token, password });

      dispatch({ type: clientActionTypes.SUBMIT_NEW_PASSWORD_SUCCESS });
      dispatch(hideLoading());
      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.SUBMIT_NEW_PASSWORD_FAILURE });
      dispatch(hideLoading());
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getUser(userId) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_USER_REQUEST });

      const { data } = await clientService.getUser(userId);

      dispatch({ type: clientActionTypes.GET_USER_SUCCESS, data });
      dispatch({ type: appActionTypes.SET_USER, user: data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_USER_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function clearLoginState() {
  return async (dispatch) => {
    console.log("Clearing login state");
    dispatch({ type: clientActionTypes.LOGIN_SUCCESS, token: null });
  };
}

export function uploadDocuments(accountId, files, callback, updateStatus) {
  return async (dispatch) => {
    try {
      updateStatus &&
        dispatch({ type: clientActionTypes.UPLOAD_DOCUMENTS_REQUEST });

      const result = await clientService.uploadDocuments(accountId, files);

      dispatch({ type: clientActionTypes.UPLOAD_DOCUMENTS_SUCCESS });

      callback && callback();
      return result;
    } catch (error) {
      updateStatus &&
        dispatch({ type: clientActionTypes.UPLOAD_DOCUMENTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getOverview(clientAccountId) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_OVERVIEW_REQUEST });

      const { data } = await clientService.getOverview(clientAccountId);

      dispatch({ type: clientActionTypes.GET_OVERVIEW_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_OVERVIEW_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getCurrency(clientAccountId) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_CURRENCY_REQUEST });

      const { data } = await clientService.getCurrency(clientAccountId);

      dispatch({ type: clientActionTypes.GET_CURRENCY_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_CURRENCY_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getDocuments(query, useLoadingState = true, expanded = 1) {
  return async (dispatch) => {
    try {
      useLoadingState &&
        dispatch({ type: clientActionTypes.GET_DOCUMENTS_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getDocuments(
        { ...query, lang },
        expanded
      );

      dispatch({ type: clientActionTypes.GET_DOCUMENTS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_DOCUMENTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getPosts(query, useLoadingState = true, expanded = 1) {
  return async (dispatch) => {
    try {
      useLoadingState &&
        dispatch({ type: clientActionTypes.GET_POSTS_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getPosts(
        { ...query, lang },
        expanded
      );

      dispatch({ type: clientActionTypes.GET_POSTS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_POSTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getPostDetail(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_POST_DETAIL_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getPostDetail(id, lang);

      dispatch({ type: clientActionTypes.GET_POST_DETAIL_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_POST_DETAIL_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getVouchers(query, useLoadingState = true, expanded = 1) {
  return async (dispatch) => {
    try {
      useLoadingState &&
        dispatch({ type: clientActionTypes.GET_VOUCHERS_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getVouchers(
        { ...query, lang },
        expanded
      );

      dispatch({ type: clientActionTypes.GET_VOUCHERS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_VOUCHERS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getVoucher(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_VOUCHER_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getVoucher(id, lang);

      dispatch({ type: clientActionTypes.GET_VOUCHER_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_VOUCHER_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getVoucherCategories() {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_VOUCHER_CATEGORIES_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getVoucherCategories(lang);

      dispatch({
        type: clientActionTypes.GET_VOUCHER_CATEGORIES_SUCCESS,
        data: data.categories,
      });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_VOUCHER_CATEGORIES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getKlippaData(id, client_account_id, expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_KLIPPA_DATA_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getKlippaData(id, {
        client_account_id,
        expanded,
        lang,
      });

      dispatch({ type: clientActionTypes.GET_KLIPPA_DATA_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_KLIPPA_DATA_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function clearDocumentDetail() {
  return async (dispatch) => {
    dispatch({ type: clientActionTypes.GET_POST_DETAIL_SUCCESS });
  };
}

export function getQuestionTemplates() {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_QUESTION_TEMPLATES_REQUEST });

      const { data } = await clientService.getQuestionTemplates();

      dispatch({
        type: clientActionTypes.GET_QUESTION_TEMPLATES_SUCCESS,
        data: data.question_templates,
      });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_QUESTION_TEMPLATES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createQuestionTemplates(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_QUESTION_TEMPLATES_REQUEST });

      await clientService.createQuestionTemplates(body);

      dispatch({ type: clientActionTypes.CREATE_QUESTION_TEMPLATES_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_QUESTION_TEMPLATES_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function updateQuestionTemplates(id, body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.UPDATE_QUESTION_TEMPLATES_REQUEST });

      await clientService.updateQuestionTemplates(id, body);

      dispatch({ type: clientActionTypes.UPDATE_QUESTION_TEMPLATES_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.UPDATE_QUESTION_TEMPLATES_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function deleteQuestionTemplates(id, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.DELETE_QUESTION_TEMPLATES_REQUEST });

      await clientService.deleteQuestionTemplates(id);

      dispatch({ type: clientActionTypes.DELETE_QUESTION_TEMPLATES_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.DELETE_QUESTION_TEMPLATES_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function createAccountingQuestions(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_ACCOUNTING_QUESTIONS_REQUEST });

      await clientService.createAccountingQuestions(body);

      dispatch({ type: clientActionTypes.CREATE_ACCOUNTING_QUESTIONS_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_ACCOUNTING_QUESTIONS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getAccountingQuestions(id, status) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_ACCOUNTING_QUESTIONS_REQUEST });
      const clientAccountId = localStorage.getItem(
        "selectedContractClientAccount"
      );

      const { data } = await clientService.getAccountingQuestions(
        id,
        status,
        clientAccountId
      );

      dispatch({
        type: clientActionTypes.GET_ACCOUNTING_QUESTIONS_SUCCESS,
        data: data.questions,
      });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_ACCOUNTING_QUESTIONS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function answerAccountingQuestion(id, body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.ANSWER_ACCOUNTING_QUESTION_REQUEST });

      await clientService.answerAccountingQuestion(id, body);

      dispatch({ type: clientActionTypes.ANSWER_ACCOUNTING_QUESTION_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.ANSWER_ACCOUNTING_QUESTION_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getAccountingQuestionsInDocumentDetail(id, status) {
  return async (dispatch) => {
    try {
      dispatch({
        type:
          clientActionTypes.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_REQUEST,
      });
      const clientAccountId = localStorage.getItem("selectedAccount");

      const { data } = await clientService.getAccountingQuestions(
        id,
        status,
        clientAccountId
      );

      dispatch({
        type:
          clientActionTypes.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_SUCCESS,
        data: data.questions,
      });
    } catch (error) {
      dispatch({
        type:
          clientActionTypes.GET_ACCOUNTING_QUESTIONS_IN_DOCUMENT_DETAIL_FAILURE,
      });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createBusinessPartners(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_BUSINESS_PARTNERS_REQUEST });

      const { data } = await clientService.createBusinessPartners(body);

      dispatch({ type: clientActionTypes.CREATE_BUSINESS_PARTNERS_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_BUSINESS_PARTNERS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function updateBusinessPartner(id, body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.UPDATE_BUSINESS_PARTNER_REQUEST });

      const { data } = await clientService.updateBusinessPartner(id, body);

      dispatch({ type: clientActionTypes.UPDATE_BUSINESS_PARTNER_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.UPDATE_BUSINESS_PARTNER_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function createProjects(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_PROJECTS_REQUEST });

      const { data } = await clientService.createProjects(body);

      dispatch({ type: clientActionTypes.CREATE_PROJECTS_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_PROJECTS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function updateProject(id, body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.UPDATE_PROJECT_REQUEST });

      const { data } = await clientService.updateProject(id, body);

      dispatch({ type: clientActionTypes.UPDATE_PROJECT_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.UPDATE_PROJECT_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function createAssets(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_ASSETS_REQUEST });

      const { data } = await clientService.createAssets(body);

      dispatch({ type: clientActionTypes.CREATE_ASSETS_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_ASSETS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function updateAsset(id, body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.UPDATE_ASSET_REQUEST });

      const { data } = await clientService.updateAsset(id, body);

      dispatch({ type: clientActionTypes.UPDATE_ASSET_SUCCESS });

      callback && callback(data);
    } catch (error) {
      dispatch({ type: clientActionTypes.UPDATE_ASSET_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getBusinessPartners(
  description,
  expanded = 1,
  perPage = 25,
  page = 1
) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: clientActionTypes.GET_BUSINESS_PARTNERS_REQUEST });
      const clientAccountId = appSelectors.selectCurrentContract(getState())
        .client_account_id;
      const { data } = await clientService.getBusinessPartners(
        clientAccountId,
        description,
        expanded,
        perPage,
        page
      );

      dispatch({ type: clientActionTypes.GET_BUSINESS_PARTNERS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_BUSINESS_PARTNERS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getOrganizations(description, expanded = 1, perPage = 25) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_ORGANIZATIONS_REQUEST });

      const { data } = await clientService.getOrganizations(
        description,
        expanded,
        perPage
      );

      dispatch({ type: clientActionTypes.GET_ORGANIZATIONS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_ORGANIZATIONS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function archivePosts(body, callback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.CREATE_POST_ARCHIVE_REQUEST });

      await clientService.archivePosts(body);

      dispatch({ type: clientActionTypes.CREATE_POST_ARCHIVE_SUCCESS });

      callback && callback(true);

      dispatch(showSuccessNotification("The action was successful"));
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_POST_ARCHIVE_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function reversePosts(body, callback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.CREATE_POST_REVERSE_REQUEST });

      await clientService.reversePosts(body);

      dispatch({ type: clientActionTypes.CREATE_POST_REVERSE_SUCCESS });

      callback && callback(true);

      dispatch(showSuccessNotification("The action was successful"));
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_POST_REVERSE_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function createPosts(body, callback) {
  return async (dispatch) => {
    try {
      dispatch(showLoading());
      dispatch({ type: clientActionTypes.CREATE_POSTS_REQUEST });

      await clientService.createPosts(body);

      dispatch({ type: clientActionTypes.CREATE_POSTS_SUCCESS });

      callback && callback(true);

      dispatch(showSuccessNotification("The action was successful"));
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_POSTS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    } finally {
      dispatch(hideLoading());
    }
  };
}

export function deletePosts(id, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.DELETE_POSTS_REQUEST });

      await clientService.deletePosts(id);

      dispatch({ type: clientActionTypes.DELETE_POSTS_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.DELETE_POSTS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getAccountingAccounts(
  accountCode,
  callback,
  expanded = 1,
  searchMandatoryDimensions = 1
) {
  return async (dispatch) => {
    try {
      !callback &&
        dispatch({ type: clientActionTypes.GET_ACCOUNTING_ACCOUNTS_REQUEST });
      const clientAccountId = localStorage.getItem(
        "selectedContractClientAccount"
      );
      const lang = detectLanguage();

      const query = {
        account_code: accountCode || "",
        client_account_id: clientAccountId,
        search_mandatory_dimensions: searchMandatoryDimensions,
        lang,
        expanded,
      };

      const { data } = await clientService.getAccountingAccounts(query);

      callback && callback((data || {}).accounting_accounts || []);

      !callback &&
        dispatch({
          type: clientActionTypes.GET_ACCOUNTING_ACCOUNTS_SUCCESS,
          data,
        });
    } catch (error) {
      !callback &&
        dispatch({ type: clientActionTypes.GET_ACCOUNTING_ACCOUNTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAccountingAccount(
  id,
  callback,
  expanded = 1,
  searchMandatoryDimensions = 1
) {
  return async (dispatch) => {
    try {
      const clientAccountId = localStorage.getItem(
        "selectedContractClientAccount"
      );
      const lang = detectLanguage();

      const query = {
        client_account_id: clientAccountId,
        search_mandatory_dimensions: searchMandatoryDimensions,
        lang,
        expanded,
      };
      const { data } = await clientService.getAccountingAccount(id, query);
      callback && callback(data || {});
    } catch (error) {
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAccountSuggestions(
  clientAccountId,
  businessPartnerId,
  documentType,
  callback
) {
  return async (dispatch) => {
    try {
      const { data } = await clientService.getAccountSuggestions(
        clientAccountId,
        businessPartnerId,
        documentType
      );
      callback && callback((data || {}).account_suggestions || []);
    } catch (error) {
      dispatch(showErrorNotification(error));
    }
  };
}

export function getJournalEntriesRaw(
  journal_sequence_number,
  callback,
  expanded = 1
) {
  return async (dispatch) => {
    try {
      !callback &&
        dispatch({ type: clientActionTypes.GET_JOURNAL_ENTRIES_RAW_REQUEST });
      const clientAccountId = localStorage.getItem(
        "selectedContractClientAccount"
      );

      const { data } = await clientService.getJournalEntriesRaw(
        journal_sequence_number,
        clientAccountId,
        expanded
      );

      callback && callback((data || {}).journal_entries || []);

      !callback &&
        dispatch({
          type: clientActionTypes.GET_JOURNAL_ENTRIES_RAW_SUCCESS,
          data,
        });
    } catch (error) {
      !callback &&
        dispatch({ type: clientActionTypes.GET_JOURNAL_ENTRIES_RAW_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getTaxCodes(category, expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_TAX_CODES_REQUEST });
      const lang = detectLanguage();

      const { data } = await clientService.getTaxCodes({
        expanded,
        lang,
        category,
      });

      dispatch({ type: clientActionTypes.GET_TAX_CODES_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_TAX_CODES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function countPendingDocuments(
  id,
  useLoadingState = true,
  expanded = 1
) {
  return async (dispatch) => {
    try {
      useLoadingState &&
        dispatch({ type: clientActionTypes.COUNT_PENDING_DOCUMENTS_REQUEST });

      const query = {
        client_account_id: id,
        status: "Pending",
        pageSize: 1,
      };
      const { data } = await clientService.getPosts(query, expanded);

      dispatch({
        type: clientActionTypes.COUNT_PENDING_DOCUMENTS_SUCCESS,
        total: data.pages.total,
      });
    } catch (error) {
      dispatch({ type: clientActionTypes.COUNT_PENDING_DOCUMENTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getOrganizationInfo(id) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_ORGANIZATION_REQUEST });

      const { data } = await clientService.getOrganizationInfo(id);

      dispatch({
        type: clientActionTypes.GET_ORGANIZATION_SUCCESS,
        data: data.accounting_companies,
      });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_ORGANIZATION_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getBankAccounts(
  clientId,
  businessPartnerId,
  expanded = 1,
  page = 1,
  perPage = 25,
  description = null
) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_BANK_ACCOUNTS_REQUEST });

      const { data } = await clientService.getBankAccounts(
        clientId,
        businessPartnerId,
        expanded,
        page,
        perPage,
        description
      );

      dispatch({ type: clientActionTypes.GET_BANK_ACCOUNTS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_BANK_ACCOUNTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getProjects(clientId, expanded = 1, page = 1, perPage = 25) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_PROJECTS_REQUEST });

      const { data } = await clientService.getProjects(
        clientId,
        expanded,
        page,
        perPage
      );

      dispatch({ type: clientActionTypes.GET_PROJECTS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_PROJECTS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getAssets(clientId, expanded = 1, page = 1, perPage = 25) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_ASSETS_REQUEST });

      const { data } = await clientService.getAssets(
        clientId,
        expanded,
        page,
        perPage
      );

      dispatch({ type: clientActionTypes.GET_ASSETS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_ASSETS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getIbanCalculation(
  clientId,
  bban,
  country,
  bankCode = null,
  expanded = 1,
  page = 1,
  perPage = 25
) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_IBAN_CALCULATION_REQUEST });
      const { data } = await clientService.getIbanCalculation(
        clientId,
        bban,
        country,
        bankCode,
        expanded,
        page,
        perPage
      );

      dispatch({ type: clientActionTypes.GET_IBAN_CALCULATION_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_IBAN_CALCULATION_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getIbanValidation(clientId, iban, expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_IBAN_VALIDATION_REQUEST });
      const { data } = await clientService.getIbanValidation(
        clientId,
        iban,
        expanded
      );

      dispatch({ type: clientActionTypes.GET_IBAN_VALIDATION_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_IBAN_VALIDATION_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function createBankAccounts(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_BANK_ACCOUNTS_REQUEST });

      await clientService.createBankAccounts(body);

      dispatch({ type: clientActionTypes.CREATE_BANK_ACCOUNTS_SUCCESS });

      callback && callback(true);
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_BANK_ACCOUNTS_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getLabels(expanded = 1) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: clientActionTypes.GET_LABELS_REQUEST });
      const client_account_id = appSelectors.selectCurrentContract(getState())
        .client_account_id;
      const lang = detectLanguage();

      const { data } = await clientService.getLabels({
        client_account_id,
        expanded,
        lang,
      });

      dispatch({ type: clientActionTypes.GET_LABELS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_LABELS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getCategories(filter, expanded = 1, page = 1, perPage = 25) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_CATEGORIES_REQUEST });
      const { data } = await clientService.getCategories(
        filter,
        expanded,
        page,
        perPage
      );
      dispatch({ type: clientActionTypes.GET_CATEGORIES_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_CATEGORIES_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getCategoriesLv1(expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_CATEGORIES_LV1_REQUEST });

      const { data } = await clientService.getCategoriesLv1(expanded);

      dispatch({ type: clientActionTypes.GET_CATEGORIES_LV1_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_CATEGORIES_LV1_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getChildInvoiceCategories(parentCode, expanded = 1) {
  return async (dispatch) => {
    try {
      const { data } = await clientService.getChildInvoiceCategories(
        parentCode,
        expanded
      );
      return data;
    } catch (error) {
      dispatch(showErrorNotification(error));
    }
  };
}

export function createDoc(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_DOC_REQUEST });
      const { data } = await clientService.createDoc(body);
      dispatch({ type: clientActionTypes.CREATE_DOC_SUCCESS, data });
      callback && callback(true);
      dispatch(showSuccessNotification("The action was successful"));
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_DOC_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function createExperiment(body, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.CREATE_EXPERIMENT_REQUEST });
      const { data } = await clientService.createExperiment(body);
      dispatch({ type: clientActionTypes.CREATE_EXPERIMENT_SUCCESS, data });
      callback && callback(true);
      dispatch(showSuccessNotification("The action was successful"));
    } catch (error) {
      dispatch({ type: clientActionTypes.CREATE_EXPERIMENT_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}

export function getUnits(
  filter,
  version,
  common = 1,
  expanded = 1,
  page = 1,
  perPage = 25
) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_UNITS_REQUEST });
      const { data } = await clientService.getUnits(
        filter,
        version,
        common,
        expanded,
        page,
        perPage
      );
      dispatch({ type: clientActionTypes.GET_UNITS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_UNITS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function getItems(client_account_id = "", filter = "", expanded = 1) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.GET_ITEMS_REQUEST });
      const { data } = await clientService.getItems(
        client_account_id,
        filter,
        expanded
      );

      dispatch({ type: clientActionTypes.GET_ITEMS_SUCCESS, data });
    } catch (error) {
      dispatch({ type: clientActionTypes.GET_ITEMS_FAILURE });
      dispatch(showErrorNotification(error));
    }
  };
}

export function addItem(query, callback) {
  return async (dispatch) => {
    try {
      dispatch({ type: clientActionTypes.ADD_ITEM_REQUEST });
      const { data } = await clientService.addItem(query);
      dispatch({ type: clientActionTypes.ADD_ITEM_SUCCESS, data });
      callback && callback(true, data);
    } catch (error) {
      dispatch({ type: clientActionTypes.ADD_ITEM_FAILURE });
      dispatch(showErrorNotification(error));
      callback && callback(false);
    }
  };
}
