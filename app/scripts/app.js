'use strict';

/**
 * @ngdoc overview
 * @name angularSpringApp
 * @description
 * # angularSpringApp
 *
 * Main module of the application.
 */
var app = angular
  .module('angularSpringApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'flow',
    'ngSanitize',
    'ui.select',
    'uiGmapgoogle-maps',
    'base64',
    'angular-loading-bar'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/list', {
        templateUrl: 'views/collab.list.html',
        controller: 'MainCtrl'
      })
      .when('/collab', {
        templateUrl: 'views/collab.form.html',
        controller: 'CollabCtrl'
      })
      .when('/collab/:idCollab', {
        templateUrl: 'views/collab.view.html',
        controller: 'CollabCtrlView'
      })
      .when('/editCollab/:idCollab', {
        templateUrl: 'views/collab.form.html',
        controller: 'CollabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }).factory('httpRequestInterceptor', function ($cookies, $window, $q) {
    return {
      request: function (config) {
        var access_token = $cookies.get('auth.access_token');
        if(access_token !== undefined && (config.url.indexOf('/oauth/token') === -1))
          config.headers['Authorization'] = 'Bearer ' + access_token;
        return config;
      },
      responseError: function (rejection) {
        if(rejection.status === 401) { // UNAUTHORIZED
          $window.location.href = '#/';
        }

        return $q.reject(rejection);
      }
    };
  }).config(['$httpProvider', function($httpProvider) {  
    $httpProvider.interceptors.push('httpRequestInterceptor');
}]);
