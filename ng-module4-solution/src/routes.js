// Austin Wheeler JHU-AJAX Fall 2016
(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menuapp/templates/home.template.html'
  })

  //Category list page
  .state('categoryList', {
    url: '/category-list',
    templateUrl: 'src/menuapp/templates/category-list.template.html',
    controller: 'CategoriesController as categoriesCtrl',
    resolve: {
      categoryList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  // Item list page
  .state('items', {
    url: '/items/{categoryShortName}',
    templateUrl: 'src/menuapp/templates/item-list.template.html',
    controller: 'ItemsController as itemList',
    params: {
      categoryShortName: null
    },
    resolve: {
      items: ['$stateParams','MenuDataService',
              function ($stateParams, MenuDataService)  {
                return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
              }]
    }
  });

}

})();
