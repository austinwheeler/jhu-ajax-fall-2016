// Austin Wheeler, JHU-AJAX Fall 2016
(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");

// Directive for found items
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

//Directive controller
function NarrowItDownDirectiveController(){
  var narrowCtrl = this;
  // Whether or not to display the "empty" text
  narrowCtrl.displayError = function(){
    if(narrowCtrl.searchMade &&
      (narrowCtrl.searchTerm.length >= 0) && (narrowCtrl.found.length == 0)){
      return true;
    }
    return false;
  }
}

// Controller for the main search portion of the application
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowCtrl = this;
  narrowCtrl.searchTerm = ""; // the search term from the user
  narrowCtrl.searchMade = false; // whether or not a search has been made
  narrowCtrl.found = MenuSearchService.getItems(); // the found items

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
  // list of items found by the search service
  var foundItems = [];
  // method to perform the search and update the list
  service.getMatchedMenuItems = function(searchTerm){
    foundItems.length = 0;
    if(searchTerm == ""){
      return;
    }
    return $http({
      method: "GET",
      url: (ApiPath)
    }).then(function(result){
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
