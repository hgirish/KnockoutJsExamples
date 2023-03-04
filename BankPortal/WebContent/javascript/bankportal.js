const BankPortal = function () {
  /* add members here */

  /* the model */
  const member = {
    personal: {
      firstName: ko.mementoObservable().extend({ required: true }),
      lastName: ko.mementoObservable().extend({ required: true }),
      address: {
        street: ko.mementoObservable().extend({ required: true }),
        city: ko.mementoObservable().extend({ required: true }),
        postCode: ko.mementoObservable().extend({ required: true, minLength: 1, maxLength: 4, number: true }),
        country: ko.mementoObservable().extend({ required: true }),
      },
      contactDetails: {
        phoneNumber: ko.mementoObservable().extend({ required: true, minLength: 4, maxLength: 9, number: true }),
        emailAddress: ko.mementoObservable().extend({ required: true, email: true }),
      }
    },
    accounts: ko.observableArray(),
    selectedAccount: ko.observable(),
    selectedAccountTransactions: ko.observableArray([]),

  };

  const personalInformationEditMode = ko.observable(false);
  const showPersonalInformationEditDone = ko.observable(false);
  const showPersonalInformationEditCancel = ko.observable(false);
  const activePage = ko.observable('Home');

  let validationErrors;

  const enablePersonalInformationEdit = function () {
    personalInformationEditMode(true);
  };

  const cancelPersonalInformationEdit = function () {
    console.log('Cancelled edit personal information, values reverted...');

    personalInformationEditMode(false);

    resetPersonalInformation();
    showPersonalInformationEditCancel(true);
  };

  const commitPersonalInformation = function () {
    member.personal.firstName.commit();
    member.personal.lastName.commit();
    member.personal.contactDetails.emailAddress.commit();
    member.personal.contactDetails.phoneNumber.commit();
    member.personal.address.street.commit();
    member.personal.address.city.commit();
    member.personal.address.postCode.commit();
    member.personal.address.country.commit();
  };

  const resetPersonalInformation = function () {
    member.personal.firstName.reset();
    member.personal.lastName.reset();
    member.personal.contactDetails.emailAddress.reset();
    member.personal.contactDetails.phoneNumber.reset();
    member.personal.address.street.reset();
    member.personal.address.city.reset();
    member.personal.address.postCode.reset();
    member.personal.address.country.reset();
  };

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

  // eslint-disable-next-line no-undef
  const server = ServerStub();

  const submitPersonalInformation = function () {
    if (validationErrors().length > 0) {
      console.log('Member model is not valid...');
      return;
    }
    commitPersonalInformation();
    console.log('Updating personal information on the server: ' + ko.toJSON(member.personal));
    server.updatePersonalInformation(ko.toJS(member.personal));

    personalInformationEditMode(false);
    showPersonalInformationEditDone(true);
  };



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
    commitPersonalInformation();

  };

  const setSelectedAccount = function (account) {
    console.log(`Setting selected account: ${account.summary.number}`);
    member.selectedAccount(account);
    member.selectedAccountTransactions(account.transactions());
  };

  const isSelectedAccount = function (account) {
    return account === member.selectedAccount();
  };

  const transferWizard = Wizard(3);








  /* method to initialize the module */
  const init = function () {
    /* add code to initialize this module */
    retrieveData();

    validationErrors = ko.validation.group(member, { deep: true });

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
    submitPersonalInformation: submitPersonalInformation,
    enablePersonalInformationEdit: enablePersonalInformationEdit,
    cancelPersonalInformationEdit: cancelPersonalInformationEdit,
    personalInformationEditMode: personalInformationEditMode,
    showPersonalInformationEditDone: showPersonalInformationEditDone,
    showPersonalInformationEditCancel: showPersonalInformationEditCancel,
    transferWizard: transferWizard,
  };


}();