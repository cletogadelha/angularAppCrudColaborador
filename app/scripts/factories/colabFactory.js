app.factory('Colab', ['$resource',function ($resource) {
  return $resource("http://localhost:8080/rest/colaborador/:id", {id: "@idColab"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
