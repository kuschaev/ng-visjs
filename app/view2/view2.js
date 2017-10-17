'use strict';

angular.module('myApp.view2', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngVis'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view2', {
        templateUrl: 'view2/view2.html',
        controller: 'View2Ctrl'
    });
}])

.controller('View2Ctrl', ['$scope', 'VisDataSet',
    function($scope, VisDataSet) {

        var dataGroups = new VisDataSet();
        dataGroups.add({});


        var dataItems = new VisDataSet();
        dataItems.add([
            {x: '2017-07-10', y: 40},
            {x: '2017-08-01', y: 30},
            {x: '2017-08-09', y: 60},
            {x: '2017-08-11', y: 5},
            {x: '2017-08-16', y: 45},
            {x: '2017-08-23', y: 35},
            {x: '2017-08-28', y: 70},
            {x: '2017-08-31', y: 0},
            {x: '2017-09-01', y: 1},
            {x: '2017-09-02', y: 0},
            {x: '2017-09-06', y: 2},
            {x: '2017-09-16', y: 15},
            {x: '2017-09-18', y: 90},
            {x: '2017-10-02', y: 10},
            {x: '2017-10-10', y: 55},
            {x: '2017-10-17', y: 40},
         ]);

        $scope.data = {
            items: dataItems,
            groups: dataGroups
        };

        $scope.events = {
            timechanged: function() {
                // ???
            },
            rangechanged: function() {
                // EXPLAIN DansGame
            }
        };

        $scope.options = {
            start: '2017-07-10',
            end: '2017-10-21',
            autoResize: true,
            width: '100%',
        };

    }
]);