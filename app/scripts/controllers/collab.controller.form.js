'use strict';

app.controller('CollabCtrl', ['$scope', '$resource', 'Collab', 'Map', '$routeParams', '$window', '$http',
      function($scope, $resource, Collab, Map, $routeParams, $window, $http) {

        $scope.ContactIcon = '';
        $scope.successMessage = '';
        $scope.errorMessage = '';
        $scope.place = {};

          var resetCollab = function(){
            $scope.collaborator = {
              id: '',
              name: '',
              workLocation: '',
              biography: '',
              profession: '',
              competencies: [],
              contactList: [],
              address: ''
            }
          }

          if ($routeParams.idCollab) {
            Collab.get({
                id: $routeParams.idCollab
              })
              .$promise.then(function(collab) {
                $scope.collaborator = collab;
                Map.init();
                if ($scope.collaborator.address) {
                  $scope.search();
                }
              });
          } else {
            resetCollab();
          }

          $scope.availableProfessions = [{
            profession: 'Software Developer'
          }, {
            profession: 'Software Engineer'
          }, {
            profession: 'Project Manager'
          }]

          $scope.availableWorkLocations = [{
            location: 'Software Factory'
          }, {
            location: 'Allocated at Client A'
          }, {
            location: 'Allocated at Client B'
          }]

          $scope.setProfession = function(selected) {
            $scope.collaborator.profession = selected.originalObject.profession;
          }

          $scope.setWorkLocation = function(selected) {
            $scope.collaborator.workLocation = selected.originalObject.location;
          }

          $scope.availableCompetencies = [{
            description: 'Java'
          }, {
            description: 'JavaEE'
          }, {
            description: 'Spring'
          }, {
            description: 'Angular'
          }, {
            description: 'MEAN'
          }]

          $scope.removeCollaborator = function(id) {
            Collab.delete({
              id: $scope.collaborator.id
            }, function() {
              $scope.successMessage = "Collaborator Removed!";
              $window.location.href = '#/list';
            });
          }

          $scope.setContactClass = function(description) {
            if (description === 'Fixed Phone') {
              return 'fa fa-phone fa-2x';
            } else if (description === 'Mobile Phone') {
              return 'fa fa-mobile fa-2x';
            } else if (description === 'E-Mail') {
              return 'fa fa-inbox fa-2x';
            } else if (description === 'Facebook') {
              return 'fa fa-facebook fa-2x';
            } else if (description === 'Linkedin') {
              return 'fa fa-linkedin fa-2x';
            } else if (description === 'Google+') {
              return 'fa fa-google-plus fa-2x';
            }
          }

          $scope.availableContacts = [{
            description: 'Fixed Phone',
          }, {
            description: 'Mobile Phone',
          }, {
            description: 'E-Mail',
          }, {
            description: 'Facebook',
          }, {
            description: 'Linkedin',
          }, {
            description: 'Google+',
          }]

          $scope.selectedContact = $scope.availableContacts[0];
          $scope.contact = '';

          $scope.insertContact = function() {
            var newCollabContact = {
              type: $scope.selectedContact.description,
              contact: $scope.contact
            }
            $scope.collaborator.contactList.push(newCollabContact);
            $scope.selectedContact = $scope.availableContacts[0]
            $scope.contact = '';
          }

          $scope.removeContact = function(contact) {
            var index = $scope.collaborator.contactList.indexOf(contact);
            $scope.collaborator.contactList.splice(index, 1);
          }

          $scope.resetFormField = function(form) {
            if (form) {
              form.contact.$setPristine();
            }
          }

          $scope.saveCollaborator = function() {

            $scope.successMessage = '';
            $scope.errorMessage = '';

            var collab = new Collab($scope.collaborator);

            collab.$save()
              .then(function(res) {
                $scope.successMessage = "Collaborator saved!";

                $scope.insertedContacts = [];
                $scope.contact = '';
                $scope.searchPlace = '';

                resetCollab();
              })
              .catch(function(req) {
                $scope.errorMessage = "Oops! Sorry for that!"
              });

            var element = $window.document.getElementById('header').scrollIntoView();
          }

          $scope.map = {
            "center": {
              "latitude": 52.47491894326404,
              "longitude": -1.8684210293371217
            },
            "zoom": 15
          };

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
                  $scope.errorMessage = "Oops! Error loading the map!"
                }
              );
          }

          Map.init();
        }
      ]);
