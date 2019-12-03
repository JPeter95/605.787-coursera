(function () {
  "use strict";

  angular.module('public')
    .component('myInfo', {
      templateUrl: 'src/public/my-info/my-info.html',
      bindings: {
        member: '<',
        memberItem: '<'
      },
      controller: InfoController
    });

  // Need to inject ApiPath for server into controller
  InfoController.$inject = ['ApiPath'];
  function InfoController(ApiPath) {
    var ctrl = this;
    ctrl.basePath = ApiPath;
  }

})();
