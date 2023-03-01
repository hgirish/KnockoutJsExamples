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

  const init = function () {
    applyCurrencyBinding();
  }();

  return {
    // nothing to return
  };
}();

