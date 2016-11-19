(function () {
"use strict";

angular.module('public')
.component('userInfo', {
  templateUrl: 'src/public/info/user-info.html',
  bindings: {
    user: '<',
    item: '<'
  },
  controller: UserInfoController
});

UserInfoController.$inject = ['ApiPath'];
function UserInfoController(ApiPath) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;
}

})();
