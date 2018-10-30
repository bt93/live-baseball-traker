'use strict';
/* https://statsapi.mlb.com/api/v1/schedule?sportId=1'
	Save for later */
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
  		$http.get('https://statsapi.mlb.com/api/v1/schedule/?sportId=1&date=09/30/2018')
  		.then(function(response) {
      		$scope.games = response.data;
      		console.log($scope.games);
  	});
  	}
  	// First call when page opens
  	callTodaysGames();
  	// Refresh request every 50 seconds
  	$scope.callAtInterval = $interval(callTodaysGames, 50000);

  	$scope.openGame = function(gamePk) {
  		console.log(gamePk);
  		// Ends request refresh
  		$interval.cancel($scope.callAtInterval);

  	};
  });
