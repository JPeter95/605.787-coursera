(function () {
  "use strict";

  angular.module('common')
    .service('MenuService', MenuService);


  MenuService.$inject = ['$http', 'ApiPath'];
  function MenuService($http, ApiPath) {
    var service = this;
    var member = null;

    service.getCategories = function () {
      return $http.get(ApiPath + '/categories.json').then(function (response) {
        return response.data;
      });
    };


    service.getMenuItems = function (category) {
      var config = {};
      if (category) {
        config.params = { 'category': category };
      }

      return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
        return response.data;
      });
    };

    service.getMember = function () {
      // Check if member exists
      if (member == null) {
        return undefined;
      } else {
        return member
      }
    };

    service.addMember = function (newMember) {
      return $http.get(ApiPath + '/menu_items/' + newMember.short_name + '.json').then(function (response) {
        member = newMember;
        return response.data;
      }).catch(function (error) {
        console.log("Error adding member!")
        return undefined;
      });
    };

    service.getMemberItem = function () {
      // Check if member exists
      if (member == null) {
        return undefined;
      }

      // Look for Member's menu item
      return $http.get(ApiPath + '/menu_items/' + member.short_name + '.json').then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log("Error getting member menu item!")
        return undefined;
      });
    };

    service.searchItem = function (short_name) {
      // Check if menu item exists
      return $http.get(ApiPath + '/menu_items/' + short_name + '.json').then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log("Error getting menu item: " + short_name)
        return undefined;
      });
    };

  }



})();
