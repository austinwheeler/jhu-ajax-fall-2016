(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['MenuDataService', 'categoryList'];
function CategoriesController(MenuDataService, categoryList) {
  var categoriesCtrl = this;
  categoriesCtrl.categoryList = categoryList;
}

})();
