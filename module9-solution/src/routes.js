// This file was refactored from Lecture 40

(function () {
  'use strict';

  angular.module('MenuApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {

    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'src/shoppinglist/templates/home.template.html'
      })

      // Category page
      .state('categories', {
        url: '/categories',
        templateUrl: 'src/shoppinglist/templates/categories.template.html',
        controller: 'CategoriesController as CategoriesCtrl',
        resolve: {
          categories: ['MenuDataService', function (MenuDataService) {
            console.log("Test getAllCategories()");
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Item detail
      .state('items', {
        url: '/items/{categoryShortName}',
        templateUrl: 'src/shoppinglist/templates/item-detail.template.html',
        controller: 'ItemController as ItemCtrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                .then(function (items) {
                  return items;
                });
            }]
        }
      });
  }
})();
