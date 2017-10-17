'use strict';

angular.module('myApp.view3', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngVis'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/view3', {
        templateUrl: 'view3/view3.html',
        controller: 'View3Ctrl'
    });
}])

.controller('View3Ctrl', ['$scope', 'VisDataSet',
    function($scope, VisDataSet) {

        var nodes = [];
            /*[{"id":"000ECU","label":"000ECU","size":10,"color":"#93D276","shape":"circle","shadow":true},
            {"id":"caw182793_000ECU_not_installed_0","label":"caw182793","size":5,"color":"#7F8489","shape":"square","shadow":true},
            {"id":"000EGG","label":"000EGG","size":20,"color":"#93D276","shape":"circle","shadow":true,"borderWidth":5,"level":1,"shadow.size":20},
            {"id":"abhi-cloud-win2012-64_000EGG_in_active_0","label":"abhi-cloud-win2012-64","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"abhi-rh-64-cloud_000EGG_in_active_1","label":"abhi-rh-64-cloud","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"anand-win28r2_000EGG_in_active_2","label":"anand-win28r2","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"ajay-pc_000EGG_in_active_3","label":"ajay-pc","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"brk_000EGG_in_active_4","label":"brk","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"brk-win64_000EGG_in_active_5","label":"brk-win64","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"banu-wnd_000EGG_in_active_6","label":"banu-wnd","size":5,"color":"#FF2A00","shape":"square","shadow":true},
            {"id":"cas161850_000EGG_in_active_7","label":"cas161850","size":5,"color":"#FF2A00","shape":"square","shadow":true}];
            */

        var edges = [];
            /*[{"from":"000EGG","to":"000ECU"},
            {id: 2, "from":"000ECU","to":"caw182793_000ECU_not_installed_0"},
            {"from":"000EGG","to":"abhi-cloud-win2012-64_000EGG_in_active_0"},
            {"from":"000EGG","to":"abhi-rh-64-cloud_000EGG_in_active_1"},
            {"from":"000EGG","to":"anand-win28r2_000EGG_in_active_2"},
            {"from":"000EGG","to":"ajay-pc_000EGG_in_active_3"},
            {"from":"000EGG","to":"brk_000EGG_in_active_4"},
            {"from":"000EGG","to":"brk-win64_000EGG_in_active_5"},
            {"from":"000EGG","to":"banu-wnd_000EGG_in_active_6"},
            {"from":"000EGG","to":"cas161850_000EGG_in_active_7"}];*/

        var LENGTH_MAIN = 350,
            LENGTH_SERVER = 150,
            LENGTH_SUB = 50,
            WIDTH_SCALE = 2,
            GREEN = 'green',
            RED = '#C5000B',
            ORANGE = 'orange',
            //GRAY = '#666666',
            GRAY = 'gray',
            BLACK = '#2B1B17';

        nodes.push({id: 1, label: '192.168.0.1', group: 'switch', value: 10});
        nodes.push({id: 2, label: '192.168.0.2', group: 'switch', value: 8});
        nodes.push({id: 3, label: '192.168.0.3', group: 'switch', value: 6});
        edges.push({from: 1, to: 2, length: LENGTH_MAIN, width: WIDTH_SCALE * 6, label: '0.71 mbps'});
        edges.push({from: 1, to: 3, length: LENGTH_MAIN, width: WIDTH_SCALE * 4, label: '0.55 mbps'});

        // group around 2
        for (var i = 100; i <= 104; i++) {
            var value = 1;
            var width = WIDTH_SCALE * 2;
            var color = GRAY;
            var label = null;

            if (i === 103) {
                value = 5;
                width = 3;
            }
            if (i === 102) {
                color = RED;
                label = 'error';
            }

            nodes.push({id: i, label: '192.168.0.' + i, group: 'desktop', value: value});
            edges.push({from: 2, to: i, length: LENGTH_SUB, color: color, fontColor: color, width: width, label: label});
        }
        nodes.push({id: 201, label: '192.168.0.201', group: 'desktop', value: 1});
        edges.push({from: 2, to: 201, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE});

        // group around 3
        nodes.push({id: 202, label: '192.168.0.202', group: 'desktop', value: 4});
        edges.push({from: 3, to: 202, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE * 2});
        for (var j = 230; j <= 231; i++ ) {
            nodes.push({id: j, label: '192.168.0.' + j, group: 'mobile', value: 2});
            edges.push({from: 3, to: j, length: LENGTH_SUB, color: GRAY, fontColor: GRAY, width: WIDTH_SCALE});
        }

        // group around 1
        nodes.push({id: 10, label: '192.168.0.10', group: 'server', value: 10});
        edges.push({from: 1, to: 10, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 6, label: '0.92 mbps'});
        nodes.push({id: 11, label: '192.168.0.11', group: 'server', value: 7});
        edges.push({from: 1, to: 11, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 3, label: '0.68 mbps'});
        nodes.push({id: 12, label: '192.168.0.12', group: 'server', value: 3});
        edges.push({from: 1, to: 12, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE, label: '0.3 mbps'});

        nodes.push({id: 204, label: 'Internet', group: 'internet', value: 10});
        edges.push({from: 1, to: 204, length: 200, width: WIDTH_SCALE * 3, label: '0.63 mbps'});


        // legend
        /*
        var mynetwork = document.getElementById('mynetwork');
        */
        // var x = 0;//- mynetwork.clientWidth / 2 + 50;
        // var y = 0;//- mynetwork.clientHeight / 2 + 50;

        // var step = 70;
        // nodes.push({id: 1000, /*x: x, y: y,*/ label: 'Internet', group: 'internet', value: 1, fixed: true, physics:false});
        // nodes.push({id: 1001, /*x: x, y: y + step,*/ label: 'Switch', group: 'switch', value: 1, fixed: true,  physics:false});
        // nodes.push({id: 1002, /*x: x, y: y + 2 * step,*/ label: 'Server', group: 'server', value: 1, fixed: true,  physics:false});
        // nodes.push({id: 1003, /*x: x, y: y + 3 * step,*/ label: 'Computer', group: 'desktop', value: 1, fixed: true,  physics:false});
        // nodes.push({id: 1004, /*x: x, y: y + 4 * step,*/ label: 'Smartphone', group: 'mobile', value: 1, fixed: true,  physics:false});

        $scope.data = {
            nodes: nodes,
            edges: edges
       };

        $scope.events = {

        };

        $scope.options = {
            autoResize: true,
            height: '800',
            width: '100%',
            layout: {
                improvedLayout: false
            },
            groups: {
                'switch': {
                    shape: 'triangle',
                    color: '#FF9900' // orange
                },
                desktop: {
                    shape: 'dot',
                    color: "#2B7CE9" // blue
                },
                mobile: {
                    shape: 'dot',
                    color: "#5A1E5C" // purple
                },
                server: {
                    shape: 'square',
                    color: "#C5000B" // red
                },
                internet: {
                    shape: 'square',
                    color: "#109618" // green
                }
            }
        };
    }
]);