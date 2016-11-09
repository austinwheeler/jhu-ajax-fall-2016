// Austin Wheeler, JHU-AJAX Fall 2016
(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// Controller for items to buy
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.items = ShoppingListCheckOffService.getItemsToBuy();

  toBuy.markBought = function (itemIndex) {
    ShoppingListCheckOffService.markItemBought(itemIndex);
  };
}

// Controller for Already Bought Items
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;

  bought.items = ShoppingListCheckOffService.getBoughtItems();
}

// Service to handle the two lists
function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var itemsToBuy = [
    { name: "cookies", quantity: 10 },
    { name: "sugary drinks", quantity: 5 },
    { name: "bottles of pepto", quantity: 2 },
    { name: "bags of french fries", quantity: 5 },
    { name: "steaks", quantity: 100 },
    { name: "pieces of sushi", quantity: 1000 },
    { name: "brussels sprouts", quantity: 13}
  ];
  // List of shopping items already bought
  var itemsBought = [];

  service.markItemBought = function (itemIndex) {
    itemsBought.push(itemsToBuy[itemIndex])
    itemsToBuy.splice(itemIndex, 1);
  };
  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  service.getBoughtItems = function () {
    return itemsBought;
  };
}
})();
