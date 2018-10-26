'use strict';

/**
 * @ngdoc function
 * @name mlbLiveGameApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the mlbLiveGameApp
 */
angular.module('mlbLiveGameApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.date = new Date();
  });
