app.factory('Colab', ['$resource',function ($resource) {
  return $resource("https://springwscds.herokuapp.com/rest/colaborador/:id", {id: "@idColab"}, {
    update: {
      method: 'PUT'
    }
  });
}]);
