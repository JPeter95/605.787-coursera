(function () {
  'use strict';

  angular.module('MenuApp')
    .controller('ItemController', ItemController);

  // Version with resolving to 1 item based on state's resolve
  ItemController.$inject = ['items'];
  function ItemController(items) {
    var ItemCtrl = this;
    ItemCtrl.items = items;
  }
})();
