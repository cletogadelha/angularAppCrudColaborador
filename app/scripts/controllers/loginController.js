'use strict';

app.controller('LoginCtrl', ['$scope', '$resource','$window',
  function($scope, $resource, $window) {

    $scope.mensagemErro = 'teste';

    hello.init({
      facebook : '592719450881848',
      google : '303009781610-93cpn0ek7onq33b3r1cj5oi4e3o58quf.apps.googleusercontent.com'
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
