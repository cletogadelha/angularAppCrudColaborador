'use strict';

app.controller('LoginCtrl', ['$scope', '$http','$window','$cookies','$base64',
  function($scope, $http, $window, $cookies, $base64) {

    $scope.errorMessage = '';

    $scope.login = function(){

        var data = "username=" + this.user + "&password=" + this.password + "&grant_type=password&scope=read%20write&";

        $http.post('http://localhost:8080/oauth/token', data, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                "Authorization": "Basic " + $base64.encode("clientapp" + ':' + "springSecurity")
            }
        }).then(function (response) {
            $cookies.put('auth.access_token', response.data.access_token);
            $cookies.put('auth.refresh_token', response.data.refresh_token);
            $window.location.href = '#/list';
            return false;
        }, function (response) {
           $scope.errorMessage = response.data.error_description;
        });
    }

  }
]);
