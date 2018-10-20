(function () {
    const select = document.querySelector('#select');
    const gameSelector = document.querySelector('#game-selector');
    const gameSelectorBtn = document.querySelector('#game-selector-button');
    const teams = document.querySelector('#teams');
    const currentAtBat = document.querySelector('#current-atbat');
    const backButton = document.querySelector('#back-button');

    // Fetch Request for todays games
    fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1')
    .then(reponse => reponse.json())
    .then(pickGame);

     function pickGame(data) {
        let htmlContent = '';
        let gamePk = '';
        // Goes through all todays games and opens selected game
        for (let i = 0; i < data.dates[0].games.length; i++) {
            htmlContent = `<option value="${data.dates[0].games[i].seriesDescription}">${data.dates[0].games[i].seriesDescription}</option>`
            gameSelector.innerHTML = htmlContent;

            // Request Data on chosen game
            gameSelectorBtn.addEventListener('click', function() {
                gamePk = `${data.dates[0].games[i].gamePk}`;
                    fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`)
                    .then(reponse => reponse.json())
                    .then(openGame);
        })
        }
     }

     // Displays game information
     function openGame(game) {
        select.style.display = 'none';
        backButton.style.display = 'block';

        // Refreshes Live Data every 10 seconds
        setInterval(function() {
            gamePk = `${game.gamePk}`;
                    fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`)
                    .then(reponse => reponse.json());
        }, 10000);

        backButton.addEventListener('click',function() {
            teams.innerHTML = '';
            select.style.display = 'block';
            backButton.style.display = 'none';
            fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1')
            .then(reponse => reponse.json())
            .then(pickGame);
        })

        let htmlContent = '';

        if (game.gameData.status.statusCode === 'S') {
            htmlContent = `<h1>${game.gameData.teams.away.name} at ${game.gameData.teams.home.name}</h1>
            <h2>Game Preview</h2>
            <p>Scheduled Starters:</p>
            <p>${game.gameData.teams.away.abbreviation} ${game.gameData.probablePitchers.away.fullName}<br>
            <img src="https://securea.mlb.com/mlb/images/players/head_shot/${game.gameData.probablePitchers.away.id}.jpg" alt="${game.gameData.probablePitchers.away.id}""><br> 
            ${game.gameData.teams.home.abbreviation} ${game.gameData.probablePitchers.home.fullName}<br>
            <img src="https://securea.mlb.com/mlb/images/players/head_shot/${game.gameData.probablePitchers.home.id}.jpg" alt="${game.gameData.probablePitchers.home.id}""></p>`;
            teams.innerHTML = htmlContent;
        } else {
        // Teams
        htmlContent = `<h1>${game.gameData.teams.away.name} at ${game.gameData.teams.home.name}</h1>
        <h3>${game.gameData.teams.away.abbreviation} ${game.liveData.linescore.teams.away.runs} | ${game.gameData.teams.home.abbreviation} ${game.liveData.linescore.teams.home.runs}</h3>
        <h4>${game.liveData.linescore.inningHalf} of the ${game.liveData.linescore.currentInningOrdinal}</h4>`
        teams.innerHTML = htmlContent;

        // Current At Bat
        htmlContent = `<p>Pitcher: ${game.liveData.plays.currentPlay.matchup.pitcher.fullName} - ${game.liveData.plays.currentPlay.matchup.pitchHand.description}</p>
        <img src="https://securea.mlb.com/mlb/images/players/head_shot/${game.liveData.plays.currentPlay.matchup.pitcher.id}.jpg" alt="${game.liveData.plays.currentPlay.matchup.pitcher.fullName}">
        <p>Batter: ${game.liveData.plays.currentPlay.matchup.batter.fullName} - ${game.liveData.plays.currentPlay.matchup.batSide.description}</p>
        <img src="https://securea.mlb.com/mlb/images/players/head_shot/${game.liveData.plays.currentPlay.matchup.batter.id}.jpg" alt="${game.liveData.plays.currentPlay.matchup.batter.fullName}">
        <ul>
            <li>Outs: ${game.liveData.linescore.outs}</li>
            <li>Balls: ${game.liveData.linescore.balls}</li>
            <li>Strikes: ${game.liveData.linescore.strikes}</li>
        </ul>`

        if (game.liveData.plays.currentPlay.about.isComplete === true) {
            htmlContent += `<h4>${game.liveData.plays.currentPlay.result.description}</h4>`
        }
        currentAtBat.innerHTML = htmlContent; 
    }
     }
})();