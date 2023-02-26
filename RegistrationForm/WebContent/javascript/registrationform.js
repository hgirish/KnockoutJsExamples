let RegistrationForm = function () {
  let customer = {
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

  };

  let titleOptions = [
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

  let titleSelect = ko.pureComputed(function () {
    if (customer.personalInfo.title() == null) {
      return 'Select';
    } else {
      return customer.personalInfo.title();
    }
  });

  let addCreditCard = function () {
    customer.creditCards.push({
      name: ko.observable(),
      number: ko.observable(),
      expiryDate: ko.observable(),
    });
  };

  let deleteCreditCard = function (card) {
    console.log(`Deleting credit card with number: ${card.number()}`);
    customer.creditCards.remove(card);
  };

  let init = function () {
    addCreditCard();

    ko.applyBindings(RegistrationForm);
  };

  $(init);

  let submit = function () {
    console.log(ko.toJSON(customer));
  };

  return {
    customer: customer,
    titleOptions: titleOptions,
    titleSelect: titleSelect,
    submit: submit,
    addCreditCard: addCreditCard,
    deleteCreditCard: deleteCreditCard,
  };
}();