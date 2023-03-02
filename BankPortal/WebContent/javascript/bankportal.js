const BankPortal = function () {
  /* add members here */

  /* the model */
  const member = {
    personal: {
      firstName: ko.observable(),
      lastName: ko.observable(),
      address: {
        street: ko.observable(),
        city: ko.observable(),
        postCode: ko.observable(),
        country: ko.observable()
      },
      contactDetails: {
        phoneNumber: ko.observable(),
        emailAddress: ko.observable()
      }
    },
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
    const data = server.getMemberData().data;
    console.log('Data retrieved from server: ' + ko.toJSON(data));

    data.accounts.forEach(function (account) {
      member.accounts.push({
        summary: account.summary,
        transactions: ko.observableArray(account.transactions)
      });
    });

    member.personal.firstName(data.personal.firstName);
    member.personal.lastName(data.personal.lastName);
    member.personal.contactDetails.phoneNumber(data.personal.contactDetails.phoneNumber);
    member.personal.contactDetails.emailAddress(data.personal.contactDetails.emailAddress);

    member.personal.address.street(data.personal.address.street);
    member.personal.address.city(data.personal.address.city);
    member.personal.address.postCode(data.personal.address.postCode);
    member.personal.address.country(data.personal.address.country);

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