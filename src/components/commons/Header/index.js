import cn from "classnames";
import PropTypes from "prop-types";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Dropdown, Overlay, Popover } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { BsPeopleCircle } from "react-icons/bs";
import { connect } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {IconArrowRight} from "../../../assests/icons";
import { profileImage, textLogoImg } from "../../../assests/images";
import { pathKeys } from "../../../constants";
import {accountantActions, clientActions} from "../../../redux/actions";
import { appSelectors } from "../../../redux/selectors/appSelector";
import { clientSelectors } from "../../../redux/selectors/clientSelector";
import { cookie } from "../../../utils";
import HeaderProfile from "./HeaderProfile";
import "./style.scss";

const ReportsToggle = forwardRef(({ onClick }, ref) => {
  const [t] = useTranslation();

  return (
    <NavLink
      ref={ref}
      className="sidebar-link icon"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      to={`${pathKeys.ACCOUNTANT}${pathKeys.REPORTS}`}
    >
      <span>{t("header.menu.reports")}</span>
      <IconArrowRight />
    </NavLink>
  );
});
ReportsToggle.displayName = "ReportsToggle";

const ReconciliationsToggle = forwardRef(({ onClick }, ref) => {
  const [t] = useTranslation();

  return (
    <NavLink
      ref={ref}
      className="sidebar-link icon"
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      to={`${pathKeys.ACCOUNTANT}${pathKeys.RECONCILIATION}`}
    >
      <span>{t("header.menu.reconcile")}</span>
      <IconArrowRight />
    </NavLink>
  );
});
ReconciliationsToggle.displayName = "ReconciliationsToggle";

const Header = (props) => {
  const {
    isAccountant,
    selectedAccount,
    selectedContract,
    user,
    logout,
    isLoggedOut,
    onAccountChange: handleAccountChange,
    onContractChange: handleContractChange,
    resetBankTransactions,
    setAccountantSelectionBankAccount,
    editClientCompany
  } = props;
  const routerHistory = useHistory();
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const [t] = useTranslation();
  const [showMasterDataModal, setShowMasterDataModal] = useState(false);
  const [editField, setEditField] = useState('')

  const isAdmin =
    props.user?.accounts && props.user?.accounts[0].role.name === "SA";

  const onAccountChange = (account) => {
    localStorage.setItem("selectedAccount", account.account.id);
    localStorage.setItem("selectedContractClientAccount", account.account.id);
    setEditField(selectedContract?.accountant_notes)
    handleAccountChange && handleAccountChange(account);
  };

  const textEditingFinishedClbk = () => {
    editClientCompany(selectedContract?.client_account_id, {'accountant_notes': editField})
  }

  const onContractChange = (contract, goToOverview = true) => {
    if (
      localStorage.getItem("selectedContract") !==
      contract.contract_id.toString()
    ) {
      resetBankTransactions();
      setAccountantSelectionBankAccount(null);
    }
    localStorage.setItem("selectedContract", contract.contract_id);
    localStorage.setItem(
      "selectedContractClientAccount",
      contract.client_account_id
    );
    handleContractChange && handleContractChange(contract);
    if (goToOverview) {
      routerHistory.push(`${pathKeys.ACCOUNTANT}${pathKeys.OVERVIEW}`);
    }
  };

  const accounts = (user || {}).accounts || [];
  const contracts = []
    .concat((user || {}).contracts || [])
    .sort((c1, c2) => (c1.display_name > c2.display_name ? 1 : -1));

  useEffect(() => {
    if (!selectedAccount && accounts.length > 0) {
      const savedAccountId = localStorage.getItem("selectedAccount");
      let account = accounts[0];
      if (savedAccountId) {
        account = accounts.find((a) => a.account.id === +savedAccountId);
        if (!account) {
          account = accounts[0];
        }
      }
      onAccountChange && onAccountChange(account, false);
    }
    if (!selectedContract && contracts.length > 0) {
      const savedContractId = localStorage.getItem("selectedContract");
      let contract = contracts[0];
      if (savedContractId) {
        contract = contracts.find((a) => a.contract_id === +savedContractId);
        if (!contract) {
          contract = contracts[0];
        }
      }
      onContractChange && onContractChange(contract, false);
    }
  }, [user]);


  useEffect( () => {
    if (selectedContract) {
      if (selectedContract.accountant_notes !== editField) {
        setEditField(selectedContract.accountant_notes)
      }
    }
  }, [selectedContract])

  useEffect(() => {
    if (isLoggedOut) {
      cookie.deleteToken();
      window.location.href = pathKeys.LOGIN;
    }
  }, [isLoggedOut]);

  if (isAccountant) {
    return (
      <div className="header-bar">
        <div>
          <div className={cn("content", { accountant: isAccountant })}>
            <NavLink
              className="logo"
              to={`${pathKeys.ACCOUNTANT}${pathKeys.OVERVIEW}`}
            >
              <img src={textLogoImg} alt="" />
            </NavLink>
            <div className="left-header">
              <Dropdown className="clients">
                <Dropdown.Toggle as={HeaderProfile}>
                  <span className="name">
                    {selectedContract
                      ? selectedContract.display_name
                      : t("app.loadingTitle")}
                  </span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {contracts.map((contract) => (
                    <Dropdown.Item
                      eventKey={contract.contract_id}
                      key={contract.contract_id}
                      active={
                        selectedContract &&
                        contract.contract_id === selectedContract.contract_id
                      }
                      onClick={() => onContractChange(contract)}
                    >
                      {contract.display_name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className="menu">
              <Dropdown>
                <Dropdown.Toggle as={ReportsToggle} />
                <Dropdown.Menu className="reports-menu">
                  <Dropdown.Item
                    className={cn({
                      active:
                        `${pathKeys.ACCOUNTANT}${pathKeys.REPORTS}${pathKeys.TRIAL_BALANCE}` ===
                        routerHistory.location.pathname,
                    })}
                    onClick={() =>
                      routerHistory.push(
                        `${pathKeys.ACCOUNTANT}${pathKeys.REPORTS}${pathKeys.TRIAL_BALANCE}`
                      )
                    }
                  >
                    {t("header.menu.reports_menu.trial_balance")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle as={HeaderProfile}>
                  <div className="profile-name-img-wrap">
                    <span className="name">{`${user?.first_name} ${user?.last_name}`}</span>
                    {/* <img className="profile-image" src={profileImage} alt="" /> */}
                    <BsPeopleCircle className="profile-image" />
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {accounts.map((account) => (
                    <Dropdown.Item
                      eventKey={account.account.id}
                      key={account.account.id}
                      active={
                        selectedAccount &&
                        account.account.id === selectedAccount.account.id
                      }
                      onClick={() => onAccountChange(account)}
                    >
                      {account.account.display_name}
                    </Dropdown.Item>
                  ))}
                  <Dropdown.Divider />
                  <Dropdown.Item eventKey="1" onClick={() => logout()}>
                    {t("header.menu.logout")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="header-bar">
      <div className="content">
        <NavLink
          className="logo"
          to={`${pathKeys.CUSTOMER}${pathKeys.OVERVIEW}`}
        >
          <img src={textLogoImg} alt="" />
        </NavLink>
        <div className="menu">
          {isAdmin && (
            <NavLink
              className="sidebar-link"
              to={`${pathKeys.CUSTOMER}${pathKeys.ADMIN}`}
            >
              <span>{t("header.menu.admin")}</span>
            </NavLink>
          )}
          <NavLink
            className="sidebar-link"
            to={`${pathKeys.CUSTOMER}${pathKeys.OVERVIEW}`}
          >
            <span>{t("header.menu.overview")}</span>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to={`${pathKeys.CUSTOMER}${pathKeys.DOCUMENTS}`}
          >
            <span>{t("header.menu.documents")}</span>
          </NavLink>
          <NavLink
            className="sidebar-link"
            to={`${pathKeys.CUSTOMER}${pathKeys.MESSAGES}`}
          >
            <span>{t("header.menu.messages")}</span>
          </NavLink>
          <Overlay
            target={target.current}
            show={show}
            placement="bottom-end"
            rootClose
            onHide={() => setShow(false)}
          >
            {(props) => (
              <Popover className="notification-popover" {...props}>
                <Popover.Title as="h3">Notifications</Popover.Title>
                <Popover.Content>
                  <div className="notification-item">
                    <img className="profile-image" src={profileImage} alt="" />
                    <div className="notification-content">
                      <div className="time">Today (4:24 PM)</div>
                      <div className="name">Maria Cary</div>
                      <div className="content">sent Message to you</div>
                    </div>
                  </div>
                  <div className="notification-item">
                    <img className="profile-image" src={profileImage} alt="" />
                    <div className="notification-content">
                      <div className="time">20 Jun, (4:24 PM)</div>
                      <div className="name">Maria Cary</div>
                      <div className="content">
                        sent Question to you about 51681351464.pdf document
                      </div>
                    </div>
                  </div>
                </Popover.Content>
              </Popover>
            )}
          </Overlay>
          <Dropdown>
            <Dropdown.Toggle as={HeaderProfile}>
              <div className="profile-name-img-wrap">
                <span className="name">{`${user?.first_name} ${user?.last_name}`}</span>
                <BsPeopleCircle className="profile-image" />
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {accounts.map((account) => (
                <Dropdown.Item
                  eventKey={account.account.id}
                  key={account.account.id}
                  active={
                    selectedAccount &&
                    account.account.id === selectedAccount.account.id
                  }
                  onClick={() => onAccountChange(account)}
                >
                  {account.account.display_name}
                </Dropdown.Item>
              ))}
              <Dropdown.Divider />
              <Dropdown.Item eventKey="1" onClick={() => logout()}>
                {t("header.menu.logout")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: appSelectors.selectUser(state),
  isLoggedOut: clientSelectors.selectIsLoggedOut(state),
});

const mapDispatchToProps = {
  logout: clientActions.logout,
  resetBankTransactions: accountantActions.resetBankTransactions,
  setAccountantSelectionBankAccount:
  accountantActions.setAccountantSelectionBankAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
