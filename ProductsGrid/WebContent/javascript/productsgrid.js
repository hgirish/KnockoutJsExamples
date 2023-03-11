/*global ProductsClient */

const ProductsGrid = function () {

  const displayMode = {
    view: 'VIEW',
    edit: 'EDIT'
  };

  const productModel = function (item, itemMode) {
    this.data = {};
    this.data.id = ko.observable(item.id);
    this.data.name = ko.observable(item.name);
    this.data.description = ko.observable(item.description);
    this.data.price = ko.observable(item.price);
    this.displayMode = ko.observable(itemMode);
  };

  const products = ko.observableArray();


  const client = ProductsClient('http://localhost:8080');

  const retrieveProducts = function () {
    console.log('Retrieving products from server...');
    client.getProducts(retrieveProductsCallback);
  };

  const retrieveProductsCallback = function (data) {
    data.forEach(function (item) {
      products.push(new productModel(item, displayMode.view));
    });
  };

  const deleteProduct = function (product) {
    client.deleteProduct(product, deleteProductCallback);
  };

  const deleteProductCallback = function (product) {
    products.remove(product);
    console.log('Product with id ' + product.data.id() + ' deleted');
  };

  const addProduct = function () {
    const item = { sku: null, name: null, description: null, price: null };
    products.push(new productModel(item, displayMode.edit));
  };

  const saveProduct = function (product) {
    client.addProduct(product, saveProductCallaback);
  };

  const saveProductCallaback = function (product, id) {
    product.data.id(id);
    product.displayMode(displayMode.view);
    console.log('Product saved with id ' + product.data.id());
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
    deleteProduct: deleteProduct,
    displayMode: displayMode,
    addProduct: addProduct,
    saveProduct: saveProduct,
  };

}();