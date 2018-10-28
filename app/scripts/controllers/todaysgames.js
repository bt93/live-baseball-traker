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

  		function callTodaysGames() {
  			// Request Info for todays games
  		$http.get('https://statsapi.mlb.com/api/v1/schedule?sportId=1')
  		.then(function(response) {
      		$scope.games = response.data;
      		console.log($scope.games);
  	});
  	}
  	// First call when page opens
  	callTodaysGames();
  	// Refresh request every 10 seconds
  	var callAtInterval = $interval(callTodaysGames, 10000);

  	$scope.openGame = function(gamePk) {
  		console.log(gamePk);
  		// Ends request refresh
  		$interval.cancel(callAtInterval);
  	};
  });
