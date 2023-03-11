const ProductsGrid = function () {

  const productModel = function (item) {
    this.data = {};
    this.data.id = ko.observable(item.id);
    this.data.name = ko.observable(item.name);
    this.data.description = ko.observable(item.description);
    this.data.price = ko.observable(item.price);
  };

  const products = ko.observableArray();

  const client = ProductsClient('http://localhost:8080');

  const retrieveProducts = function () {
    console.log('Retrieving products from server...');
    client.getProducts(retrieveProductsCallback);
  };

  const retrieveProductsCallback = function (data) {
    data.forEach(function (item) {
      products.push(new productModel(item));
    });
  };

  const init = function () {

    retrieveProducts();

    ko.applyBindings(ProductsGrid);
  };

  $(init);

  return {
    productModel: productModel,
    products: products,
    retrieveProducts: retrieveProducts,
  };

}();