let RegistrationForm = function () {
  let customer = {
    personalInfo: {
      title: ko.observable(),
      firstName: ko.observable(),
      middleName: ko.observable(),
      lastName: ko.observable(),
    }

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

  let init = function () {
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
  };
}();