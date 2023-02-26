const RegistrationForm = function () {
  const customer = {
    personalInfo: {
      title: ko.observable(),
      firstName: ko.observable(),
      middleName: ko.observable(),
      lastName: ko.observable(),
    },
    contactDetails: {
      phoneNumber: ko.observable(),
      emailAddress: ko.observable(),
      prererredContact: ko.observable(),
    },
    address: {
      residential: {
        street: ko.observable(),
        city: ko.observable(),
        postCode: ko.observable(),
        country: ko.observable(),
      },
      postal: {
        type: ko.observable(),
        streetAddress: {
          street: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable(),
          country: ko.observable(),
        },
        poBoxAddress: {
          poBox: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable(),
          country: ko.observable(),
        }
      }
    },
    creditCards: ko.observableArray(),
    interests: ko.observableArray(),

  };

  const titleOptions = [
    {
      value: 'Mr',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title('Mr');
      }
    },
    {
      value: 'Mrs',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title('Mrs');
      }
    },
    {
      value: 'Miss',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title('Miss');
      }
    },
    {
      value: 'Dr',
      setTitle: function () {
        RegistrationForm.customer.personalInfo.title('Dr');
      }
    },
  ];

  const titleSelect = ko.pureComputed(function () {
    if (customer.personalInfo.title() == null) {
      return 'Select';
    } else {
      return customer.personalInfo.title();
    }
  });

  const addCreditCard = function () {
    customer.creditCards.push({
      name: ko.observable(),
      number: ko.observable(),
      expiryDate: ko.observable(),
    });
  };

  const deleteCreditCard = function (card) {
    console.log(`Deleting credit card with number: ${card.number()}`);
    customer.creditCards.remove(card);
  };

  const clear = function () {
    console.log('Clear customer model');
    traverseAndClearModel(customer);

    addCreditCard();

  };
  const traverseAndClearModel = function (jsonObj) {
    $.each(jsonObj, function (key, val) {
      if (ko.isObservable(val)) {
        if (val.removeAll != undefined) {
          val.removeAll();
        } else {
          val(null);
        }
      } else {
        traverseAndClearModel(val);
      }
    });
  };
  const init = function () {
    addCreditCard();

    ko.applyBindings(RegistrationForm);
  };

  $(init);

  const submit = function () {
    console.log(ko.toJSON(customer));
  };

  return {
    customer: customer,
    titleOptions: titleOptions,
    titleSelect: titleSelect,
    submit: submit,
    addCreditCard: addCreditCard,
    deleteCreditCard: deleteCreditCard,
    clear: clear
  };
}();