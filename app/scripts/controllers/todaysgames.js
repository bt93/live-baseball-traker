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
  		// console.log(gamePk);
  		// Ends request refresh
  		$interval.cancel($scope.callAtInterval);
      $('.todays-games').hide();
      $('.header').hide();
      $('.current-game').show();
      $scope.displayGame(gamePk);
  	};

    $scope.displayGame = function(gamePk) {
      // Request info for selected game
      $http.get("https://statsapi.mlb.com/api/v1.1/game/" + gamePk + "/feed/live")
      .then(function(response) {
        $scope.info = response.data;
        console.log($scope.info);
      });
    };

    $scope.backButton = function() {
      $scope.callAtInterval = $interval(callTodaysGames, 50000);
      $('.todays-games').show();
      $('.header').show();
      $('.current-game').hide();
    }
  });
