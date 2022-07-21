import BaseApi from "./baseApi";

class ClientApi extends BaseApi {
  login(username, password) {
    const method = this.Methods.GET;
    const endpoint = "/auth/login";
    const header = {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`,
    };
    return super.execute(method, endpoint, header, false);
  }

  logout() {
    const method = this.Methods.POST;
    const endpoint = "/auth/logout";
    return super.execute(method, endpoint, null, true);
  }

  resetPassword(query) {
    const method = this.Methods.POST;
    const endpoint = "/reset-password";
    return super.execute(method, endpoint, null, false, query);
  }

  submitNewPassword(query) {
    const method = this.Methods.POST;
    const endpoint = "/new-password";
    return super.execute(method, endpoint, null, false, query);
  }

  getUser(userId) {
    const method = this.Methods.GET;
    const endpoint = `/users/${userId}`;
    return super.execute(method, endpoint, null, true);
  }

  uploadDocuments(accountId, files) {
    const method = this.Methods.POST;
    const endpoint = "/files/";
    const body = new FormData();
    for (let index = 0; index < files.length; index++) {
      body.append("file", files[index]);
    }
    body.append("client_account_id", accountId);

    return super.execute(method, endpoint, null, true, body);
  }

  getOverview(clientAccountId) {
    const method = this.Methods.GET;
    const endpoint = `/client/overview?client_account_id=${clientAccountId}`;
    return super.execute(method, endpoint, null, true);
  }

  getCurrency(clientAccountId) {
    const method = this.Methods.GET;
    const endpoint = `/client/currency?client_account_id=${clientAccountId}`;
    return super.execute(method, endpoint, null, true);
  }

  getPosts(query, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/posts/?expanded=${expanded}`;
    return super.execute(method, endpoint, null, true, query);
  }

  getDocuments(query, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/documents/?expanded=${expanded}`;
    return super.execute(method, endpoint, null, true, query, true);
  }

  getPostDetail(id, lang) {
    const method = this.Methods.GET;
    const endpoint = `/posts/${id}?lang=${lang}`;
    return super.execute(method, endpoint, null, true);
  }

  getVouchers(query, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/vouchers/?expanded=${expanded}`;
    return super.execute(method, endpoint, null, true, query, true);
  }

  getVoucher(id, lang) {
    const method = this.Methods.GET;
    const endpoint = `/vouchers/${id}?lang=${lang}`;
    return super.execute(method, endpoint, null, true);
  }

  getVoucherCategories(lang) {
    const method = this.Methods.GET;
    const endpoint = `/voucher-categories/?lang=${lang}`;
    return super.execute(method, endpoint, null, true);
  }

  getKlippaData(id, query) {
    const method = this.Methods.GET;

    const endpoint = `/klippa-raw/parse-result/${id}`;
    return super.execute(method, endpoint, null, true, query, false);
  }

  getQuestionTemplates() {
    const method = this.Methods.GET;
    const endpoint = "/question-templates/?expanded=1";
    return super.execute(method, endpoint, null, true);
  }

  createQuestionTemplates(body) {
    const method = this.Methods.POST;
    const endpoint = "/question-templates/";
    return super.execute(method, endpoint, null, true, body);
  }

  updateQuestionTemplates(id, body) {
    const method = this.Methods.PUT;
    const endpoint = `/question-templates/${id}`;
    return super.execute(method, endpoint, null, true, body);
  }

  deleteQuestionTemplates(id) {
    const method = this.Methods.DELETE;
    const endpoint = `/question-templates/${id}`;
    return super.execute(method, endpoint, null, true);
  }

  createAccountingQuestions(body) {
    const method = this.Methods.POST;
    const endpoint = "/accounting-questions/";
    return super.execute(method, endpoint, null, true, body);
  }

  getAccountingQuestions(id, status, clientAccountId) {
    const method = this.Methods.GET;
    const query = [];

    if (id) {
      query.push(`document_id=${id}`);
    }
    if (clientAccountId) {
      query.push(`client_account_id=${clientAccountId}`);
    }
    if (status) {
      query.push(`status=${status}`);
    }

    const endpoint = `/accounting-questions/?expanded=1&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  answerAccountingQuestion(id, body) {
    const method = this.Methods.POST;
    const endpoint = `/accounting-questions/${id}/answer/`;
    return super.execute(method, endpoint, null, true, body);
  }

  createBusinessPartners(body) {
    const method = this.Methods.POST;
    const endpoint = "/business-partners/";
    return super.execute(method, endpoint, null, true, body);
  }

  updateBusinessPartner(id, body) {
    const method = this.Methods.POST;
    const endpoint = `/business-partners/${id}`;
    return super.execute(method, endpoint, null, true, body);
  }

  createProjects(body) {
    const method = this.Methods.POST;
    const endpoint = "/projects/";
    return super.execute(method, endpoint, null, true, body);
  }

  updateProject(id, body) {
    const method = this.Methods.PUT;
    const endpoint = `/projects/${id}`;
    return super.execute(method, endpoint, null, true, body);
  }

  createAssets(body) {
    const method = this.Methods.POST;
    const endpoint = "/assets/";
    return super.execute(method, endpoint, null, true, body);
  }

  updateAsset(id, body) {
    const method = this.Methods.PUT;
    const endpoint = `/assets/${id}`;
    return super.execute(method, endpoint, null, true, body);
  }

  getBusinessPartners(clientAccountId, description, expanded, perPage, page) {
    const method = this.Methods.GET;
    const query = [];
    if (clientAccountId) {
      query.push(`client_account_id=${clientAccountId}`);
    }
    query.push(`description=${description || ""}`);
    if (expanded) {
      query.push(`expanded=${expanded}`);
    }
    if (perPage) {
      query.push(`per_page=${perPage}`);
    }
    if (page) {
      query.push(`page=${page}`);
    }
    const endpoint = `/business-partners/?${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getOrganizations(description, expanded, perPage) {
    const method = this.Methods.GET;
    const query = [];
    query.push(`description=${description || ""}`);
    if (expanded) {
      query.push(`expanded=${expanded}`);
    }
    if (perPage) {
      query.push(`per_page=${perPage}`);
    }
    const endpoint = `/organizations/?${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getAccountingAccounts(query) {
    const method = this.Methods.GET;

    const endpoint = "/accounting-accounts/";
    return super.execute(method, endpoint, null, true, query);
  }

  getAccountingAccount(id, query) {
    const method = this.Methods.GET;

    const endpoint = `/accounting-accounts/${id}`;
    return super.execute(method, endpoint, null, true, query);
  }

  getAccountSuggestions(clientAccountId, businessPartnerId, documentType) {
    const method = this.Methods.GET;

    const endpoint = `/accounting-account-suggestions/?client_account_id=${clientAccountId}&business_partner_id=${businessPartnerId}&doc_type=${documentType}`;
    return super.execute(method, endpoint, null, true);
  }

  getJournalEntriesRaw(journal_sequence_number, clientAccountId, expanded) {
    const method = this.Methods.GET;
    const query = [];

    query.push(`journal_entry=${journal_sequence_number || ""}`);
    if (expanded) {
      query.push(`expanded=${expanded}`);
    }
    if (clientAccountId) {
      query.push(`client_account_id=${clientAccountId}`);
    }

    const endpoint = `/journal-entries/list/?${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getTaxCodes(query) {
    const method = this.Methods.GET;
    const endpoint = "/tax-codes/";
    return super.execute(method, endpoint, null, true, query);
  }

  archivePosts(body) {
    const method = this.Methods.POST;
    const endpoint = "/posts/archives/";
    return super.execute(method, endpoint, null, true, body);
  }

  reversePosts(body) {
    const method = this.Methods.PATCH;
    const endpoint = "/posts/";
    return super.execute(method, endpoint, null, true, body);
  }

  createPosts(body) {
    const method = this.Methods.POST;
    const endpoint = "/posts/";
    return super.execute(method, endpoint, null, true, body);
  }

  deletePosts(id) {
    const method = this.Methods.DELETE;
    const endpoint = `/posts/${id}`;
    return super.execute(method, endpoint, null, true);
  }

  getOrganizationInfo(id) {
    const method = this.Methods.GET;
    const query = [];

    if (id) {
      query.push(`client_account_id=${id}`);
    }

    const endpoint = `/client/accounting_companies?expanded=1&${query.join(
      "&"
    )}`;
    return super.execute(method, endpoint, null, true);
  }

  getBankAccounts(
    clientId,
    businessPartnerId,
    expanded,
    page,
    perPage,
    description
  ) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }
    if (businessPartnerId) {
      query.push(`business_partner_id=${businessPartnerId}`);
    }

    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    if (description) {
      query.push(`description=${description}`);
    }

    const endpoint = `/bank-accounts/?expanded=${expanded}&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getProjects(clientId, expanded, page, perPage) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }

    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    const endpoint = `/projects/?expanded=${expanded}&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getAssets(clientId, expanded, page, perPage) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }

    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    const endpoint = `/assets/?expanded=${expanded}&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getIbanCalculation(
    clientId,
    expanded,
    bankCode,
    bban,
    country,
    page,
    perPage
  ) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }
    if (bankCode) {
      query.push(`bankcode=${bankCode}`);
    }

    if (bban) {
      query.push(`account=${bban}`);
    }

    if (country) {
      query.push(`country=${country}`);
    }

    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    const endpoint = `/bank-accounts/iban-calculation?expanded=${expanded}&${query.join(
      "&"
    )}`;
    return super.execute(method, endpoint, null, true);
  }

  getIbanValidation(clientId, iban, expanded) {
    const method = this.Methods.GET;
    const query = [];

    if (clientId) {
      query.push(`client_account_id=${clientId}`);
    }

    if (iban) {
      query.push(`iban=${iban}`);
    }

    const endpoint = `/bank-accounts/iban-validation?expanded=${expanded}&${query.join(
      "&"
    )}`;
    return super.execute(method, endpoint, null, true);
  }

  createBankAccounts(body) {
    const method = this.Methods.POST;
    const endpoint = "/bank-accounts/";
    return super.execute(method, endpoint, null, true, body);
  }

  editBankAccounts(id, body) {
    const method = this.Methods.PUT;
    const endpoint = `/bank-accounts/${id}`;
    return super.execute(method, endpoint, null, true, body);
  }

  getLabels(query) {
    const method = this.Methods.GET;
    const endpoint = "/labels/";
    return super.execute(method, endpoint, null, true, query);
  }

  getCategories(filter, expanded, page, perPage) {
    const method = this.Methods.GET;

    const query = [];

    if (filter) {
      query.push(`filter=${filter}`);
    }
    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    if (expanded) {
      query.push(`expanded=${expanded}`);
    }

    const endpoint = `/categories/?expanded=${expanded}&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getCategoriesLv1(expanded) {
    const method = this.Methods.GET;
    const endpoint = `/categories/?expanded=${expanded}`; // lv1/'
    return super.execute(method, endpoint, null, true);
  }

  getChildInvoiceCategories(parentCode) {
    const method = this.Methods.GET;
    const endpoint = `/invoice/categories/get_child/?parent_code=${parentCode}`;
    return super.execute(method, endpoint, null, true);
  }

  createDoc(query) {
    const method = this.Methods.POST;
    const endpoint = "/documents/";
    return super.execute(method, endpoint, null, true, query);
  }

  createExperiment(query) {
    const method = this.Methods.POST;
    const endpoint = "/matches/";
    return super.execute(method, endpoint, null, true, query);
  }

  getUnits(filter, version, common, expanded, page, perPage) {
    const method = this.Methods.GET;

    const query = [];

    if (filter) {
      query.push(`filter=${filter}`);
    }
    if (version) {
      query.push(`version=${version}`);
    }
    if (common) {
      query.push(`common=${common}`);
    }
    if (page) {
      query.push(`page=${page}`);
    }

    if (perPage) {
      query.push(`per_page=${perPage}`);
    }

    const endpoint = `/units/?expanded=${expanded}&${query.join("&")}`;
    return super.execute(method, endpoint, null, true);
  }

  getItems(client_account_id, filter, expanded) {
    const method = this.Methods.GET;
    const endpoint = `/items/?client_account_id=${client_account_id}&filter=${filter}&expanded=${expanded}`;
    return super.execute(method, endpoint, null, true);
  }

  addItem(query) {
    const method = this.Methods.POST;
    const endpoint = "/items/";
    return super.execute(method, endpoint, null, true, query);
  }
}

export default new ClientApi();
