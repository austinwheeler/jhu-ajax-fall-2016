(function () {
angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['RegistrationService']
function RegistrationController(RegistrationService) {
  var reg = this;

  reg.submit = function () {
    RegistrationService.validateMenuItem(reg.user.dish).then(function(response){
      if(response == true){
        console.log("good!");
        reg.badItem = false;
        reg.completed = true;
        RegistrationService.setUser(reg.user);
      }
      else{
        reg.badItem = true;
      }
    });
  };

  reg.isRegistered = function() {
    return RegistrationService.isRegistered();
  };

  reg.getUser = function() {
    return RegistrationService.getUser();
  };

  reg.getFavorite = function() {
    return RegistrationService.getFavorite();
  };
}

})();
