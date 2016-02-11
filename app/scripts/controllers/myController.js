'use strict';

/**
 * @ngdoc function
 * @name angularAppApp.controller:MycontrollerCtrl
 * @description
 * # MycontrollerCtrl
 * Controller of the angularAppApp
 */
app.controller('MyCtrl', ['$scope', '$resource', 'Colab',
  function($scope, $resource, Colab) {

    $scope.filtro = '';

    Colab.query(function(colaboradores) {
      $scope.colaboradores = colaboradores;
    });

    $scope.teste = function(){
      alert('teste');
    }


  }
]);
