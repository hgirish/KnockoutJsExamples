export default class ProductsGrid {
  constructor() {
    this.productsGrid = {
      name: ko.observable('Bob')
    };
    ko.applyBindings(this.productsGrid);
  }

}

new ProductsGrid();