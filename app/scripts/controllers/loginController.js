'use strict';

app.controller('LoginCtrl', ['$scope', '$resource','$window',
  function($scope, $resource, $window) {

    $scope.mensagemErro = '';

    hello.init({
      facebook : '592719450881848',
      google : '303009781610-93cpn0ek7onq33b3r1cj5oi4e3o58quf.apps.googleusercontent.com'
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
