'use strict';

app.controller('LoginCtrl', ['$scope', '$resource','$window',
  function($scope, $resource, $window) {

    $scope.mensagemErro = 'teste';

    hello.init({
      facebook : '592719450881848',
      google : '303009781610-pebm7orntmlqp34e99j6ncvo36ks5cg2.apps.googleusercontent.com'
    })

  $scope.loginFacebook =  function(){
    hello('facebook').login().then(function() {
           $window.location.href = '#/lista';
         }, function(e) {
           alert('Signin error: ' + e.error.message);
         });
   }

   $scope.loginGoogle =  function(){
     hello('google').login().then(function() {
            $window.location.href = '#/lista';
          }, function(e) {
            alert('Signin error: ' + e.error.message);
          });
    }

  }
]);
