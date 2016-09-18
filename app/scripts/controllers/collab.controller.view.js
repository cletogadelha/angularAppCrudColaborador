'use strict';

app.controller('CollabCtrlView', ['$scope', '$resource', 'Collab', 'Map','$routeParams','$window',
      function($scope, $resource, Collab, Map,$routeParams,$window) {

        $scope.objFlow = {};

        $scope.contactIcon = '';

        $scope.successMessage = '';
        $scope.errorMessage = '';

        Collab.get({id:$routeParams.idCollab})
          .$promise.then(function(collab) {
          $scope.collaborator = collab;
          if($scope.collaborator.address)
            $scope.search();
          });

        $scope.removeCollaborator = function(id){
            Collab.delete({id:$scope.collaborator.id}, function() {
              $scope.successMessage="Collaborator Removed!";
              $window.location.href = '#/list';
            });
        }

        $scope.setContactClass = function(description){
          if(description === 'Fixed Phone'){
              return 'fa fa-phone fa-2x';
          }else if(description === 'Mobile Phone'){
              return 'fa fa-mobile fa-2x';
          }else if(description === 'E-Mail'){
              return 'fa fa-inbox fa-2x';
          }else if(description === 'Facebook'){
              return  'fa fa-facebook fa-2x';
          }else if(description ===  'Linkedin'){
              return 'fa fa-linkedin fa-2x';
          }else if(description === 'Google+'){
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
            Map.search($scope.collaborator.address)
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
                  $scope.messageErro="Oops! Error loading the map;"
                }
              );
          }

          Map.init();
        }
      ]);
