
const RegistrationForm = function () {



  const customer = {
    personalInfo: {
      title: ko.observable().extend({ required: true }),
      firstName: ko.observable().extend({ required: true }),
      middleName: ko.observable(),
      lastName: ko.observable().extend({ required: true }),
    },
    contactDetails: {
      phoneNumber: ko.observable().extend({ required: true, minLength: 4, maxLength: 9, number: true }),
      emailAddress: ko.observable().extend({ required: true, email: true }),
      preferredContact: ko.observable().extend({ required: true }),
    },
    address: {
      residential: {
        street: ko.observable().extend({ required: true }),
        city: ko.observable().extend({ required: true }),
        postCode: ko.observable().extend({ required: true, maxLength: 4, number: true }),
        country: ko.observable().extend({ required: true }),
      },
      postal: {
        type: ko.observable().extend({ required: true }),
        streetAddress: {
          street: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable().extend({ maxLength: 4, number: true }),
          country: ko.observable(),
        },
        poBoxAddress: {
          poBox: ko.observable(),
          city: ko.observable(),
          postCode: ko.observable().extend({ maxLength: 4, number: true }),
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
    const card = {
      name: ko.observable().extend({ required: true }),
      number: ko.observable().extend({ required: true, number: true }),
      expiryDate: ko.observable().extend(
        { required: true, pattern: '^(0[1-9]|1[012])/\\d\\d$' }),
    };
    card.errors = ko.validation.group(card);

    customer.creditCards.push(card);
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

  const configureValidation = function () {
    ko.validation.init({
      errorElementClass: 'is-invalid',
      errorMessageClass: 'invalid-feedback'
    });

    applyConditionalValidation();

    customer.errors = ko.validation.group(customer, { deep: true });
  };

  const init = function () {
    configureValidation();

    addCreditCard();

    ko.applyBindings(RegistrationForm);
  };

  $(init);

  const submit = function () {
    const creditCardValid = checkCreditCardsForErrors();
    const staticFieldValid = checkStaticFieldsForErrors();

    console.log(ko.toJSON(customer));
    if (creditCardValid && staticFieldValid) {
      console.log('Customer model is valid');
    } else {
      console.log('Customer model has erros');
    }
  };
  const isStreetAddress = function () {
    return customer.address.postal.type() == 'street';
  };
  const isPoBoxAddress = function () {
    return customer.address.postal.type() == 'pobox';
  };

  const applyConditionalValidation = function () {
    customer.address.postal.streetAddress.street.extend({ required: { onlyIf: isStreetAddress } });
    customer.address.postal.streetAddress.city.extend({ required: { onlyIf: isStreetAddress } });
    customer.address.postal.streetAddress.postCode.extend({ required: { onlyIf: isStreetAddress } });
    customer.address.postal.streetAddress.country.extend({ required: { onlyIf: isStreetAddress } });

    customer.address.postal.poBoxAddress.poBox.extend({ required: { onlyIf: isPoBoxAddress } });
    customer.address.postal.poBoxAddress.city.extend({ required: { onlyIf: isPoBoxAddress } });
    customer.address.postal.poBoxAddress.postCode.extend({ required: { onlyIf: isPoBoxAddress } });
    customer.address.postal.poBoxAddress.country.extend({ required: { onlyIf: isPoBoxAddress } });

  };

  const checkCreditCardsForErrors = function () {
    let valid = true;
    ko.utils.arrayForEach(customer.creditCards(), function (card) {
      if (card.errors().length > 0) {
        valid = false;
        card.errors.showAllMessages();
      }
    });
    return valid;
  };

  const checkStaticFieldsForErrors = function () {
    if (customer.errors().length > 0) {
      customer.errors.showAllMessages();
      return false;
    }
    return true;
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