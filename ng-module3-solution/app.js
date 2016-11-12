// Austin Wheeler, JHU-AJAX Fall 2016
(function () {
'use strict';
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiPath', "http://davids-restaurant.herokuapp.com/menu_items.json");

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

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
  var narrowCtrl = this;
  narrowCtrl.searchTerm = "";

  narrowCtrl.narrowItDown = function(){
    narrowCtrl.found = MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm);
  };
}
})();
