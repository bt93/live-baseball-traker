(function () {
    const select = document.querySelector('#select');
    const gameSelector = document.querySelector('#game-selector');
    const gameSelectorBtn = document.querySelector('#game-selector-button');
    const teams = document.querySelector('#teams');

    // Fetch Request for todays games
    fetch('https://statsapi.mlb.com/api/v1/schedule?sportId=1')
    .then(reponse => reponse.json())
    .then(pickGame);

     function pickGame(data) {
        let htmlContent = '';
        let gamePk = '';
        // Goes through all games and opens selected game
        for (let i = 0; i < data.dates[0].games.length; i++) {
            htmlContent = `<option value="${data.dates[0].games[i].seriesDescription}">${data.dates[0].games[i].seriesDescription}</option>`
            gameSelector.innerHTML = htmlContent;

            gameSelectorBtn.addEventListener('click', function() {
                gamePk = `${data.dates[0].games[i].gamePk}`;
                fetch(`https://statsapi.mlb.com/api/v1.1/game/${gamePk}/feed/live`)
                .then(reponse => reponse.json())
                .then(openGame);
        })
        }
     }

     function openGame(game) {
        select.style.display = 'none';
        let htmlContent = '';

        // Teams
        htmlContent = `<h1>${game.gameData.teams.away.name} at ${game.gameData.teams.home.name}</h1>
        <h3>${game.gameData.teams.away.abbreviation} ${game.liveData.linescore.teams.away.runs} | ${game.gameData.teams.home.abbreviation} ${game.liveData.linescore.teams.home.runs}</h3>`
        teams.innerHTML = htmlContent;

        // Current At Bat
     }
})();