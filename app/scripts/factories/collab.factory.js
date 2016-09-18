'use strict';
app.factory('Collab', ['$resource',function ($resource) {
  return $resource("https://springwssample.herokuapp.com/rest/collaborator/:id", {id: "@idCollab"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
