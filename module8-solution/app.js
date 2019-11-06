(function () {
  'use strict';

  angular.module('NarrowItDownApp', [])
    .directive('foundItems', FoundItemsDirective)
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

    
  function FoundItemsDirective() { // copied from lecture 30
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'menu',
      bindToController: true
    };

    return ddo;
  }


  function FoundItemsDirectiveController() { // copied from lecture 30
    var menu = this;
  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;
    menu.found = []

    menu.getMatchedMenuItems = function (searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

      promise.then(function (response) {
        menu.found = response;
      })
        .catch(function (error) {
          console.log("Something went terribly wrong.");
        });
    }

    menu.removeItemIndex = function (itemIndex) {
      MenuSearchService.removeItemIndex(itemIndex);
    };
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    var searchTerm = ""
    var found = []

    service.getMatchedMenuItems = function (term) {
      found = [];
      searchTerm = term;

      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (response) {
        if (searchTerm) {
          found = response.data.menu_items.filter(hasSearchTerm);
          console.log("Menu Item(s) returned from search term: " + searchTerm);
        }
        return found;
      }).catch(function (error) {
        console.log("Something went terribly wrong.");
      });
    };

    function hasSearchTerm(menuItem) {
      return menuItem.description.includes(searchTerm);
    }

    service.removeItemIndex = function (itemIndex) {
      found.splice(itemIndex, 1);
      console.log("Removed item index: " + itemIndex);
    };
  }

})();
