(function () {
  "use strict";

  angular.module('public')
    .controller('SignupController', SignupController);

  SignupController.$inject = ['MenuService'];
  function SignupController(MenuService) {
    var ctrl = this;
    //ctrl.MenuService = MenuService;

    ctrl.addMember = function (member) {
      console.log("Sign-up member...");
      // Add Member info to server
      var promise = MenuService.addMember(member);

      ctrl.server_message = null;
      ctrl.item_message = null;
      

      promise.then(function (response) {
        // Validate response from server
        if (response !== undefined) {
          ctrl.server_message = "Your information has been saved.";
        } else {
          ctrl.item_message = "No such menu number exists.";
        }
      })
        .catch(function (error) {
          ctrl.server_message = "Uh Oh! Server error";
        })
    };


    ctrl.searchItem = function (short_name) {
      ctrl.server_message = null;
      ctrl.item_message = null;

      // Get Member item from server
      var promise = MenuService.searchItem(short_name);

      promise.then(function (response) {
        // Validate response from server
        if (response === undefined) {
          ctrl.item_message = "No such menu number exists.";
        } else {
          console.log(short_name + " is a valid dish!")
        }
      })
        .catch(function (error) {
          ctrl.server_message = "Uh Oh! Server error";
        })
    };
  }


})();
