// Austin Wheeler, JHU-AJAX Fall 2016
(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      searchTerm: '@',
      onRemove: '&'
    },
    controller: NarrowItDownDirectiveController,
    controllerAs: 'narrowCtrl',
    bindToController: true
  };
  return ddo;
}

function NarrowItDownDirectiveController(){
  var narrowCtrl = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowCtrl = this;
  narrowCtrl.searchTerm = "";
  narrowCtrl.found = [];

  narrowCtrl.narrowItDown = function(){
    narrowCtrl.found = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
  };

  narrowCtrl.removeItem = function(itemIndex){
    narrowCtrl.found.splice(itemIndex, 1);
  }
}

//Menu Search service
MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm){
    return $http({
      method: "GET",
      url: (ApiPath)
    }).then(function(result){
      var foundItems = [];
      for(var i = 0; i < result.data.menu_items.length; i++){
        if(result.data.menu_items[i].description.includes(searchTerm)){
          foundItems.push(result.data.menu_items[i])
        }
      }// end loop over data
      return foundItems;
    });// end http request and processing
  };// end getMatchedMenuItems
}
})();
