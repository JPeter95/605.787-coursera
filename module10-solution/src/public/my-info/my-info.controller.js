(function () {
  "use strict";

  angular.module('public')
    .controller('InfoController', InfoController);

  InfoController.$inject = ['member', 'memberItem'];
  function InfoController(member, memberItem) {
    var $ctrl = this;
    $ctrl.member = member;
    $ctrl.memberItem = memberItem;
  }


})();
