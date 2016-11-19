// Austin Wheeler JHU-AJAX Fall 2016
(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['MenuDataService', 'items'];
function ItemsController(MenuDataService, items) {
  var itemList = this;
  itemList.items = items;
}

})();
