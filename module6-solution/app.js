(function () {
  'use strict';

  angular.module('LunchCheckApp', [])
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = '';
    $scope.messageStyle = '';
    $scope.inputStyle = '';

    $scope.checkInput = function () {
      var input = $scope.userInput;

      if (!input) {
        $scope.message = 'Please enter data first';
        $scope.messageStyle = { 'color' : 'red' };
        $scope.inputStyle = { 'border-color' : 'red' };
        return;
      }

      var totalItemCount = input.split(',').filter(function (item) {
        return item.trim().length > 0;
      }).length;

      if (totalItemCount === 0) {
        // Empty data
        $scope.message = 'Please enter data first';
        $scope.messageStyle = { 'color' : 'red' };
        $scope.inputStyle = { 'border-color' : 'red' };
      } else {
        // Display message
        $scope.message = totalItemCount > 3 ? 'Too much!' : 'Enjoy!';
        $scope.messageStyle = { 'color' : 'green' };
        $scope.inputStyle = { 'border-color' : 'green' };
      }
    }

  }

})();
