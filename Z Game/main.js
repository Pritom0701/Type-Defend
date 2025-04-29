const words = [
    "anchor", "planet", "rocket", "launch", "comets", "fusion", "saturn", "nebula", "meteor", "spaces", "orbital",
    "gravity", "tunnels", "mission", "capsule", "control", "station", "stellar", "quantum", "galaxy", "cluster", "vehicle", "journey",
    "explore", "blaster", "radiate", "magneto", "android", "console", "project", "payload", "tracker", "system", "optical",
    "turbine", "modules", "network", "antenna", "command", "advance", "engineer", "scanner", "booster", "survive",
    "powerup", "stellar", "quantum", "decoder", "thruster", "empower", "exhaust", "display", "reentry", "voltage",
    "gravity", "velocity", "dynamic", "reactor", "telecom", "darknet", "horizon", "journey", "cluster", "decoder",
    "observe", "ionizer", "venture", "command", "landing", "orbiter", "process", "reclaim", "airlock", "sunrise",
    "harvest", "silicon", "systems", "control", "support", "science", "mission", "capsule", "antenna", "volcano",
    "surface", "trouble", "virtual", "signals", "storage", "vortexes", "airways", "machine", "torpedo", "science",
    "thermal", "modules", "speaker", "scanner", "adapter", "neutral", "contain", "payload", "gigabit", "quantum",
    "forward", "network", "complex", "harvest", "engineer", "dynamic", "console", "android", "process", "quantum",
    "tracker", "display", "physics", "optical", "blaster", "escape", "torques", "gravity", "reactor", "landing",
    "venture", "sunbeam", "outpost", "inertia", "modules", "network", "science", "engines", "decoder", "virtual",
    "battery", "scanner", "survive", "commute", "control", "radials", "reclaim", "airlock", "machine", "orbiter",
    "quantum", "cluster", "stellar", "journey", "radiate", "gravity", "optical", "dynamic", "android", "capsule",
    "network", "process", "console", "surface", "vehicle", "venture", "science", "stellar", "control", "android",
    "payload", "sunrise", "mission", "engines", "modules", "blaster", "reclaim", "observe", "gravity", "station",
    "capsule", "advance", "cluster", "reclaim", "decoder", "command", "orbiter", "explore", "thruster", "optical",
    "antenna", "quantum", "console", "journey", "sunbeam", "venture", "payload", "telecom", "stellar", "science",
    "forward", "dynamic", "vehicle", "optical", "android", "scanner", "machine", "command", "gravity", "reentry"
];

let availableWords = [...new Set(words.filter(w => w.length >= 6))]; // Remove duplicates + enforce 6+ chars
let currentWord = '';
let score = 0;
let fallInterval;

const wordDisplay = document.getElementById('word-display');
const inputField = document.getElementById('input-field');
const scoreBoard = document.getElementById('score-board');
const gameOverText = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');
const startBtn = document.getElementById('start-btn');
const rocket = document.getElementById('rocket');
const city = document.getElementById('city');

function getRandomWord() {
    if (availableWords.length === 0) {
        alert("You've completed all words!");
        endGame();
        return null;
    }
    const index = Math.floor(Math.random() * availableWords.length);
    const word = availableWords[index];
    availableWords.splice(index, 1); // remove used word
    return word;
}

function spawnRocket() {
    currentWord = getRandomWord();
    if (!currentWord) return;
    wordDisplay.textContent = currentWord;
    inputField.value = '';
    rocket.style.top = '-70px';
    rocket.style.display = 'block';

    let topPosition = -70;
    fallInterval = setInterval(() => {
        topPosition += 3;
        rocket.style.top = topPosition + 'px';

        const rocketRect = rocket.getBoundingClientRect();
        const cityRect = city.getBoundingClientRect();

        const rocketBottom = rocketRect.bottom;
        const cityMiddle = cityRect.top + (cityRect.height / 2);

        if (rocketBottom >= cityMiddle) {
            clearInterval(fallInterval);
            endGame();
        }
    }, 30);
}

function destroyRocket() {
    clearInterval(fallInterval);
    rocket.style.top = '-70px';
}

function endGame() {
    destroyRocket();
    gameOverText.style.display = 'block';
    restartBtn.style.display = 'block';
    inputField.disabled = true;
}

function restartGame() {
    score = 0;
    availableWords = [...new Set(words.filter(w => w.length >= 6))];
    scoreBoard.textContent = 'Score: 0';
    gameOverText.style.display = 'none';
    restartBtn.style.display = 'none';
    inputField.disabled = false;
    inputField.value = '';
    inputField.focus();
    spawnRocket();
}

function startGame() {
    startBtn.style.display = 'none';
    score = 0;
    availableWords = [...new Set(words.filter(w => w.length >= 6))];
    scoreBoard.textContent = 'Score: 0';
    scoreBoard.style.display = 'block';
    inputField.style.display = 'block';
    inputField.disabled = false;
    inputField.value = '';
    inputField.focus();
    spawnRocket();
}

inputField.addEventListener('input', () => {
    if (inputField.value.trim().toLowerCase() === currentWord.toLowerCase()) {
        destroyRocket();
        score++;
        scoreBoard.textContent = 'Score: ' + score;
        spawnRocket();
    }
});

restartBtn.addEventListener('click', restartGame);
startBtn.addEventListener('click', startGame);