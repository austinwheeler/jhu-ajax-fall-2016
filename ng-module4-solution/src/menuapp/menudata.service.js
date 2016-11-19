// Austin Wheeler JHU-AJAX Fall 2016
(function () {
'use strict';

angular.module('Data')
.service('MenuDataService', MenuDataService)
.constant('AllPath', 'https://davids-restaurant.herokuapp.com/categories.json')
.constant('CatPath', 'https://davids-restaurant.herokuapp.com/menu_items.json');

MenuDataService.$inject = ['$http', 'AllPath', 'CatPath'];
function MenuDataService($http, AllPath, CatPath){
  var service = this;

  service.getAllCategories = function(){
    return $http({
      method: "GET",
      url: (AllPath)
    }).then(function(result){
      return result.data;
    });// end http request and processing
  };// end getAllCategories

  service.getItemsForCategory = function(categoryShortName){
    return $http({
      method: "GET",
      params: {category: categoryShortName},
      url: (CatPath)
    }).then(function(result){
      return result.data.menu_items;
    });// end http request and processing
  };// end getItemsForCategory
}
})();
