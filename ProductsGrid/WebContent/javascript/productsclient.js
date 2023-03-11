// eslint-disable-next-line no-unused-vars
const ProductsClient = function (url) {
  const baseUrl = url;

  const getProducts = function (callback) {
    $.ajax({
      url: baseUrl + '/products',
      type: 'GET',

    }).done(function (result) {
      console.log('Products retrieved: ' + JSON.stringify(result));
      callback(result);
    });
  };

  const deleteProduct = function (product, callback) {
    console.log('Deleting product with id: ' + product.data.id());
    $.ajax({
      url: baseUrl + '/products/' + product.data.id(),
      type: 'DELETE',

    }).done(function () {
      callback(product);
    });
  };

  return {
    getProducts: getProducts,
    deleteProduct: deleteProduct,
  };
};