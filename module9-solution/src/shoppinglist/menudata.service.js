(function () {
  'use strict';

  angular.module('data')
    .service('MenuDataService', MenuDataService)
    .constant('REST_Endpoint', "https://davids-restaurant.herokuapp.com");


  MenuDataService.$inject = ['$http', 'REST_Endpoint'];
  function MenuDataService($http, REST_Endpoint) {
    var service = this;
    service.searchTerm = "";

    // return all categories from rest endpoint
    service.getAllCategories = function () {
      var response = $http({
        method: "GET",
        url: (REST_Endpoint + "/categories.json"),
      });

      return response.then(function (result) {
        return result.data;
      }).catch(function (error) {
        console.log("Oops! Failed getAllCategories()");
      });
    };


    // return items from specific category from rest endpoint
    service.getItemsForCategory = function (categoryShortName) {
      var response = $http({
        method: "GET",
        url: (REST_Endpoint + "/menu_items.json?category=" + categoryShortName),
      });

      return response.then(function (result) {
        return result.data.menu_items;
      }).catch(function (error) {
        console.log("Oops! Failed getItemsForCategory() for " + categoryShortName);
      });;
    };

  }
})();
