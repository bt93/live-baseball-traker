'use strict';

/**
 * @ngdoc function
 * @name mlbLiveGameApp.controller:TodaysgamesCtrl
 * @description
 * # TodaysgamesCtrl
 * Controller of the mlbLiveGameApp
 */
angular.module('mlbLiveGameApp')
  .controller('TodaysgamesCtrl', function($http, $scope, $interval) {

  		function callAtInterval() {
  			// Request Info for todays games
  		$http.get('https://statsapi.mlb.com/api/v1/schedule?sportId=1')
  		.then(function(response) {
      		$scope.games = response.data;
      		console.log($scope.games);
  	});
  	}
  	// First call when page opens
  	callAtInterval();
  	// Refresh request every 10 seconds
  	$interval(callAtInterval, 10000);

  	$scope.openGame = function(gamePk) {
  		console.log(gamePk);
  		$('.todays-games').hide();
  	};
  });
