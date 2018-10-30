"use strict";angular.module("mlbLiveGameApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).otherwise({redirectTo:"/"})}]),angular.module("mlbLiveGameApp").controller("MainCtrl",["$scope",function(a){a.date=new Date}]),angular.module("mlbLiveGameApp").controller("TodaysgamesCtrl",["$http","$scope","$interval",function(a,b,c){function d(){a.get("https://statsapi.mlb.com/api/v1/schedule/?sportId=1&date=09/30/2018").then(function(a){b.games=a.data,console.log(b.games)})}d(),b.callAtInterval=c(d,5e4),b.openGame=function(a){c.cancel(b.callAtInterval),$(".todays-games").hide(),$(".header").hide(),$(".current-game").show(),b.displayGame(a)},b.displayGame=function(c){a.get("https://statsapi.mlb.com/api/v1.1/game/"+c+"/feed/live").then(function(a){b.info=a.data,console.log(b.info)})},b.backButton=function(){b.callAtInterval=c(d,5e4),$(".todays-games").show(),$(".header").show(),$(".current-game").hide()}}]),angular.module("mlbLiveGameApp").run(["$templateCache",function(a){a.put("views/main.html",'<div class="jumbotron"> <h1>Major League Baseball</h1> <h2>Live Game Traker</h2> <p class="lead"> Today is {{ date | date:\'fullDate\' }} </p> <img src="images/mlblogo.4414c77f.png" alt="MLB"> </div>'),a.put("views/opengame.html",'<div ng-if="info.gameData.status.statusCode === \'F\'"> <h1>{{ info.gameData.teams.away.name }} @ {{ info.gameData.teams.home.name }}</h1> <p>{{ info.gameData.venue.name }} - {{ info.gameData.venue.location.city }}, {{ info.gameData.venue.location.state }}</p> <p>{{ info.gameData.datetime.dateTime | date: "medium" }}</p> <table> <tr class="linescore top"> <th>Inning</th> <th class="innings top" ng-repeat="innings in info.liveData.linescore.innings">{{innings.num}}</th> <th class="innings">Runs</th> <th class="innings">Hits</th> <th class="innings">Errors</th> </tr> <tr> <th class="linescore">{{ info.gameData.teams.away.abbreviation }}</th> <th class="innings" ng-repeat="innings in info.liveData.linescore.innings">{{ innings.away.runs }}</th> <th class="innings">{{ info.liveData.linescore.teams.away.runs }}</th> <th class="innings">{{ info.liveData.linescore.teams.away.hits }}</th> <th class="innings">{{ info.liveData.linescore.teams.away.errors }}</th> </tr> <tr> <th class="linescore">{{ info.gameData.teams.home.abbreviation }}</th> <th class="innings" ng-repeat="innings in info.liveData.linescore.innings">{{ innings.home.runs }}</th> <th class="innings">{{ info.liveData.linescore.teams.home.runs }}</th> <th class="innings">{{ info.liveData.linescore.teams.home.hits }}</th> <th class="innings">{{ info.liveData.linescore.teams.home.errors }}</th> </tr> </table> <h3>Win: <a href="https://www.mlb.com/player/{{ info.liveData.decisions.winner.id }}" target="_blank">{{ info.liveData.decisions.winner.fullName }}</a> | Loss: <a href="https://www.mlb.com/player/{{ info.liveData.decisions.loser.id }}" target="_blank">{{ info.liveData.decisions.loser.fullName }}</a> <span ng-if="info.liveData.decisions.save">| Save: <a href="https://www.mlb.com/player/{{ info.liveData.decisions.save.id }}" target="_blank">{{ info.liveData.decisions.save.fullName }}</a></span></h3> <div ng-repeat="data in info.liveData.boxscore.info"> <p>{{ data.label }}: {{ data.value }}</p> </div> </div> <button ng-click="backButton()">Return</button>'),a.put("views/todaysgames.html",'<div ng-if="games.totalGames > 0" class="todays-games"> <ul ng-repeat="game in games.dates[0].games"> <li> <h3>{{ game.description }}</h3> <p>{{ game.venue.name }}</p> <h4><img class="team-logo" src="https://www.mlbstatic.com/team-logos/{{ game.teams.away.team.id }}.svg"> {{ game.teams.away.team.name }} - {{ game.teams.away.score }} <span ng-if="game.status.statusCode === \'P\' || game.status.statusCode === \'S\' || game.status.statusCode === \'F\'"> | ({{ game.teams.away.leagueRecord.wins }} - {{ game.teams.away.leagueRecord.losses }})</span><br> <img class="team-logo" src="https://www.mlbstatic.com/team-logos/{{ game.teams.home.team.id }}.svg"> {{ game.teams.home.team.name }} - {{ game.teams.home.score }} <span ng-if="game.status.statusCode === \'P\' || game.status.statusCode === \'S\' || game.status.statusCode === \'F\'"> | ({{ game.teams.home.leagueRecord.wins }} - {{ game.teams.home.leagueRecord.losses }})</span></h4> <p ng-if="game.status.statusCode === \'F\'">Final</p> <p ng-if="game.status.statusCode === \'I\'">Live</p> <p ng-if="game.status.statusCode === \'P\' || game.status.statusCode === \'S\'">Preview</p> <button ng-click="openGame(game.gamePk)">Details</button> </li> </ul> </div> <div ng-if="games.totalGames === 0">There are no scheduled games today.</div> <div ng-include="\'views/opengame.html\'" class="current-game"></div>')}]);