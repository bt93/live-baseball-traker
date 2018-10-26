'use strict';

/**
 * @ngdoc service
 * @name mlbLiveGameApp.todaysGames
 * @description
 * # todaysGames
 * Service in the mlbLiveGameApp.
 */
angular.module('mlbLiveGameApp')
  .service('gameFinder', function () {
    this.getGames = function() {
    	return fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1');
    };
  });
