const ConfigureKnockout = function () {
  const applyCurrencyBinding = function () {
    ko.bindingHandlers.currency = {
      update: function (element, valueAccessor) {
        const value = ko.utils.unwrapObservable(valueAccessor()) || 0;
        
        const formattedText = '$' + Number(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
        $(element).text(formattedText);
      }
    };

  };


  const createMementoObservable = function () {
    ko.mementoObservable = function (initialValue) {
      const state = ko.observable(initialValue);

      let mementoState = initialValue;

      state.commit = function () {
        mementoState = state();
      };

      state.reset = function () {
        state(mementoState);
      };

      return state;
    };
  };

  const configureValidationPlugin = function () {
    ko.validation.init({
      errorElementClass: 'is-invalid',
      errorMessageClass: 'invalid-feedback'
    });
  };



  const init = function () {
    applyCurrencyBinding();
    createMementoObservable();
    configureValidationPlugin();
  }();

  return {
    // nothing to return
  };
}();

