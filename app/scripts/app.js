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
    'uiGmapgoogle-maps'
  ])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/template', {
        templateUrl: 'views/template.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/lista', {
        templateUrl: 'views/listaColab.html',
        controller: 'MyCtrl'
      })
      .when('/colaborador', {
        templateUrl: 'views/colaboradorView.html',
        controller: 'ColabCtrl'
      })
      .when('/colaborador/:idColab', {
        templateUrl: 'views/infoColaboradorView.html',
        controller: 'InfoColabCtrl'
      })
      .when('/editarColab/:idColab', {
        templateUrl: 'views/colaboradorView.html',
        controller: 'ColabCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
