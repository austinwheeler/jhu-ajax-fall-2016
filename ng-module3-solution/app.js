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
      searchMade: '<',
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

  narrowCtrl.displayError = function(){
    if(narrowCtrl.searchMade &&
      (narrowCtrl.searchTerm.length >= 0) && (narrowCtrl.found.length == 0)){
      return true;
    }
    return false;
  }
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowCtrl = this;
  narrowCtrl.searchTerm = "";
  narrowCtrl.searchMade = false;
  narrowCtrl.found = MenuSearchService.getItems();

  narrowCtrl.narrowItDown = function(){
    MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
    narrowCtrl.searchMade = true;
  };

  narrowCtrl.removeItem = function(itemIndex){
    MenuSearchService.removeItem(itemIndex);
  };
}

//Menu Search service
MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath) {
  var service = this;

  var foundItems = [];
  service.getMatchedMenuItems = function(searchTerm){
    foundItems.length = 0;
    if(searchTerm == ""){
      return;
    }
    return $http({
      method: "GET",
      url: (ApiPath)
    }).then(function(result){
      console.log("processing result with search term:" + searchTerm + ":");

      for(var i = 0; i < result.data.menu_items.length; i++){
        if(result.data.menu_items[i].description.toLowerCase().includes(searchTerm.toLowerCase())){
          foundItems.push(result.data.menu_items[i])
        }
      }// end loop over data
    });// end http request and processing
  };// end getMatchedMenuItems

  service.getItems = function(){
    return foundItems;
  };

  service.removeItem = function(index){
    foundItems.splice(index, 1);
  };
}
})();
