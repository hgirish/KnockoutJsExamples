const BankPortal = function () {
  /* add members here */

  /* the model */
  const member = {
    accounts: ko.observableArray(),
    selectedAccount: ko.observable(),
    selectedAccountTransactions: ko.observableArray([]),

  };

  const activePage = ko.observable('Home');

  const setActivePage = function (page) {
    console.log(`Setting active page to: ${page}`);
    activePage(page);
  };

  const isActivePage = function (page) {
    return activePage() === page;
  };

  const activeTab = ko.observable('Accounts');

  const setActiveTab = function (tab) {
    console.log('Setting active tab to: ' + tab);
    activeTab(tab);
  };

  const isActiveTab = function (tab) {
    return activeTab() === tab;
  };

  const server = ServerStub();

  const retrieveData = function () {
    console.log('Retrieving data from server....');
    const data = server.getMemberData();
    //console.log('Data retrieved from server: ' + ko.toJSON(data));

    data.accounts.forEach(function (account) {
      member.accounts.push({
        summary: account.summary,
        transactions: ko.observableArray(account.transactions)
      });
    });
  };

  const setSelectedAccount = function (account) {
    console.log(`Setting selected account: ${account.summary.number}`);
    member.selectedAccount(account);
    member.selectedAccountTransactions(account.transactions());
  };

  const isSelectedAccount = function (account) {
    return account === member.selectedAccount();
  };







  /* method to initialize the module */
  const init = function () {
    /* add code to initialize this module */
    retrieveData();

    /* apply ko bindings */
    ko.applyBindings(BankPortal);
  };

  /* execute the init function when the DOM is ready */
  $(init);


  return {
    /* add the members that will be exposed publicliy */
    member: member,
    setActivePage: setActivePage,
    isActivePage: isActivePage,
    setActiveTab: setActiveTab,
    isActiveTab: isActiveTab,
    setSelectedAccount: setSelectedAccount,
    isSelectedAccount: isSelectedAccount,
  };


}();