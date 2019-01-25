const startBtn = document.querySelector('.startbtn');
const startPage = document.querySelector('.startpage');
const gamePage = document.querySelector('.game');

const startGameView = () => {
    startPage.classList.add('startpagehide');
    gamePage.classList.add('gameshow');
};

startBtn.addEventListener('click', startGameView);

const gameSummary = {
    rounds: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: ""
}

const hands = [...document.querySelectorAll('.select img')];

function playerChoice() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = '');
    this.style.boxShadow = '0 0 10px 3px #c20303';
}

function aiChoice() {
    const aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
    return aiHand;
}

function checkResult(player, ai) {
    if (player === ai) {
        return "draw";
    } else if ((player === "papier" && ai === "kamień") || (player === "kamień" && ai === "nożyczki") || (player === "nożyczki" && ai === "papier")) {
        return "win";
    } else if ((player === "papier" && ai === "nożyczki") || (player === "kamień" && ai === "papier") || (player === "nożyczki" && ai === "kamień")) {
        return "loss";
    }
}

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player;
    document.querySelector('[data-summary="ai-choice"]').textContent = ai;
    document.querySelector('h2.round span').textContent = ++gameSummary.rounds;
    if (result === "win") {
        document.querySelector('p.wins span').textContent = ++gameSummary.wins;
        document.querySelector('[data-summary="who-win"]').textContent = "Gracz";
        document.querySelector('[data-summary="who-win"]').style.color = "green";
    } else if (result === "loss") {
        document.querySelector('p.losses span').textContent = ++gameSummary.losses;
        document.querySelector('[data-summary="who-win"]').textContent = "Komputer";
        document.querySelector('[data-summary="who-win"]').style.color = "red";
    } else {
        gameSummary.draws++;
        document.querySelector('[data-summary="who-win"]').textContent = "Remis"
        document.querySelector('[data-summary="who-win"]').style.color = "gray";
    }
}

function endRound() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.aiHand = "";
}

function startGame() {
    if (!game.playerHand) return alert("Dokonaj wyboru!")
    game.aiHand = aiChoice();
    const gameResult = checkResult(game.playerHand, game.aiHand);
    publishResult(game.playerHand, game.aiHand, gameResult);
    endRound();
}

hands.forEach(hand => hand.addEventListener('click', playerChoice));

document.querySelector('.start').addEventListener('click', startGame);