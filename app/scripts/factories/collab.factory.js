'use strict';
app.factory('Collab', ['$resource',function ($resource) {
  //return $resource("https://springwssample.herokuapp.com/rest/collaborator/:id", {id: "@idCollab"}, {
  	return $resource("http://localhost:8080/rest/collaborator/:id", {id: "@idCollab"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
