'use strict';

/**
 * @ngdoc overview
 * @name mlbLiveGameApp
 * @description
 * # mlbLiveGameApp
 *
 * Main module of the application.
 */
angular
  .module('mlbLiveGameApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
