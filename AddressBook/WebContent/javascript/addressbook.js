/* Module for Address Book application */
var AddressBook = function(){
  /* add members here */
  var contact = {
    name: ko.observable(),
    phoneNumber: ko.observable()
  };

  var contacts = ko.observableArray([]);

  var addContact = function(){
    console.log(`Adding new contacts with name: ${contact.name()} and phone number: ${contact.phoneNumber()}`);

    // add the contact to the contacts array
    contacts.push({name: contact.name(), phoneNumber: contact.phoneNumber()});

    clearContact();
  };

  var clearContact = function() {
    contact.name(null);
    contact.phoneNumber(null);
  };

  var init = function() {
    /* Add code to initialize this module */
    ko.applyBindings(AddressBook);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add members that will be exposed publicly */
    contact: contact,
    addContact: addContact,
    contacts: contacts
  };
}();