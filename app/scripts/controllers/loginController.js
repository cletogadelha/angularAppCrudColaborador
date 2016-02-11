'use strict';

app.controller('LoginCtrl', ['$scope', '$resource','$window',
  function($scope, $resource, $window) {

    $scope.mensagemErro = '';

    hello.init({
      facebook : '592719450881848',
      google : '303009781610-pebm7orntmlqp34e99j6ncvo36ks5cg2.apps.googleusercontent.com'
    })

    $scope.login = function(){

      if(this.user.toUpperCase() != "ADMIN" ||
          this.password.toUpperCase() != "ADMIN"){
          $scope.mensagemErro = 'Login ou senha inválida!';
      }else{
        $window.location.href = '#/lista';
      }

    }

  $scope.loginFacebook =  function(){
    hello('facebook').login().then(function() {
           $window.location.href = '#/lista';
         }, function(e) {
             $scope.mensagemErro =  e.error.message;
         });
   }

   $scope.loginGoogle =  function(){
     hello('google').login().then(function() {
            $window.location.href = '#/lista';
          }, function(e) {
              $scope.mensagemErro =  e.error.message;
          });
    }

  }
]);
