const ServerStub = function () {

  const data = {
    personal: {
      firstName: 'John',
      lastName: 'Citizen',
      address: {
        street: '1 Main Street',
        city: 'Melbourne',
        postCode: 3000,
        country: 'Australia',

      },
      contactDetails: {
        phoneNumber: 399998888,
        emailAddress: 'john.citizen@email.com'
      },
    },
    accounts: [
      {
        summary: {
          branch: 'Los Angeles',
          number: 12345,
          type: 'Checking',
          balance: 1000.00
        },
        transactions: []
      },
      {
        summary: {
          branch: 'Collingwood',
          number: '061230042',
          type: 'Savings',
          balance: 700
        },
        transactions: [
          {
            date: '20 May',
            description: 'Collingwood milk bar',
            category: 'Grocery',
            amount: 23
          },
          {
            date: '18 May',
            description: 'Food store',
            category: 'Food',
            amount: 13
          }
        ]
      },
      {
        summary: {
          branch: 'Clayton',
          number: '065220172',
          type: 'Savings',
          balance: 313.64
        },
        transactions: [
          {
            date: '21 May',
            description: 'Clayton milk bar',
            category: 'Grocery',
            amount: 63
          },
          {
            date: '19 May',
            description: 'No 8 Southbank',
            category: 'Food',
            amount: 450
          },
          {
            date: '13 April',
            description: 'State library',
            category: 'Work',
            amount: 53
          },
          {
            date: '11 March',
            description: 'Bags for sale',
            category: 'Shopping',
            amount: 78
          }
        ]
      },
      {
        summary: {
          branch: 'Mitcham',
          number: '068240742',
          type: 'Credit',
          balance: 60000
        },
        transactions: [
          {
            date: '23 June',
            description: 'Black coder coffee',
            category: 'Food',
            amount: 53
          },
          {
            date: '21 May',
            description: 'Food store',
            category: 'Grocery',
            amount: 63
          },
          {
            date: '13 April',
            description: 'Money transfer',
            category: 'Transfer',
            amount: 500
          },
          {
            date: '09 March',
            description: 'Sushi shop',
            category: 'Food',
            amount: 68
          },
          {
            date: '08 March',
            description: 'Donuts',
            category: 'Food',
            amount: 50
          }
        ]
      },
      {
        summary: {
          branch: 'Doncaster',
          number: '0612 40772',
          type: 'Cheque',
          balance: 10000
        },
        transactions: [
          {
            date: '15 April',
            description: 'Collingwood milk bar',
            category: 'Grocery',
            amount: 53
          },
          {
            date: '12 March',
            description: 'Sushi shop',
            category: 'Food',
            amount: 28
          }
        ]
      }
    ]

  };

  const getMemberData = function () {
    return { data: data };
  };

  const updatePersonalInformation = function (personalInformation) {
    data.personal.firstName = personalInformation.firstName;
    data.personal.lastName = personalInformation.lastName;
    data.personal.phoneNumber = personalInformation.contactDetails.phoneNumber;
    data.personal.emailAddress = personalInformation.contactDetails.emailAddress;

    data.personal.address.street = personalInformation.address.street;
    data.personal.address.city = personalInformation.address.city;
    data.personal.address.country = personalInformation.address.country;
    data.personal.address.postCode = personalInformation.address.postCode;
  };



  return {
    /* add the members that will be exposed publicliy */

    getMemberData: getMemberData,
    updatePersonalInformation: updatePersonalInformation,
  };


};