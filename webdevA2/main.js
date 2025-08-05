const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const page4btn = document.querySelector('#page4btn');
const allpages = document.querySelectorAll(".page");

// Select the <a> link whose href points to "#(name)"
const chicken = document.querySelector('a[href="#chicken"]');
const laksa = document.querySelector('a[href="#laksa"]');
const crab = document.querySelector('a[href="#crab"]');
const kaya = document.querySelector('a[href="#kaya"]');
const roti = document.querySelector('a[href="#roti"]');
const kachang = document.querySelector('a[href="#kachang"]');
const malay = document.querySelector('a[href="#malay"]');
const chinese = document.querySelector('a[href="#chinese"]');
const indian = document.querySelector('a[href="#indian"]');

// Hamburger
const header = document.getElementById("headerColor");
const hamBtn = document.querySelector("#hamIcon");
const menuItemsList = document.querySelector("nav ul");
let isInMenu = false;

// Game variables
let gameActive = false;
let lives = 5;
let score = 0;
let timeLeft = 30;
let gameTimer;
let ingredientTimer;
const startBtn = document.querySelector('#start-game');
const resetBtn = document.querySelector('#reset-game');
const gameArea = document.querySelector('#game-area');
const scoreElement = document.querySelector('#score');
const livesElement = document.querySelector('#lives');
const timerElement = document.querySelector('#timer');
const gameMessage = document.querySelector('#game-message');
const gameResult = document.querySelector('#game-result');
const resultText = document.querySelector('#result-text');
const goodIngredients = ['game_sugar', 'game_egg', 'game_chili', 'game_bread', 'game_coconut'];
const badIngredients = ['game_chicken', 'game_rice', 'game_shrimp', 'game_noodles', 'game_crab', 'game_tomato'];

hideall();
show(1);

/* ##################### NAVIGATION ##################### */

// Hide all pages
function hideall() {
    // Go through all subtopic pages
    for (let onepage of allpages) {
        onepage.style.display = "none";
    }
}

// Show page based on parameter
function show(pgno) {
    resetGame();
    hideall();
    closeMenu();

    // Select the page based on this function parameter
    let onepage = document.querySelector("#page" + pgno);
    onepage.style.display = "block";

    switch (pgno) {
        case 1:
            header.className = "red";
            break;
        case 2:
            header.className = "orange";
            break;
        case 3:
            header.className = "purple";
            break;
        case 4:
            header.className = "blue";
            break;
        default:
            break;
    }
}

// Show page + scroll to the section ID
function showAndScroll(pgno, sectionId) {
    hideall();
    show(pgno);

    // Scroll to the specific section
    let section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView();
    }
}

// Hamburger Menu (toggleable)
function toggleMenus() {
    menuItemsList.classList.toggle("menuShow");

    if (isInMenu) {
        hamBtn.innerHTML = "☰";
    } else {
        hamBtn.innerHTML = "✕";
    }

    isInMenu = !isInMenu; // Toggle the state
}

// When hamburger menu is open
function closeMenu() {
    if (isInMenu) {
        toggleMenus();
    }
}

/* ##################### QUIZ ##################### */

document.getElementById('btnSubmit').addEventListener('click',
    function () {
        let score = 0;

        // Q1 (radio buttons)
        const q1Selected = document.getElementById('q1-chicken-rice');
        if (q1Selected && q1Selected.checked) {
            score++;
        }

        // Q2 (checkboxes)
        const chickenChecked = document.getElementById('q2-chicken').checked;
        const garlicChecked = document.getElementById('q2-garlic').checked;
        const pandanChecked = document.getElementById('q2-pandan').checked;
        const beefChecked = document.getElementById('q2-beef').checked;

        if (chickenChecked && garlicChecked && pandanChecked && !beefChecked) { score++; }

        // Q3 (text input)
        const q3Answer = document.getElementById('q3').value.trim().toLowerCase();
        if (q3Answer == "china") { score++; }

        // Q4 (dropdown)
        const q4Selected = document.getElementById('q4').value;
        if (q4Selected == "Thick rice noodles") { score++; }

        // Q5 (number input)
        const q5Answer = document.getElementById('q5').value;
        if (q5Answer == 35) { score++; }

        // Q6 (radio buttons)
        const q6Selected = document.getElementById('q6-mantou');
        if (q6Selected && q6Selected.checked) { score++; }

        // Display results
        const resultsBox = document.getElementById('resultsBox');
        const scoreDisplay = document.getElementById('scoreDisplay');

        scoreDisplay.textContent = 'You scored ' + score + ' out of 6';
        resultsBox.style.display = 'block';
    });

/* ##################### GAME ##################### */

function startGame() {
    gameActive = true;
    score = 0;
    lives = 5;
    timeLeft = 30;

    // Hide/Show elements
    startBtn.style.display = 'none';
    gameMessage.style.display = 'none';
    gameResult.style.display = 'none';
    resetBtn.style.display = 'block';

    // Update display
    updateScoreAndLives();
    updateTimer();

    // Start timers
    gameTimer = setInterval(updateGameTimer, 1000);
    ingredientTimer = setInterval(createIngredient, 1000);

    // Clear any existing ingredients
    clearIngredients();
}

function resetGame() {
    gameActive = false;
    score = 0;
    lives = 5;
    timeLeft = 30;

    // Clear timers
    clearInterval(gameTimer);
    clearInterval(ingredientTimer);

    // Clear ingredients
    clearIngredients();

    // Reset display
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;

    startBtn.style.display = 'inline-block';
    gameMessage.style.display = 'flex';
    gameResult.style.display = 'none';
    resetBtn.style.display = 'none';
}

function updateGameTimer() {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
        endGame('Time\'s up! You scored ' + score + ' points.');
    }
}

function updateScoreAndLives() {
    scoreElement.textContent = score;
    livesElement.textContent = lives;
}

function updateTimer() {
    timerElement.textContent = timeLeft;
}

function createIngredient() {
    if (!gameActive) return;

    const ingredient = document.createElement('img');
    ingredient.className = 'ingredient';

    // Randomly choose good or bad ingredient (70% good, 30% bad)
    const isGood = Math.random() < 0.7;

    // Math.random() = give a random number from 0 to 1.
    // array.length = number of items in array
    // Math.floor() = round a number down to the nearest whole number
    if (isGood) {
        ingredient.id = 'good-ingredient';
        const randomGood = goodIngredients[Math.floor(Math.random() * goodIngredients.length)];
        ingredient.src = `images/${randomGood}.png`;
        ingredient.alt = randomGood;
    } else {
        ingredient.id = 'bad-ingredient';
        const randomBad = badIngredients[Math.floor(Math.random() * badIngredients.length)];
        ingredient.src = `images/${randomBad}.png`;
        ingredient.alt = randomBad;
    }

    // Random horizontal position as percentage
    // left: 100% = goes off the game area
    // Workaround to make the position of the ingredients spawn INSIDE the game area.
    const spawnFromLeft = Math.random() < 0.5; // Bool
    const percentage = Math.random() * 70;

    if (spawnFromLeft) {
        ingredient.style.left = percentage + '%';
    } else {
        ingredient.style.right = percentage + '%';
    }

    ingredient.style.position = 'absolute';
    ingredient.style.top = '0%';

    // Store dimensions for animation
    ingredient.maxHeight = 80; // Leave room for ingredient height

    // Add click event
    ingredient.addEventListener('click', clickIngredient);

    // Add to game area
    gameArea.appendChild(ingredient);

    // Animate ingredient movement
    animateIngredient(ingredient);
}

function animateIngredient(ingredient) {
    let position = 0;
    const speed = 1.5;
    const maxHeight = ingredient.maxHeight;

    const animation = setInterval(
        function () {

            if (!gameActive || !ingredient.parentNode) {
                clearInterval(animation);
                return;
            }

            position += speed;
            ingredient.style.top = position + '%';

            // Remove ingredient if it touches the bottom
            if (position >= maxHeight) {

                if (ingredient.id == "good-ingredient") {
                    playWrongSound();
                    lives--;

                    if (lives <= 0) {
                        endGame("You lose!");
                    }
                }
                else {
                    playCorrectSound();
                    score += 5;
                    if (score >= 100) {
                        endGame('Congratulations! You won with ' + score + ' points!');
                        return;
                    }
                }

                updateScoreAndLives();
                clearInterval(animation);
                ingredient.remove();
                return;
            }
        }, 50);
}

function clickIngredient(event) {
    const ingredient = event.target;

    if (ingredient.id == 'good-ingredient') {
        playCorrectSound();
        score += 10;
        if (score >= 100) {
            endGame('Congratulations! You won with ' + score + ' points!');
            return;
        }
    } else {
        playWrongSound();
        lives--;
        if (lives <= 0) {
            endGame("You lose!");
            return;
        }
    }

    updateScoreAndLives();
    ingredient.remove();
}

function clearIngredients() {
    const ingredients = gameArea.querySelectorAll('.ingredient');
    ingredients.forEach(function (ingredient) {
        ingredient.remove();
    });
}

function endGame(message) {
    gameActive = false;

    // Clear timers
    clearInterval(gameTimer);
    clearInterval(ingredientTimer);

    // Clear remaining ingredients
    clearIngredients();

    // Show result
    resultText.textContent = message;
    gameResult.style.display = 'block';
    startBtn.style.display = 'block';
    resetBtn.style.display = 'none';
}

// Sound is in function so the audio can overlap
function playCorrectSound() {
    const correct = new Audio("audio/correct-answer.mp3");
    correct.play();
}

function playWrongSound() {
    const wrong = new Audio("audio/wrong-answer.mp3");
    wrong.play();
}

// EVENT LISTENERS

// Hamburger Menu event listener
hamBtn.addEventListener("click", toggleMenus);

// Navigation buttons event listeners
page1btn.addEventListener("click", function () { show(1); });
page2btn.addEventListener("click", function () { show(2); });
page3btn.addEventListener("click", function () { show(3); });
page4btn.addEventListener("click", function () { show(4); });

// Dropdown links event listeners
chicken.addEventListener("click", function () { showAndScroll(1, "#chicken"); });
laksa.addEventListener("click", function () { showAndScroll(1, "#laksa"); });
crab.addEventListener("click", function () { showAndScroll(1, "#crab"); });
kaya.addEventListener("click", function () { showAndScroll(2, "#kaya"); });
roti.addEventListener("click", function () { showAndScroll(2, "#roti"); });
kachang.addEventListener("click", function () { showAndScroll(2, "#kachang"); });
malay.addEventListener("click", function () { showAndScroll(3, "#malay"); });
chinese.addEventListener("click", function () { showAndScroll(3, "#chinese"); });
indian.addEventListener("click", function () { showAndScroll(3, "#indian"); });

// Game event listeners
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);