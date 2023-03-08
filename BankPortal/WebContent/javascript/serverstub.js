/// <reference path="jwt.js" />
/*global jwt */

// eslint-disable-next-line no-unused-vars
const ServerStub = function () {

  const hmacKey = 'hmacKey';

  const memberData = [
    {
      userName: 'john.citizen',
      data: {
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

      }
    }
  ];




  const getMemberData = function (clientToken) {
    const userName = validateToken(clientToken);
    for (let i = 0; i < memberData.length; i++) {
      if (memberData[i].userName == userName) {
        return memberData[i].data;
      }
    }
    return null;
  };

  const validateToken = function (clientToken) {
    const token = jwt.WebTokenParser.parse(clientToken);
    if (token.verify(hmacKey)) {
      console.log(jwt.base64urldecode(token.payloadSegment));
      const payload = JSON.parse(jwt.base64urldecode(token.payloadSegment));
      return payload.userName;
    } else {
      return false;
    }
  };



  const updatePersonalInformation = function (personalInformation, clientToken) {

    const userName = validateToken(clientToken);
    let member = null;
    for (let i = 0; i < memberData.length; i++) {
      if (memberData[i].userName == userName) {
        member = memberData[i].data;
        break;
      }
    }


    member.personal.firstName = personalInformation.firstName;
    member.personal.lastName = personalInformation.lastName;
    member.personal.phoneNumber = personalInformation.contactDetails.phoneNumber;
    member.personal.emailAddress = personalInformation.contactDetails.emailAddress;

    member.personal.address.street = personalInformation.address.street;
    member.personal.address.city = personalInformation.address.city;
    member.personal.address.country = personalInformation.address.country;
    member.personal.address.postCode = personalInformation.address.postCode;
  };

  /* months for date string */
  const monthNames = [
    'January', 'February', 'March',
    'April', 'May', 'June', 'July',
    'August', 'September', 'October',
    'November', 'December'
  ];

  const getTodaysDate = function () {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    const monthIndex = date.getMonth();
    return day + ' ' + monthNames[monthIndex];
  };
  const transferFunds = function (transferModel, clientToken) {
    const userName = validateToken(clientToken);

    let accounts = null;
    for (let i = 0; i < memberData.length; i++) {
      if (memberData[i].userName == userName) {
        accounts = memberData[i].data.accounts;
        break;
      }
    }

    transferModel.amount = +transferModel.amount;

    accounts.forEach(function (account) {
      if (account.summary.number == transferModel.toAccount.summary.number) {
        account.summary.balance = account.summary.balance + transferModel.amount;
        account.transactions.push({
          date: getTodaysDate(),
          description: transferModel.description,
          category: 'Credit',
          amount: transferModel.amount,
        });
      }

      if (account.summary.number == transferModel.fromAccount.summary.number) {
        account.summary.balance = account.summary.balance - transferModel.amount;

        account.transactions.push({
          date: getTodaysDate(),
          description: transferModel.description,
          category: 'Debit',
          amount: transferModel.amount,
        });


      }
    }
    );
  };

  const getAccounts = function (clientToken) {
    const userName = validateToken(clientToken);

    for (let i = 0; i < memberData.length; i++) {
      if (memberData[i].userName == userName) {
        return memberData[i].data.accounts;
      }
    }

    return null;
  };

  return {
    /* add the members that will be exposed publicliy */

    getMemberData: getMemberData,
    updatePersonalInformation: updatePersonalInformation,
    transferFunds: transferFunds,
    getAccounts: getAccounts,
  };


};