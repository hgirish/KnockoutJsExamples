// eslint-disable-next-line no-unused-vars
const ProductsClient = function (url) {
  const baseUrl = url;

  const getProducts = function (callback) {
    $.ajax({
      url: baseUrl + '/products',
      type: 'GET',
      success: function (result) {
        console.log('Products retrieved: ' + JSON.stringify(result));
        callback(result);
      }
    });
  };

  return {
    getProducts: getProducts
  };
};