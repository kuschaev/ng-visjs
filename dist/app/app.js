'use strict';

// Declare app level module which depends on views, and components

angular.module('myApp', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize', 'myApp.view1', 'myApp.view2', 'myApp.view3', 'myApp.version']).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({ redirectTo: '/view1' });
}]).controller('AppCtrl', ['$scope', function ($scope) {

  $scope.currentNavItem = 'view1';
  /*
  $scope.goto = function(page) {
    console.log("Goto" + page);
  };
  */
}]);
//# sourceMappingURL=app.js.map