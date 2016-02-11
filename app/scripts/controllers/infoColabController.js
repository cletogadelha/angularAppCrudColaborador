'use strict';

app.controller('InfoColabCtrl', ['$scope', '$resource', 'Colab', 'Map','$routeParams','$window',
      function($scope, $resource, Colab, Map,$routeParams,$window) {

        $scope.objFlow = {};

        $scope.iconeContato = '';

        $scope.mensagemSucesso = '';
        $scope.messageErro = '';

        Colab.get({id:$routeParams.idColab})
          .$promise.then(function(colab) {
          $scope.colaborador = colab;
          if($scope.colaborador.endereco)
            $scope.search();
          });

        $scope.removeColaborador = function(id){
            Colab.delete({id:$scope.colaborador.id}, function() {
              $scope.mensagemSucesso="Colaborador Removido com sucesso!";
              $window.location.href = '#/lista';
            });
        }

        $scope.setaClasseContato = function(descricao){
          if(descricao === 'Telefone Fixo'){
              return 'fa fa-phone fa-2x';
          }else if(descricao === 'Telefone Celular'){
              return 'fa fa-mobile fa-2x';
          }else if(descricao === 'E-Mail'){
              return 'fa fa-inbox fa-2x';
          }else if(descricao === 'Facebook'){
              return  'fa fa-facebook fa-2x';
          }else if(descricao ===  'Linkedin'){
              return 'fa fa-linkedin fa-2x';
          }else if(descricao === 'Google+'){
              return 'fa fa-google-plus fa-2x';
          }
        }

          $scope.map = {
            "center": {
              "latitude": 52.47491894326404,
              "longitude": -1.8684210293371217
            },
            "zoom": 15
          }; //TODO:  set location based on users current gps location

          $scope.place = {};
          $scope.search = function() {
            $scope.apiError = false;
            Map.search($scope.colaborador.endereco)
              .then(
                function(res) {
                  Map.addMarker(res);
                  $scope.place.name = res.name;
                  $scope.place.lat = res.geometry.location.lat();
                  $scope.place.lng = res.geometry.location.lng();
                },
                function(status) { // error
                  $scope.apiError = true;
                  $scope.apiStatus = status;
                  $scope.messageErro="Erro ao carregar o mapa;"
                }
              );
          }

          Map.init();
        }
      ]);
