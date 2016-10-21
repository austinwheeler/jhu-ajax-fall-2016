// Austin Wheeler, JHU-AJAX Fall 2016

(function () {
'use strict';

angular.module('LunchCalculator', [])

.controller('LunchCaculatorController', function ($scope) {
  $scope.lunch = "";
  $scope.result = "";
  $scope.ansStyle= "";

  $scope.displayResult = function () {
    // Create the array from input and get its length
    var lunchItems = getLunchItems($scope.lunch, ",");
    removeEmpty(lunchItems);
    var lunchItemsTotal = getNumberOfLunchItems(lunchItems);
    // Display the correct result to the user
    if(lunchItemsTotal == 0){
      $scope.ansStyle= {'color': 'red'}
      $scope.result = "Please enter data first";
    }
    else if(lunchItemsTotal <= 3){
      $scope.ansStyle= {'color': 'green'};
      $scope.result = "Enjoy!";
    }
    else if(lunchItemsTotal > 3){
      $scope.ansStyle= {'color': 'green'};
      $scope.result = "Too much!";
    }
  };

  // return the array of strings from the comma delimited string
  function getLunchItems(lunchString, delimiter){
    var items = lunchString.split(delimiter);
    return items;
  }

  // Loop over the array and remove any empty strings
  function removeEmpty(lunchItems) {
    var indexToRemove = lunchItems.indexOf("");
    while(indexToRemove != -1){
      lunchItems.splice(indexToRemove, 1);
      indexToRemove = lunchItems.indexOf("");
    }
  }

  // Return the number of lunch items
  function getNumberOfLunchItems(lunchItems) {
    var numItems = lunchItems.length;
    return numItems;
  }

});


})();
