const ConfigureKnockout = function () {
  const applyCurrencyBinding = function () {
    ko.bindingHandlers.currency = {
      update: function (element, valueAccessor) {
        const value = ko.utils.unwrapObservable(valueAccessor()) || 0;
        const formattedText = '$' + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
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



  const init = function () {
    applyCurrencyBinding();
    createMementoObservable();
  }();

  return {
    // nothing to return
  };
}();

