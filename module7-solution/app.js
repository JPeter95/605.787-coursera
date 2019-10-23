(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    .filter('CustomFilter', CustomFilter);

  /*------  To Buy Controller ------*/
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getBuyItems();
    toBuy.buyItem = function (item) {
      ShoppingListCheckOffService.addToBought(item);
    }
  }

  /*------  Already Bought Controller ------*/
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var service = this;
    // Default Buy Items
    var buyItems = [
      {
        name: "Cookies",
        pricePerItem: 3,
        quantity: 10
      },
      {
        name: "More Cookies",
        pricePerItem: 3,
        quantity: 5
      },
      {
        name: "Almond Milk",
        pricePerItem: 4,
        quantity: 3
      },
      {
        name: "Tea",
        pricePerItem: 8,
        quantity: 2
      },
      {
        name: "Coffee",
        pricePerItem: 10,
        quantity: 1,
      }
    ];
    var boughtItems = [];

    // Methods
    service.getBuyItems = function () {
      return buyItems;
    };

    service.getBoughtItems = function () {
      return boughtItems;
    };

    service.addToBought = function (item) {
      if (item.quantity < 1 ) {
        item.quantity = 0;
      }

      boughtItems.push(item);
      service.removeItem(item);
    };
    
    service.removeItem = function (item) {
      var index = buyItems.findIndex(otherItem => otherItem.name == item.name);
      if (index !== -1) {
        buyItems.splice(index, 1)
      };
    };
  }

  /*------  Custom Filter (for price $$$) ------*/
  function CustomFilter() {
    return function (price) {
      return '$$$' + price;
    }
  };
})();