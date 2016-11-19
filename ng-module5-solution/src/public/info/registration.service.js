(function () {
"use strict";

angular.module('public')
.service('RegistrationService', RegistrationService);

RegistrationService.$inject = ['$http', 'ApiPath'];
function RegistrationService($http, ApiPath) {
  var service = this;
  service.item = {};

  service.setUser = function(newUser){
    service.user = newUser;
  };

  service.getUser = function(){
    return service.user;
  };

  service.getFavorite = function(){
    return service.item;
  };

  service.isRegistered = function(){
    if(service.user != undefined){
      return true;
    }
    return false;
  };

  service.validateMenuItem = function(shortName){
    return $http({
        url: (ApiPath + '/menu_items/' + shortName + '.json'),
        method: "GET"
      }).then(
              function (response) { //item found
                service.item = response.data;
                return true;
              },
              function(response){   //item not found
                return false;
              }
        );
  };
}
})();
