'use strict';

angular.module('myApp.view1', ['ngRoute', 'ngMaterial', 'ngMessages', 'ngSanitize', 'ngVis']).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
        templateUrl: 'view1/view1.html',
        controller: 'View1Ctrl'
    });
}]).controller('View1Ctrl', ['$scope', 'VisDataSet', function ($scope, VisDataSet) {

    var nodes = [];

    var edges = [];

    var LENGTH_MAIN = 350,
        LENGTH_SERVER = 150,
        LENGTH_SUB = 50,
        WIDTH_SCALE = 2,
        RED = '#C5000B',
        GRAY = '#666666',
        BLACK = '#2B1B17';

    nodes.push({ id: 1, label: '192.168.0.1', group: 'switch', value: 10 });
    nodes.push({ id: 2, label: '192.168.0.2', group: 'switch', value: 8 });
    nodes.push({ id: 3, label: '192.168.0.3', group: 'switch', value: 6 });
    edges.push({ from: 1, to: 2, length: LENGTH_MAIN, width: WIDTH_SCALE * 6, label: '0.71 mbps' });
    edges.push({ from: 1, to: 3, length: LENGTH_MAIN, width: WIDTH_SCALE * 4, label: '0.55 mbps' });

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
            label = 'OOPS!((9';
        }

        nodes.push({ id: i, label: '192.168.0.' + i, group: 'desktop', value: value });
        edges.push({ from: 2, to: i, length: LENGTH_SUB, color: color, fontColor: color, width: width, label: label });
    }
    nodes.push({ id: 201, label: '192.168.0.201', group: 'desktop', value: 1 });
    edges.push({ from: 2, to: 201, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE });

    // group around 3
    nodes.push({ id: 202, label: '192.168.0.202', group: 'desktop', value: 4 });
    edges.push({ from: 3, to: 202, length: LENGTH_SUB, color: GRAY, width: WIDTH_SCALE * 2 });
    for (var i = 230; i <= 231; i++) {
        nodes.push({ id: i, label: '192.168.0.' + i, group: 'mobile', value: 2 });
        edges.push({ from: 3, to: i, length: LENGTH_SUB, color: GRAY, fontColor: GRAY, width: WIDTH_SCALE });
    }

    // group around 1
    nodes.push({ id: 10, label: '192.168.0.10', group: 'server', value: 10 });
    edges.push({ from: 1, to: 10, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 6, label: '0.92 mbps' });
    nodes.push({ id: 11, label: '192.168.0.11', group: 'server', value: 7 });
    edges.push({ from: 1, to: 11, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE * 3, label: '0.68 mbps' });
    nodes.push({ id: 12, label: '192.168.0.12', group: 'server', value: 3 });
    edges.push({ from: 1, to: 12, length: LENGTH_SERVER, color: GRAY, width: WIDTH_SCALE, label: '0.3 mbps' });

    nodes.push({ id: 204, label: 'Internet', group: 'internet', value: 10 });
    edges.push({ from: 1, to: 204, length: 200, width: WIDTH_SCALE * 3, label: '0.63 mbps' });

    // legend
    /*
    var mynetwork = document.getElementById('mynetwork');
    */
    var x = -400; //- mynetwork.clientWidth / 2 + 50;
    var y = -200; //- mynetwork.clientHeight / 2 + 50;

    var step = 70;
    nodes.push({ id: 1000, x: x, y: y,
        label: 'Internet', group: 'internet', value: 1, fixed: true, physics: false });
    nodes.push({ id: 1001, x: x, y: y + step,
        label: 'Switch', group: 'switch', value: 1, fixed: true, physics: false });
    nodes.push({ id: 1002, x: x, y: y + 2 * step,
        label: 'Server', group: 'server', value: 1, fixed: true, physics: false });
    nodes.push({ id: 1003, x: x, y: y + 3 * step,
        label: 'Computer', group: 'desktop', value: 1, fixed: true, physics: false });
    nodes.push({ id: 1004, x: x, y: y + 4 * step,
        label: 'Smartphone', group: 'mobile', value: 1, fixed: true, physics: false });

    $scope.data = {
        nodes: new vis.DataSet(nodes),
        edges: new vis.DataSet(edges)
    };

    $scope.options = {
        autoResize: true,
        height: '800',
        width: '100%',
        layout: {
            improvedLayout: false
        },
        groups: {
            switch: {
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

    $scope.selectedNodes = [];
    $scope.selectedEdges = [];

    $scope.hiddenNodes = [];
    $scope.hiddenEdges = [];

    $scope.activeNode = "Avada Kedavra";

    $scope.events = {
        doubleClick: function doubleClick(doubleClicked) {
            // doubleClicked.event = "[original event]";
            // document.getElementById('eventDC').innerHTML = '<h2>doubleClick event:</h2>' + JSON.stringify(doubleClicked, null, 4);
            $scope.activeNode = doubleClicked.nodes.toString();
        },

        selectEdge: function selectEdge(selected) {
            $scope.selectedEdges = [];
            $scope.selectedEdges = selected.edges;
            $scope.selectedNodes = [];
            $scope.selectedNodes.push(selected.nodes);
        },
        selectNode: function selectNode(selected) {
            // console.log(selected);
            console.log("Selected node: " + selected.nodes.toString());

            // EBALA
            /*switch (selected.nodes.toString()) {
                case '1000':
                    console.log($scope.data.nodes);
                      break;
                case '1001':
                      break;
                case '1002':
                      break;
                case '1003':
                      break;
                case '1004':
                      break;
                default:
              }*/
        }
    };

    $scope.hideSelection = function () {
        alert("I will make those edges disappear!!");
        var selectedNodeId = $scope.selectedNodes;

        if (selectedNodeId.length === 0) {
            alert("You have not selected a node to disappear");
        }

        if ($scope.selectedNodes.length > 0) {
            $scope.selectedNodes.forEach(function (nodeId) {
                $scope.data.nodes.update([{ id: nodeId.toString(), hidden: true }]);
                $scope.hiddenNodes.push(nodeId);
            });
        }

        if ($scope.selectedEdges.length > 0) {
            $scope.selectedEdges.forEach(function (edgeId) {
                $scope.data.edges.update([{ id: edgeId.toString(), hidden: true }]);
                $scope.hiddenEdges.push(edgeId);
            });
        }
    };

    $scope.showHiddenNodesAndEdges = function () {
        if ($scope.hiddenNodes.length === 0) {
            alert("There are no disappeared nodes yet");
            return;
        }

        $scope.hiddenEdges.forEach(function (edgeId) {
            $scope.data.edges.update([{ id: edgeId.toString(), hidden: false }]);
        });
        $scope.selectedEdges = [];

        $scope.hiddenNodes.forEach(function (nodeId) {
            $scope.data.nodes.update([{ id: nodeId.toString(), hidden: false }]);
        });
        $scope.selectedNodes = [];
    };
}]);
//# sourceMappingURL=view1.js.map