'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the angularAppApp
 */
app.controller('MainCtrl', ['$scope', '$resource', 'Collab',
  function($scope, $resource, Collab) {

    $scope.filterCollab = '';

    Collab.query(function(collaborators) {
      $scope.collaborators = collaborators;
    });

  }
]);
