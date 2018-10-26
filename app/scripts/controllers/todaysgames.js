'use strict';

/**
 * @ngdoc function
 * @name mlbLiveGameApp.controller:TodaysgamesCtrl
 * @description
 * # TodaysgamesCtrl
 * Controller of the mlbLiveGameApp
 */
angular.module('mlbLiveGameApp')
  .controller('TodaysgamesCtrl', ['gameFinder', function(games) {
  	var vm = this;

  	games.getGames()
  	.then(response => response.json())
  	.then(function(data) {
  		vm.game = data;
  		console.log(vm.game)
  	});
  }]);
