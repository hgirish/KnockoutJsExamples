const BankPortal = function () {
  /* add members here */

  /* the model */
  const member = {

  };

  /* method to initialize the module */
  const init = function () {
    /* add code to initialize this module */

    /* apply ko bindings */
    ko.applyBindings(BankPortal);
  };

  /* execute the init function when the DOM is ready */
  $(init);

  return {
    /* add the members that will be exposed publicliy */
    member: member
  };


};